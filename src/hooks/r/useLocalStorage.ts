import {useState} from 'react'
import {isUndefined} from '../../utils'

type ISetValue = <T>(value: T | ((value: T) => T)) => void

export type IUseLocalStorage = <T = unknown>(key: string, initialValue: T) => [T, ISetValue]

export const useLocalStorage: IUseLocalStorage = <T>(key: string, initialValue: T) => {
    const [storeValue, setStoreValue] = useState(() => {
        if (typeof window === 'undefined') {
            return initialValue;
        }

        try {
            const value = window.localStorage.getItem(key)

            return value ? JSON.parse(value) : initialValue
        }
        catch (e) {
            return initialValue
        }
    })

    const setValue: ISetValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storeValue) : value

            setStoreValue(valueToStore)

            if (!isUndefined(typeof window, 'strict')) {
                window.localStorage.setItem(key, JSON.stringify(valueToStore))
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    return [storeValue, setValue]
}