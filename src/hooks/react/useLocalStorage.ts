import {useState} from 'react';

type ISetValue = <T>(value: T | ((value: T) => T)) => void;

type IUseLocalStorage = <T = unknown>(key: string, initialValue: T) => [T, ISetValue];

const useLocalStorage: IUseLocalStorage = <T>(key, initialValue) => {
    const [storeValue, setStoreValue] = useState(() => {
        if (typeof window === 'undefined') {
            return initialValue;
        }

        try {
            const value = window.localStorage.getItem(key);

            return value ? JSON.parse(value) : initialValue;
        }
        catch (e) {
            return initialValue;
        }
    });

    const setValue: ISetValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storeValue) : value;

            setStoreValue(valueToStore);

            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        }
        catch (e) {
            console.log(e);
        }
    };

    return [storeValue, setValue];
};

export { useLocalStorage };