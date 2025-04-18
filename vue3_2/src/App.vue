<!-- <template>
  修正属性名
  <<student name="张三" sex="男" v-bind:age="18"></student>
  <student name="李四" sex="女" age="20"></student>
  <student name="王五" sex="女" ></student> -->
<!-- </template> -->

<!-- <script setup> -->
<!-- // import student from './components/student.vue'; -->
<!-- // </script> -->

<!-- <style scoped> -->

<!-- </style> -->
<script setup>
import Students from './components/Students.vue';
import { ref } from 'vue';


let msg = ref('欢迎来到数值产业学院')
function getStudentName(name) {
  console.log('App组件接收到了学生姓名', name);
  msg.value += name

}
</script>
<template>
  <div class="app">
    <h2>父组件</h2>
    <h2>{{ msg }}</h2>
    <Students @hg="getStudentName"></Students>
  </div>
</template>

<style scoped>
.app {
  background-color: greenyellow;
  padding: 5px;
}
</style>