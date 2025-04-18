<template>
<p>Number1:{{ num1 }}</p>
<p>Number2:{{ num2 }}</p>
<button @click="changeNum1">点击num1的值加1</button>
<button @click="changeNum2">点击num2的值加1</button>
<p>Sum：{{ sum }}</p>
</template>

<script setup>
import { computed,ref } from 'vue';
let num1 = ref(0)


let num2 = ref(0)

let sum = computed(()=>{
    return num1.value+num2.value
})
function changeNum1(){
    num1.value++;

}
function changeNum2(){
    num2.value++;
}


</script>

<style>

</style>