<template>
    <Child :init="['唱歌','跳舞','滑冰']"></Child>
    <Child :init="hobby" />
    <Child :init="{height:'180厘米',weight:'70千克'}"></Child>
    <Child :height="bodyInfo.height" :weight="bodyInfo.weight"></Child>
    <Child v-bind="bodyInfo"></Child>

</template>
<script setup>
import Child from './Child.vue';
import { ref,reactive } from 'vue';
const hobby = ref(['唱歌','跳舞','滑冰'])
const bodyInfo = reactive({
    height:'180厘米',
    weight:'70千克'
})
</script>