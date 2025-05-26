<script setup>
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="container">
      <p>© {{ currentYear }} 音乐空间 | 黑红主题音乐网站</p>
      <div class="social-links">
        <a href="#" class="social-icon">微博</a>
        <a href="#" class="social-icon">微信</a>
        <a href="#" class="social-icon">网易云</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: rgba(0, 0, 0, 0.9);
  padding: 2rem;
  text-align: center;
  border-top: 1px solid var(--accent-color);
  margin-top: 3rem;
}

.social-links {
  margin-top: 1rem;
}

.social-icon {
  color: #ccc;
  margin: 0 10px;
  transition: color 0.3s;
}

.social-icon:hover {
  color: var(--accent-color);
}
</style>