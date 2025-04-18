<template>
    <h1>ref定义的基本类型数据
    </h1>
    <h2>当前求和为：{{ sum }}</h2>
    <button @click="changeSum">点我sum+1</button>

</template>

<script setup>
import { ref, watch } from 'vue';

//数据
let sum = ref(0);
//方法
function changeSum(){
    sum.value+=1;
}
//监视
// 第一个参数：被监听的数据
// 第二个参数：回调函数，两个参数:新值newvalue 就值oldvalue 若只可有一个参数则为新值
// 取消监听；若需要调用取消监听函数

const stopwatch=watch(sum,(newvalue,oldvalue)=>{
    console.log(newvalue,oldvalue);
    if (newvalue >=10 ) {
        stopwatch()
        
    }
    
})
</script>

<style>

</style>