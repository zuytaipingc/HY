<template>
    <input v-focus type="text">
</template>
<script setup>
//私有自定义指令
const vFocus = {
    mounted(el){
        el.focus()
        el.style.backgroundColor = 'yellow'
    }
}
</script>