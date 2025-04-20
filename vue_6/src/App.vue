<template>
  <div class="app-container">
    <h1>App根组件</h1>
    <router-link to="/home">首页</router-link>
    <router-link to="/about">关于</router-link>
    <router-link to="/movie">电影</router-link>
    <hr>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.app-container {
  text-align: center;
  font-size: 16px;
}
.app-container a {
  padding: 10px;
  color: #000;
}
.app-container a.router-link-active {
  color: #fff;
  background-color: #000;
}
/* 更改路由链接激活项的类名 */
/* .app-container .router-active{
  color: #fff;
  background-color: #999;
} */
</style>

