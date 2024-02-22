import {useCallback, useEffect, useRef, useState} from 'react'
import type { RefObject } from 'react'

export const useHover = <T extends HTMLElement>(): {isHover: boolean, ref: RefObject<T>} => {
    const [isHover, setIsHover] = useState<boolean>(false)
    const ref = useRef<T>(null)

    const onMouseOver = useCallback(() => setIsHover(true), [])

    const onMouseOut = useCallback(() => setIsHover(false), [])

    useEffect(() => {
        const target = ref.current

        if (target) {
            target.addEventListener('mouseover', onMouseOver)
            target.addEventListener('mouseout', onMouseOut)

            return () => {
                target.removeEventListener('mouseover', onMouseOver)
                target.removeEventListener('mouseout', onMouseOut)
            }
        }
    }, [])

    return { isHover, ref }
}