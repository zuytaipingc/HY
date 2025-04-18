<template>
    <button @click="showInfo($event,666,888)">点你显示信息</button>

</template>

<script setup>
    function showInfo(event,b,c){
        console.log(event,b,c);
        
        
    }
</script>

<style>
</style>