<template>
    <div>
        <header>
            <!-- 定义具名插槽 -->
            <slot name="header"></slot>
        </header>
        <main>
            <slot name="main"></slot>
        </main>
        <footer>
            <slot name="footer"></slot>
        </footer>
    </div>
    <div>
        我是子组件
        <slot name="www" user="user"></slot>
    </div>
</template>
<script setup>
const user = {
    name:'杜牧',
    times:'唐朝'
}

</script>