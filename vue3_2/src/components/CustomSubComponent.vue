<template>
    <p>count值为：{{ count }}</p>
    <button @click="add">加n</button>
</template>
<script setup>
import { ref } from 'vue';

    const emit = defineEmits(['updateCount'])
    const count = ref(1)
    const add = () =>{
        count.value++
        emit('updateCount',2)
    }
</script>