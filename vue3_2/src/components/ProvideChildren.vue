<template>
  <div>子组件</div>
  <hr>
  从爷爷组件接收到的资金：{{ money }}
  <button @click="updateMoney(500)">单击按钮增加资金</button>
</template>

<script setup>
import { inject } from 'vue'
let money = inject('money')
let updateMoney = inject('updateMoney')
</script>
 