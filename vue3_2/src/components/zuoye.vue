<template>
    <div class="Person">
      <h1>监视【ref】定义对象类型数据</h1>
      <h2>姓名：{{ Person.name }}</h2>
      <h2>年龄：{{ Person.age }}</h2>
      <!-- 绑定事件 -->
      <button @click="changeName">修改名字</button>
      <button @click="changeAge">修改年龄</button>
      <button @click="changePerson">修改整个人</button>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'; 

  // 数据
  let Person = ref({ name: '张三', age: 18 });

  // 方法
  function changeName() {
    Person.value.name += '%';
  }

  function changeAge() {
    Person.value.age += 1;
  }

  function changePerson() {
    Person.value = { name: '李四', age: 89 };
  }

  watch(Person, (newValue, oldValue) => {
    console.log(newValue, oldValue);
  }, {
  });
  </script>
  
  <style>
  /* 这里可以添加 Person 组件的样式 */
  </style>