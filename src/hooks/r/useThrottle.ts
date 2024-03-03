import {useCallback, useEffect, useRef} from 'react';
import {noop} from '../../utils/noop';

type Timer = ReturnType<typeof setTimeout> | undefined;

interface ThrottleProps {
    callback?: () => any;
    time?: number;
}

export const useThrottle = ({callback = noop, time = 0}: ThrottleProps) => {
    const timerRef = useRef<Timer>(undefined);

    useEffect(() => {
        return () => {
            if (timerRef.current !== null) {
                clearTimeout(timerRef.current);
            }
        }
    }, [timerRef]);

    return useCallback(() => {
        if (timerRef.current) {
            return;
        }

        callback();

        timerRef.current = setTimeout(() => {
            clearTimeout(timerRef.current!);

            timerRef.current = undefined;
        }, time);
    }, [callback, time])
};