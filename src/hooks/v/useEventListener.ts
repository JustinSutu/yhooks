import { computed, isRef, ref, toValue, watch } from 'vue';
import {noop} from '../../utils/noop';

import type { Ref } from 'vue';

type Target = Ref<HTMLElement> | HTMLElement
type Events = Array<string> | string
type Listeners = Array<Function> | Function
type Options = AddEventListenerOptions | undefined
type Stop = (...args: any[]) => void;

export const useEventListener = (target: Target, eventName: Events, listenerFn: Listeners, options?: Options): Stop => {
    if (!target)
        return noop;

    const events = Array.isArray(eventName) ? eventName : [eventName];
    const listeners = Array.isArray(listenerFn) ? listenerFn : [listenerFn];

    const cleanups = ref<Function[]>();
    const cleanup = () => {
        cleanups.value?.forEach(fn => fn())
        cleanups.value = []
    }

    const register = (el: HTMLElement, event: string, listener: any, options: any): Function => {
        el.addEventListener(event, listener, options)
        return () => el.removeEventListener(event, listener, options)
    }

    const el = computed(() => isRef(target) ? toValue(target) : target)

    const stopWatch = watch(
        () => [toValue(el), options],
        ([elDom, options]) => {
            cleanup()
            if (!elDom) {
                return
            }

            const optionsClone = typeof(options) === 'object' ? { ...options } : options
            cleanups.value?.push(...events.flatMap(event =>
                listeners.map(listener => register((elDom as HTMLElement), event, listener, optionsClone))
            ))
        },
        {immediate: true, flush: 'post'},
    )

    return () => {
        stopWatch()
        cleanup()
    }
};
