<template>
    MyRight组件
</template>
<script setup>
import { onMounted, ref, onUnmounted, onActivated, onDeactivated } from 'vue';

    onActivated(
    () => {
        console.log('MyRight组件被激活了');

    }
)
onDeactivated(
    ()=>{
        console.log('MyRight组件被缓存了');
        
    }
)
</script>