import {useEffect, useRef} from 'react';

type IUsePrevious = <T>(state: T) => T | null;

const usePrevious: IUsePrevious = <T>(state: T) => {
    const ref = useRef<T | null>(null);

    useEffect(() => {
        ref.current = state;
    }, [state]);

    return ref.current;
};

export {usePrevious};