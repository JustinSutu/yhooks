import {useCallback, useEffect, useState} from 'react';

type WindowSize = {
    width: string | number;
    height: string | number;
};

export const useWindowSize = (): WindowSize => {
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: '100vw',
        height: '100vh',
    });

    const onResizeHandle = useCallback(() => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }, []);

    useEffect(() => {
        window.addEventListener('resize', onResizeHandle);

        return () => {
            window.removeEventListener('resize', onResizeHandle);
        };
    }, []);

    return windowSize;
};