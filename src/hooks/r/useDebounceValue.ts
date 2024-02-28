import {useState} from 'react'
import {useIsomorphicEffect} from './useIsomorphicEffect';

type IUseDebounceValue = <T>(value: T, delay: number) => T

export const useDebounceValue: IUseDebounceValue = <T>(value: T, delay = 0) => {
    const [debounceValue, setDebounceValue] = useState<T>(value)

    useIsomorphicEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(value)
        }, delay)

        return () => {
            clearInterval(handler)
        };
    }, [value, delay])

    return debounceValue
}