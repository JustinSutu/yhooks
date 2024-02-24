import {useRef} from 'react'

import type {MutableRefObject} from 'react'

export type HTMLElementRefs = MutableRefObject<any>[]

export const useCreateRefs = (num = 1): HTMLElementRefs => {
    const refs = []

    for (let i = 0; i < num; i++) {
        refs.push(useRef(null))
    }

    return refs
}
