<template>
    <div class="news">
      <!-- 导航区 -->
      <ul>
        <li>
          <router-link to="/news/news001">新闻001</router-link>
        </li>
        <li>
          <router-link to="/news/news002">新闻002</router-link>
        </li>
        <li>
          <router-link to="/news/news003">新闻003</router-link>
        </li>
      </ul>
      <!-- 展示区 -->
      <router-view></router-view>
    </div>
  </template>
  
  <script setup>
  // 这里可以编写News组件相关的逻辑代码
  // 例如从后端获取新闻列表数据等，目前暂空
  </script>
  
  <style scoped>
  .news {
    background-color: pink;
    padding: 15px;
    min-height: 50px;
  }
  </style>