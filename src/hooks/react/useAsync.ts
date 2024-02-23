import {useCallback, useEffect, useState} from 'react';

enum STATUS {
    IDLE = 'idle',
    PENDING = 'pending',
    SUCCESS = 'success',
    ERROR = 'error',
}

type IUseAsync = <T>(func: () => Promise<T>, immediate: boolean) =>
    [() => Promise<T>, STATUS, T, Error];

const useAsync: IUseAsync = <T>(func = () => void  0, immedidate = false) => {
    const [status, setStatus] = useState<STATUS>(STATUS.IDLE);
    const [value, setValue] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);

    const execute = useCallback(() => {
        setStatus(STATUS.PENDING);
        setValue(null);
        setError(null);

        return func().then((res: T) => {
            setStatus(STATUS.SUCCESS);
            setValue(res);
            setError(null);
        }).catch((err: Error) => {
            setStatus(STATUS.ERROR);
            setValue(null);
            setError(err);
        });

    }, [func]);

    useEffect(() => {
        if (immedidate) {
            execute();
        }
    }, [immedidate, execute]);

    return [execute, status, value, error];
};

export { useAsync };