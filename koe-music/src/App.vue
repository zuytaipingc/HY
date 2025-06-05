<template>
  <div class="app-container">
     <AppHeader />
  <router-view />
    <AudioPlayer v-if="showPlayer" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AudioPlayer from './components/AudioPlayer.vue'

const route = useRoute()
const showPlayer = computed(() => route.meta.showPlayer)
</script>

<style>
/* 清除所有可能继承的样式 */
body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

/* 关键背景样式直接放在这里确保优先级 */
#app {
  min-height: 100vh;
  background: linear-gradient(-45deg, #3a7bd5, #00d2ff, #f857a6, #ff5858);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
}

.app-container {
  min-height: 100vh;
}

</style>