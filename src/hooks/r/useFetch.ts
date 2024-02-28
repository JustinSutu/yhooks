import {useMemo, useReducer, useRef} from 'react';
import {useIsomorphicEffect} from './useIsomorphicEffect';

type State<T> = {
    data?: T;
    error?: Error;
};

type CacheMap<T> = Map<string, T>;

type Action<T> =
    | { type: 'pending' }
    | { type: 'request'; payload: T }
    | { type: 'error'; payload: Error }

const Actions = {
    PENDING: 'pending',
    REQUEST: 'request',
    ERROR: 'error',
} as const;

export const useFetch = <T = unknown>(url?: string, options?: Record<string, any>): State<T> => {
    const reducer = (state: State<T>, action: Action<T>): State<T> => {
        switch (action.type) {
            case Actions.REQUEST: {
                return {
                    ...state,
                    data: action.payload
                };
            }
            case Actions.ERROR: {
                return {
                    ...state,
                    error: action.payload
                };
            }
            default: {
                return state;
            }
        }
    }

    const cacheMap = useRef<CacheMap<T>>(new Map())
    const cancelRef = useRef<boolean>(false)
    const [data, dispatch] = useReducer(reducer, {});

    const memoOptions = useMemo(() => options, [options]);

    useIsomorphicEffect(() => {
        if (!url) {
            return;
        }

        cancelRef.current = false;

        (
            async () => {
                dispatch({ type: Actions.PENDING });

                const cacheData = cacheMap.current.get(url);

                if (cacheData) {
                    return dispatch({ type: Actions.REQUEST, payload: cacheData })
                }

                try {
                    const response = await fetch(url, memoOptions)
                    if (!response.ok) {
                        throw new Error(response.statusText)
                    }

                    const data = (await response.json()) as T

                    cacheMap.current.set(url, data);

                    if (cancelRef.current) return

                    dispatch({ type: Actions.REQUEST, payload: data })
                } catch (error) {
                    if (cancelRef.current) return

                    dispatch({ type: Actions.ERROR, payload: error as Error })
                }
            }
        )();

        return () => {
            cancelRef.current = true
        }
    }, [url, memoOptions]);

    return data;
};

