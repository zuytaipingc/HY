<template>
<p v-fontSize>24P1080910115 蔡森帅</p>

</template>

<script setup>
    const vFontSize = {
        mounted:el => {
            el.style.fontSize = '24px'
            updated:(el,binding) => {
                el.style.fontSize = binding.value
            }
        }
    }
</script>

<style>

</style>