<template>
    <div>
        <input v-model="rmb" />
        <p>人民币：{{ rmb }}￥</p>
        <p>美元：{{ usd }}$</p>
    </div>
</template>

<script setup>
import { ref,reactive, watch, computed } from 'vue';
let rmb = ref(0);
// let usd = ref(0);
// watch(rmb,(newvalue,oldvalue)=>{
//     console.log(newvalue,oldvalue);
//     usd.value = newvalue / 6.78
    

// })

//计算属性
// let usd = computed(()=>{
//     return rmb.value / 6.78
    
// })

let usd = computed(()=>
    rmb.value / 6.78
    
)

</script>

<style>

</style>