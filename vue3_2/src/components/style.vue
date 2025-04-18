<template>
    <div v-bind:style="styleArray">天街小雨润如酥，草色遥看近却无。最是一年春好处，绝胜烟柳满皇都</div>
</template>

<script setup>
// let styleString = 'color:green'
// let styleObject = {color:'green',fontSize:'100px'}
   let styleArray = [{ color: 'red' }, { fontSize: '30px' }, { background: 'yellow' }]
</script>

<style></style>