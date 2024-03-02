import {useEffect, useState} from 'react';

type IUseOnClickOutside = (element: HTMLElement | Document, callback?: Function) => boolean;

export const useStateOnOutside: IUseOnClickOutside = (element = document, callback) => {
    const [isOutside, setIsOutside] = useState(false);

    useEffect(() => {
        const listener = (event: Event) => {
            if (!element.contains(event.target as Node)) {
                setIsOutside(false);
                return;
            }

            setIsOutside(true);
            callback?.(event);
        };

        element.addEventListener('mousedown', listener);
        element.addEventListener('touchstart', listener);

        return () => {
            element.removeEventListener('mousedown', listener);
            element.removeEventListener('touchstart', listener);
        };
    }, [element, callback]);

    return isOutside;
};
