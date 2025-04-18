<template>
    <div class="student">
        <h2>子组件</h2>
        <h2>学生姓名：{{ name }}</h2>
        <h2>学生学号：{{ sno }}</h2>


    </div>
    <button @click="sendStudentName">把学生姓名传递给App组件</button>
</template>

<script setup>
let name = '黎明'
let sno = '2025001'
//声明自定义事件 自定义事件名：hg
const emit = defineEmits(['hg'])
function sendStudentName() {
    //触发自定义事件
    emit("hg", name)
}
</script>

<style>
.student {
    background-color: pink;
    padding: 5px;
}
</style>