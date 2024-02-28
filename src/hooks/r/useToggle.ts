import { useCallback, useState } from 'react'

export const useToggle: (initialState?: boolean) => [boolean, (state?: boolean) => void] = (initialState = false) => {
  const [state, setState] = useState(initialState)

  const onToggle = useCallback((state?: boolean) => {
    setState(state ?? !state)
  }, [])

  return [state, onToggle]
}
