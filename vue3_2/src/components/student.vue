<template>
    <div class="student">
        <h2>{{ msg }}</h2>
        <h2>学生姓名:{{ name }}</h2>
        <h2>学生性别:{{ sex }}</h2>
        <h2>学生年龄:{{ age+1 }}</h2>
        <!-- 外部传来的数据不能修改 -->
        <button @click="ChangeAge">修改收到的年龄</button>

    </div>
</template>

<script setup>
import { defineProps,ref } from 'vue';
let msg = ref('我是数智产业学院的学生')
    // let name = '张三'
    // let sex = '男'
    // const props = defineProps(['name','sex','age'])
//     const props = defineProps({
//   name: String,
//   sex: String,
//   age: Number
// });
const props = defineProps({
    name:{
        type:String,
        required:true
    },
    sex:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        default:99
    }
})
function ChangeAge(){
    age = 2000
}


</script>

<style>
    .student{
        background-color: turquoise;
        padding: 5px;
    }
</style>