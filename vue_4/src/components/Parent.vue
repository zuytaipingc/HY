<template>
   我是父组件
    <Child>
        <!-- 这是插槽的内容 -->
         <!-- 默认插槽 -->
         <template v-slot:header>
            这是插槽header的内容
         </template>
         <template #main>
            这是插槽main的内容
         </template>
         <template v-slot:footer>
            这是插槽footer的内容
         </template>
         <template v-slot:www="{ user }">
            <div class="green">
               <h1>清明</h1>
               <h3>{{ user.name }} {{ user.times }}</h3>
               <p>清明时节雨纷纷， <br>
                  路上行人欲断魂。<br>
                  借问酒家何处有，<br>
                  牧童遥指杏花村。
               </p>

            </div>
         </template>
    </Child>
</template>

<script setup>
    import Child from './Child.vue';
</script>

<style>

</style>