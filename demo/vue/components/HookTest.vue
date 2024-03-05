<script setup lang="ts">
import { ref } from 'vue';
import {useEventListener} from '../../../src/hooks/v';

const elementRef = ref();

const stop = useEventListener(elementRef, 'click', (evt: Event) => {
  console.log(evt)
});

</script>

<template>
    <div class="demo" ref="elementRef"></div>
    <div class="demo2" @click="stop"></div>
</template>

<style scoped>
.demo {
    width: 100px;
    height: 100px;
    background: red;
}

.demo2 {
    width: 100px;
    height: 100px;
    background: yellow;
}
</style>
