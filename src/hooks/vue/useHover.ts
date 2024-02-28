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
    const onMouseEnter = () => toggle(true)
    const onMouseLeave = () => toggle(false)

    onMounted(() => {
        if (!elementRef.value) {
            return
        }
        elementRef.value.addEventListener('mouseenter', onMouseEnter)
        elementRef.value.addEventListener('mouseleave', onMouseLeave)
    })

    onBeforeUnmount(() => {
        if (!elementRef.value) {
            return
        }
        elementRef.value.removeEventListener('mouseenter', onMouseEnter)
        elementRef.value.removeEventListener('mouseleave', onMouseLeave)
    })

    return {isHover, elementRef}
}

export default useHover