<template>
  <div class="box">
    <!-- <button>请求数据</button> -->
    <button @click="getData">请求数据</button>
    <table width="90%" class="table">
      <caption>
        <h2>图书列表</h2>
      </caption>
      <thead>
        <tr>
          <th>编号</th>
          <th>书名</th>
          <th>作者</th>
        </tr>
      </thead>
      <tbody v-for="item in bookData.list" :key="item.id">
        <!-- 主体内容 -->
        <tr>
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.author }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import request from './axios/request.js'
const bookData = reactive({
  list: []
})
// 测试请求方法
const getData = function() {
  request({
    url: '/mock/getBooks',
    method: 'get'
  }).then(res => {
    bookData.list = res.data.data
  }).catch(error => {
    console.log(error)
  })
}
</script>

<style>
body, html {
  width: 100%;
  height: 100%;
}
#app {
  width: 100% !important;
}
table {
  border-collapse: collapse;
  margin: 0 auto;
  text-align: center;
}
table td, table th {
  border: 1px solid #cad9ea;
  color: #666;
  height: 30px;
}
table thead th {
  background-color: #CCE8EB;
  width: 100px;
}
table tr:nth-child(odd) {
  background: #fff;
}
table tr:nth-child(even) {
  background: #F5FAFA;
}
</style>
