<template>
    <div class="article-container">
        <div class="header-box">
            <slot name="header"></slot>
        </div>
        <div class="content-box">
            <slot name="content"></slot>
        </div>
        <div class="footer-box">
            <slot name="footer"></slot>
        </div>
    </div>
</template>
<style>
.article-container > div{
    border: 1px solid black;
}
</style>