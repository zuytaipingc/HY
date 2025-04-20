<template>
    <div class="home-container">
      <h3>Home组件</h3>
      <!-- 命名路由
      <router-link :to="{ name: 'MovieDetails', params: { id: 3 } }">跳转到MovieDetails组件</router-link>
      -->
      <!-- 编程式导航 -->
      <a href="#" @click.prevent="gotoMovie(3)">跳转到MovieDetails组件</a>
    </div>
  </template>
  
  <script setup>
  // 编程式导航
  import { useRouter } from 'vue-router'
  const router = useRouter()
  const gotoMovie = movieId => {
    router.push({
      name: 'MovieDetails',
      params: { id: movieId }
    })
  }
  </script>
  
  <style scoped>
  .home-container {
    min-height: 150px;
    background-color: #f2f2f2;
    padding: 15px;
  }
  </style>