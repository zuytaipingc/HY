<template>
    <div class="about">
      <ul>
        <!-- 导航区 -->
        <li>
          <router-link to="/about/detail1">详情1</router-link>
        </li>
        <li>
          <router-link to="/about/detail2">详情2</router-link>
        </li>
      </ul>
      <!-- 展示区（后续可按需添加内容） -->
    </div>
  </template>
  
  <script setup>
  // 这里可添加关于页面的逻辑代码，目前暂空
  </script>
  
  <style scoped>
  .about {
    background-color: lightblue;
    padding: 15px;
    min-height: 50px;
  }
  </style>