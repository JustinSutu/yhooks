<script setup lang="ts">
import { computed } from 'vue';
import {useHover} from '../../../src/hooks/vue';

const {isHover, elementRef} = useHover({delayEnter: 1000,  delayLeave: 1000})
const color = computed(() => isHover.value ? 'yellow' : 'red')
</script>

<template>
  <div class="demo" ref="elementRef">
    {{isHover ? 'hover' : 'not hover'}}
  </div>
</template>

<style scoped>
.demo {
  width: 100px;
  height: 100px;
  background: v-bind(color);
}
</style>
