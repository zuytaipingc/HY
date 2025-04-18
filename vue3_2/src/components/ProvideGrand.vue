<template>
  <div>爷爷组件</div>
  <hr>
  <ProvideParent />
</template>

<script setup>
import ProvideParent from './ProvideParent.vue'
import { ref, provide } from 'vue'
let money = ref(1000)
let updateMoney = (value) => {
  money.value += value
}
provide('money', money)
provide('updateMoney', updateMoney)
</script>
 
<!-- 24P1080910115 蔡森帅 -->