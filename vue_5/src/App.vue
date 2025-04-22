<template>
  <div>
    <h2>VUE路由</h2>
    <!-- 导航区 -->
    <router-link to="/home">首页</router-link>
    <router-link to="/news">新闻</router-link>
    <router-link to="/about">关于</router-link>

    <!-- 展示区 -->
    <router-view></router-view>
  </div>
</template>

<script setup>
</script>

<style scoped>
/* 可根据需要添加全局样式 */
</style>