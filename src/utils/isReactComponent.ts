import {MutableRefObject} from 'react';

export const isReactComponent = (ref: MutableRefObject<HTMLElement | null | undefined>)=>
    ref?.current instanceof HTMLElement;