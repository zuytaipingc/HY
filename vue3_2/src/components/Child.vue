<template>
    <div>
      <div v-if="init">
        <div v-if="Array.isArray(init)">爱好: {{ init.join(', ') }}</div>
        <div v-else>
          <p v-for="(value, key) in init" :key="key">{{ key }}: {{ value }}</p>
        </div>
      </div>
      <div v-if="height || weight">
        <p v-if="height">身高: {{ height }}</p>
        <p v-if="weight">体重: {{ weight }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    init: {
      type: [Array, Object],
      default: () => null
    },
    height: String,
    weight: String
  });
  </script>
  
  <style scoped>
  </style>    