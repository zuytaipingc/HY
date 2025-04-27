<template>
  <div id="app">
    <h1>河北工程技术学院</h1>
    <nav>
      <router-link to="/">首页</router-link> |
      <router-link to="/news">新闻</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
h1 {
  text-align: center;
}

nav {
  text-align: center;
  margin: 20px 0;
}

router-link {
  text-decoration: none;
  color: blue;
}
</style>    