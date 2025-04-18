<template>
    <div class="Car">
        <h2>汽车信息：一辆{{ car.Brand }}车，价值{{ car.Price }}万</h2>
        <!-- 修改汽车价格 -->
        <button @click="ChangePrice">修改价格</button>
        <br>
        <h2>游戏列表</h2>
        <ul>
            <li v-for="g in games" v-bind:key="g.id">{{ g.name }}</li>
        </ul>
        <button @click="changeFirstGame">修改第一个游戏的名称</button>
    </div>
</template>

<script setup name="Car">
import { ref } from 'vue';
import { reactive } from 'vue';
//数据
const car = reactive({Brand:'保时捷Turbo 50周年纪念版',Price:'268.9'});
//方法
function ChangePrice() {
    car.Price += 1;
    console.log(carPrice.value);

}
//游戏数据
let games = ([{id:'2025001',name:"原神"},
    {id:'2025002',name:'王者'},
    {id:'2025003',name:'火影忍者手游'}
])

//游戏方法
function changeFirstGame(){
    games[0].name = "破解版"
}



</script>

<style>
button {
    margin-top: 10px;
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
</style>