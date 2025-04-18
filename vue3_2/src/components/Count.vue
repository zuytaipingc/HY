<template>
  初始值为：{{ num }}
</template>

<script setup>
const props = defineProps({
  num: {
    type: Number
  }
})
</script>
