<template>
    <slot message="Hello 默认插槽"></slot>
    <hr>
    <slot message="Hello vue.js" name="header"></slot>
    <hr>
    <slot :user="user" name="content"></slot>
</template>
<script setup>
import { reactive } from 'vue';

const user = reactive ({name:'xiaoyuan',age:'15'})

</script>