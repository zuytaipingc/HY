<template>
    MyLeft组件
    <div>
        count的值为：{{ count }}
        <button @click="count++">+1</button>
    </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted, onActivated, onDeactivated } from 'vue';

const count = ref(0)
onMounted(
    () => {
        console.log('MyLeft组件被挂载了')

    }
)
onUnmounted(
    () => {
        console.log('MyLeft组件被销毁了')

    })
onActivated(
    () => {
        console.log('MyLeft组件被激活了');

    }
)
onDeactivated(
    ()=>{
        console.log('MyLeft组件被缓存了');
        
    }
)
</script>