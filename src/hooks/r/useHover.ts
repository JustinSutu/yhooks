import {useEffect, useRef, useState} from 'react';
import {useComponentHover} from './useComponentHover';
import {useDomHover} from './useDomHover';
import {isReactComponent} from '../../utils/isReactComponent';

import type {MutableRefObject} from 'react';

type IUseCurrencyHover = () =>
    (ReturnType<typeof useComponentHover> | { isHover: boolean }) & { ref:  MutableRefObject<HTMLElement | null | undefined>};

export const useHover: IUseCurrencyHover = () => {
    const ref = useRef<HTMLElement | null | undefined>(null);
    const { isHover: isComponentHover, onMouseEnter, onMouseLeave } = useComponentHover();
    const { isHover: isDomHover } = useDomHover();

    const [isComponent, setIsComponent] = useState<boolean>(false);

    useEffect(() => {
        setIsComponent(isReactComponent(ref))
    }, [ref]);

    if (isComponent) {
        return {
            ref,
            isHover: isComponentHover,
            onMouseEnter,
            onMouseLeave,
        }
    }

    return {
        ref,
        isHover: isDomHover,
    };
};