<template>
    <div> count的值为：{{ count }}</div>
      <!-- 显示触发事件的节点名称 -->
      <div> 触发事件的节点名称为：{{ nodeName }}</div>
    <button @click="addCount(3,$event)">count+n</button>
</template>

<script setup>
import { ref } from 'vue';

const count = ref(1)

// 初始化 nodeName 为空字符串，用于存储触发事件的节点名称
const nodeName = ref('');
const addCount = (n,event) =>{
    // 获取触发事件的节点的标签名，并赋值给 nodeName
    nodeName.value = event.target.tagName;
    count.value+=n
    if (count.value % 2 ===0) {
        event.target.style.border = '3px dotted'
        
    }else{
         event.target.style.border = '3px solid'
    }
}
</script>

<style>
</style>