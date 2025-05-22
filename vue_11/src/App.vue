<template>
  <p>
    每次增加1<button @click="increment">+</button>
    数字: {{ this.$store.state.add }}
  </p>
  <p>
    每次减少1<button @click="decrement">-</button>
    数字: {{ this.$store.state.reduce }}
  </p>
</template>
<script setup>
import { useStore } from 'vuex'
const store = useStore()
const increment = () => {
  store.commit('increase')
}
const decrement = () => {
  store.commit('decrease')
}
</script>
<style>
button {
  background-color: aquamarine;
}
</style>
