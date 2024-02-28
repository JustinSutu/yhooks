import {useRef} from 'react'
import {useIsomorphicEffect} from './useIsomorphicEffect';

export const useFirstRender = (beforeEffect?: boolean) => {
    const firstRender = useRef<boolean>(true)

    if (beforeEffect && firstRender.current) {
        firstRender.current = false

        return true
    }

    useIsomorphicEffect(() => {
        if (!beforeEffect && firstRender.current) {
            firstRender.current = false
        }
    }, [])

    return firstRender.current
};