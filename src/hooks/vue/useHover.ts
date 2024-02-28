import { onBeforeUnmount, onMounted, ref, Ref } from "vue"

interface Options {
    delayEnter?: number
    delayLeave?: number
}

type UseHover = (options: Options) => {
    isHover: Ref<boolean>
    elementRef: Ref<HTMLElement | null>
}

const useHover: UseHover = (options = {}) => {
    const isHover = ref<boolean>(false)
    const elementRef = ref<HTMLElement | null>(null)

    const {
        delayEnter = 0,
        delayLeave = 0
    } = options

    let timer: ReturnType<typeof setTimeout> | undefined

    const toggle = (entering: boolean) => {
        const delay = entering ? delayEnter : delayLeave
        if (timer) {
            clearTimeout(timer)
            timer = undefined
        }

        if (delay) {
            timer = setTimeout(() => isHover.value = entering, delay)
        }
        else {
            isHover.value = entering
        }
    }
    onMounted(() => {
        if (!elementRef.value) {
            return
        }
        elementRef.value.addEventListener('mouseenter', () => toggle(true))
        elementRef.value.addEventListener('mouseleave', () => toggle(false))
    })

    onBeforeUnmount(() => {
        if (!elementRef.value) {
            return
        }
        elementRef.value.removeEventListener('mouseenter', () => toggle(true))
        elementRef.value.removeEventListener('mouseleave', () => toggle(false))
    })

    return {isHover, elementRef}
}

export default useHover