<script setup>
// Your script setup if needed
</script>

<template>
  <div class="app">
    <!-- 标题 -->
    <h2>VUE路由</h2>
    <!-- 导航区 -->
    <router-link to="/home">首页</router-link>
    <router-link to="/news">新闻</router-link>
    <router-link to="/about">关于</router-link>

    <!-- 展示区 -->
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.app {
  text-align: center;
  font-size: 20px;
}
</style>