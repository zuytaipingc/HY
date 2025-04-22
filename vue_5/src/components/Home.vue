<template>
    <div class="home">
      <ul>
        <!-- 导航区 -->
        <li>
          <router-link to="/home/section1">板块1</router-link>
        </li>
        <li>
          <router-link to="/home/section2">板块2</router-link>
        </li>
      </ul>
      <!-- 展示区（后续可按需添加内容） -->
    </div>
  </template>
  
  <script setup>
  // 这里可添加首页的逻辑代码，目前暂空
  </script>
  
  <style scoped>
  .home {
    background-color: lightgreen;
    padding: 15px;
    min-height: 50px;
  }
  </style>