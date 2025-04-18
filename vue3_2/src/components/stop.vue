<!-- <template>
<div v-on:click="show('我是父元素的事件')">
    <button v-on:click="show('我是子元素的事件')">事件冒泡</button>
    <button v-on:click.stop="show('我是子元素的事件')">阻止事件冒泡</button>
</div>

</template>

<script setup>
let show = message => console.log(message);

</script>
  <style>

</style> -->

<template>
<input type="text" @click.left="sub">
</template>
  
  <script setup>
  let sub=()=>{
    console.log('捕获到鼠标左键');

  }
 
  </script>