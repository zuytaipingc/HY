<template>
    <div v-for="(item,index) in list" :key="index">
        索引是:{{ index }}---元素的内容是：{{ item }}

    </div>

    <div v-for="item1 in list1" :key="item1.id">
        id是:{{ item1.id }}  ---元素内容是:{{ item1.message }}
    </div>
</template>

<script setup>
import { reactive } from 'vue';

    const list = reactive(['HTML','CSS','JS'])
    const list1 = reactive([
        {id:1,message:'梅',},
        {id:2,message:'兰',},
        {id:3,message:'竹',},
        {id:4,message:'菊',}
    ])
</script>

<style>

</style>