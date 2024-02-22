import {useEffect, useRef} from 'react'

export const useFirstRender = (beforeEffect?: boolean) => {
    const firstRender = useRef<boolean>(true)

    if (beforeEffect && firstRender.current) {
        firstRender.current = false

        return true
    }

    useEffect(() => {
        if (!beforeEffect && firstRender.current) {
            firstRender.current = false
        }
    }, [])

    return firstRender.current
};