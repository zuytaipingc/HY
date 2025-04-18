<!-- <template>
    <div>
        {{ massage }}
    </div>    
    <div v-text="massage"></div>
    <div v-html="massage"></div>
    
    <p>
        <input type="text" v-bind:placeholder="username">
    </p>
    <div>{{ username }}</div>
    <p>
        
        <input type="text" v-bind:placeholder="password">
    </p>
    <div></div>

</template>

<script setup>
const massage = '<strong>咬定青山不放松，立根只在破岩中</strong>'
const username = '请输入用户名'
const password = '请输入密码'
</script>

<style>

</style> -->




<!-- <template>
    <button @click="showInfo">输出信息</button>
    <br>
    请输入姓名：<input type="text" v-model="username">
    <div>姓名是：{{ name }}</div>

</template>
<script setup>
import { ref } from 'vue';
    const showInfo = ()=>{
        console.log("欢迎来到vue.js的世界");
        
    }
    const name = ref('lisi')
</script> -->



<!-- <template>
    <button @click="showInfo">输出信息</button>
    <br>
    请输入姓名：<input type="text" @input="updateName($event.target.value)">
    <div>姓名是：{{ name }}</div>
    <br>
    请输入职务：<input type="text" v-model="position">
    <div>职务是：{{ position }}</div>
</template>

<script setup>
import { ref } from 'vue';
const name = ref('lisi');
const position = ref('');

const showInfo = () => {
    console.log(`姓名：${name.value}，职务：${position.value}`);
};

const updateName = (newName) => {
    name.value = newName;
};
</script> -->

<template>
    小茗同学的学习评定等级为
    <p v-if="type === 'A'">优秀</p>
    <p v-else-if="type === 'B'">良好</p>
    <p v-else>差</p>
    <button @click="type = 'A'">切换成优秀</button>
    <button @click="type = 'B'">切换成良好</button>
    <button @click="type = 'C'">切换成差</button>


</template>
<script setup>
    import {ref} from 'vue'
    const type = ref('B')
</script>



