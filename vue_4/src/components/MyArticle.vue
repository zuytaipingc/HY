<template>
    <ArticleInfo>
        <template v-slot:header>
            <p>这是文章的头部区域</p>
        </template>
        <template v-slot:content>
            <p>这是文章的内容区域</p>
        </template>
        <template v-slot:footer>
            <p>这是文章的尾部区域</p>
        </template>
    </ArticleInfo>
</template>
<script setup>
    import ArticleInfo from './ArticleInfo.vue';
</script>