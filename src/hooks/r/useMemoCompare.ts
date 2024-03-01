import {useEffect, useRef} from 'react';

type Compare = <T>(previous: T, next: T) => boolean;

export const useMemoCompare = <T>(next: T, compare: Compare): T | undefined => {
    const previousRef = useRef<T>();
    const previous = previousRef.current;

    const isEqual = compare(previous, next);

    useEffect(() => {
        if (!isEqual) {
            previousRef.current = next;
        }
    });

    return isEqual ? previous : next;
}
