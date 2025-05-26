<script setup>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import MusicPlayer from './components/MusicPlayer.vue'
</script>

<template>
  <div class="app">
    <div class="animated-bg"></div>
    <Header />
    <main>
      <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>
    <Footer />
    <MusicPlayer />
  </div>
</template>

<style>
/* 全局样式 */
:root {
  --primary-bg: #000;
  --secondary-bg: #1a0000;
  --accent-color: #ff0000;
  --text-color: #fff;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  color: var(--text-color);
  min-height: 100vh;
  overflow-x: hidden;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
}

main {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

/* 背景动画 */
.animated-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: linear-gradient(-45deg, 
    var(--primary-bg), 
    var(--secondary-bg), 
    #300, 
    var(--primary-bg));
  background-size: 400% 400%;
  animation: gradientBG 15s ease infinite;
}

@keyframes gradientBG {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* 页面过渡效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>