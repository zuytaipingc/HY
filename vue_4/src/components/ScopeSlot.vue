<template>
    <SubScopeSlot>
        <template v-slot:default="scope">
            <p>{{ scope }}</p>
        </template>
        <template v-slot:header="scope">
            <p>{{ scope }}</p>
            <p>{{ scope.message }}</p>
        </template>
        <template #content="{user}">
            <p>{{ user.name }}</p>
            <p>{{ user.age }}</p>
        </template>
    </SubScopeSlot>
</template>
<script setup>
import SubScopeSlot from './SubScopeSlot.vue';
</script>