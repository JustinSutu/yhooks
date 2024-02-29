import {useCallback, useEffect, useRef, useState} from 'react';

import type {MutableRefObject} from 'react'

export type IUseScreenToggle = (
    props: {
        initState?: boolean;
        allowEnterKey?: boolean;
        onFullCallback: () => void;
        onExitFullCallback: () => void;
    }
) => {
    ref: MutableRefObject<any>;
    isFullScreen: boolean;
    loading: boolean;
    onFullScreen: () => void;
    onExitFullScreen: () => void;
};

export const useScreenToggle: IUseScreenToggle = (
    {
        initState,
        allowEnterKey,
        onFullCallback,
        onExitFullCallback,
    }
) => {
    const ref = useRef<HTMLElement>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const onFullScreen = useCallback(async () => {
        setLoading(true);

        await ref.current?.requestFullscreen();

        setLoading(false);

        onFullCallback();
    }, [ref.current]);

    const onExitFullScreen = useCallback(async () => {
        setLoading(true);

        await document.exitFullscreen();

        setLoading(false);

        onExitFullCallback();
    }, [ref.current]);

    const onFullHandle = useCallback((e: KeyboardEvent) => {
        if (e.code == 'Enter') {
            void onFullScreen();
        }
    }, [onFullScreen]);

    useEffect(() => {
        if (!document.fullscreenEnabled) {
            return;
        }

        if (allowEnterKey) {
            ref.current?.addEventListener('keydown', onFullHandle, false);

            return () => {
                ref.current?.removeEventListener('keydown', onFullHandle);
            };
        }

        if (initState) {
            void onFullScreen();
        }
    }, [initState, allowEnterKey, ref.current]);


    return {
        ref,
        isFullScreen: document.fullscreenElement === null,
        loading,
        onFullScreen,
        onExitFullScreen,
    };
}
