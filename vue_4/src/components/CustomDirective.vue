<template>
    <p v-fontSize = "fontsize">24P1080910115 蔡森帅</p>
    <button @click="fontSize = '24px'">更改字号大小</button>
</template>
<script setup>
import { ref } from 'vue';

    const fontSize = ref('12px')
    const vFontSize = {
        mounted: (el,binding) => {
            el.style.fonfSize = binding.value
        },
    }
</script>