import {useCallback} from 'react'
import {useCreateRefs} from './useCreateRefs';
import {useIsomorphicEffect} from './useIsomorphicEffect';

import type { HTMLElementRefs } from './useCreateRefs';

export type OutsideHookProps = {
    container?: HTMLElement | Document
    num?: number
    callbacks?: {
        outsideCallback?: (event?: Event) => void
        inSideCallback?: (event?: Event) => void
    }
}

export const useClickOutside = (
    {
        container = document,
        num,
        callbacks,
    }: Pick<OutsideHookProps, 'container' | 'num' | 'callbacks'>): HTMLElementRefs => {
    const refs = useCreateRefs(num)

    const handleClickOutside = useCallback(
        (event: Event) => {
            const validRefs = refs.filter((ref) => Boolean(ref.current))
            const isOutside = validRefs.every((ref) => !ref.current?.contains(event.target as Node))

            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            isOutside ? callbacks?.outsideCallback?.(event) : callbacks?.inSideCallback?.(event)
        },
        [refs, callbacks],
    )

    useIsomorphicEffect(() => {
        container.addEventListener('mousedown', handleClickOutside)

        return () => {
            container.removeEventListener('mousedown', handleClickOutside)
        }
    }, [container, handleClickOutside])

    return refs
}

