<template>
    <!-- 合并为一个 template 标签 -->
    <div class="Person">
      <h1>监视ref定义对象类型数据</h1>
      <h2>姓名：{{ name }}</h2>
      <h2>年龄：{{ age }}</h2>
      <!-- 绑定事件 -->
      <button @click="changeName">修改名字</button>
      <button @click="changeAge">修改年龄</button>
      <button @click="changePerson">修改整个人</button>
    </div>
  </template>
  
  <script setup name="Person">
  import { reactive,toRefs,ref,toRef,watch} from 'vue';
  
  // 使用 ref 创建响应式数据
  // let name = ref('李白');
  // let age = ref(18);
  
  // function changeName() {
  //   name.value = '白居易';
  //   console.log(name.value);
  // }
  
  // function changeAge() {
  //   age.value += 1;
  //   console.log(age.value);
  // }


  //数据
  let Person = ref({name:'张三',age:18})
  // let {name,age} = toRefs(person)
  // let na=toRef(person,'age')
  //方法
  function changeName(){
    Person.name.value +='%'
  }
  function changeAge(){
    Person.age.value+=1
  }
  function changePerson(){
    Person.value={name:'李四',age:89}
  }
  watch(Person,(newvalue,oldvalue)=>{
    console.log(newvalue,oldvalue);
    
  },{deep:true})
  </script>
  
  <style>
  /* 这里可以添加 Person 组件的样式 */
  </style>