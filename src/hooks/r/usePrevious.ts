import {useRef} from 'react';
import {useIsomorphicEffect} from './useIsomorphicEffect';

type IUsePrevious = <T>(state: T) => T | null;

const usePrevious: IUsePrevious = <T>(state: T) => {
    const ref = useRef<T | null>(null);

    useIsomorphicEffect(() => {
        ref.current = state;
    }, [state]);

    return ref.current;
};

export {usePrevious};