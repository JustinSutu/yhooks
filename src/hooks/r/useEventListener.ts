import {useEffect, useRef} from 'react';

type IUseEventListener = (eventName: string, handler: Function, element: HTMLElement | Window) => void;

export const useEventListener: IUseEventListener = (eventName, handler = () => void 0, element = window ) => {
    const ref = useRef<Function | null>(null);

    useEffect(() => {
        ref.current = handler;
    }, [handler]);

    useEffect(() => {
        const isSupported = !!element && !!element.addEventListener;

        if (!isSupported) {
            return;
        }

        const eventListener: EventListenerOrEventListenerObject = (event: Event) => ref.current?.(event);

        element.addEventListener(eventName, eventListener);

        return () => element.removeEventListener(eventName, eventListener);
    }, [element, eventName]);
};
