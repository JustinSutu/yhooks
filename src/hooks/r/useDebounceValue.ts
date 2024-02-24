import {useEffect, useState} from 'react'

type IUseDebounceValue = <T>(value: T, delay: number) => T

export const useDebounceValue: IUseDebounceValue = <T>(value: T, delay = 0) => {
    const [debounceValue, setDebounceValue] = useState<T>(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(value)
        }, delay)

        return () => {
            clearInterval(handler)
        };
    }, [value, delay])

    return debounceValue
}