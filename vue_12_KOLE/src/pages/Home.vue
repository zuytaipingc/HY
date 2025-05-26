<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const features = [
  {
    title: '发现艺术家',
    desc: '探索来自全球的音乐创作者',
    icon: '🎵',
    path: '/artists'
  },
  {
    title: '音乐游戏',
    desc: '边玩边学的音乐互动体验',
    icon: '🎮',
    path: '/games'
  },
  {
    title: '活动分享',
    desc: '参与线下音乐交流活动',
    icon: '🎤',
    path: '/events'
  }
]
</script>

<template>
  <div class="home-page">
    <HelloWorld msg="欢迎来到音乐宇宙" />
    
    <div class="feature-grid">
      <div 
        v-for="(item, index) in features" 
        :key="index"
        class="feature-card"
        @click="router.push(item.path)"
      >
        <div class="feature-icon">{{ item.icon }}</div>
        <h3>{{ item.title }}</h3>
        <p>{{ item.desc }}</p>
      </div>
    </div>
    
    <div class="latest-news">
      <h2>最新动态</h2>
      <div class="news-item">
        <span class="news-date">05/24</span>
        <span class="news-text">阿尔法九头蛇发布新专辑《数字梦境》</span>
      </div>
      <div class="news-item">
        <span class="news-date">05/20</span>
        <span class="news-text">Analogic Presents 全国巡演即将启动</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
}

.feature-card {
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid var(--accent-color);
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(255, 0, 0, 0.1);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.latest-news {
  margin-top: 4rem;
  background: rgba(0, 0, 0, 0.7);
  padding: 1.5rem;
  border-radius: 8px;
}

.latest-news h2 {
  color: var(--accent-color);
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #333;
}

.news-item {
  padding: 0.8rem 0;
  display: flex;
  border-bottom: 1px dashed #333;
}

.news-date {
  color: var(--accent-color);
  width: 60px;
}

.news-text {
  flex: 1;
}
</style>