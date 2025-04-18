<template>
    <p>父组件当前的值为：{{ number }}</p>
    <CustomSubComponent @updateCount="updateEmitCount" />
</template>
<!-- 蔡森帅 24P1080910115 -->
    <script setup>
        import CustomSubComponent from './CustomSubComponent.vue';
        import { ref } from 'vue';
        const number = ref(10)
        const updateEmitCount = (value) => {
            number.value += value
        }
</script>