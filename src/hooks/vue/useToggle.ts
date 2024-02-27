import { ref } from 'vue';
import type { Ref } from 'vue';
export const useToggle: (initialState?: boolean) => [Ref<boolean>, (state?: boolean) => void] = (
  initialState = false,
) => {
  const state = ref(initialState);

  const onToggle = (newState?: boolean) => {
    state.value = newState ?? !state.value;
  };

  return [state, onToggle];
};
