<script setup>
import { onMounted, ref } from 'vue'
import api from '../utils/api'
import { useMusicStore } from '../store'
import { useRouter } from 'vue-router'

const musicStore = useMusicStore()
const router = useRouter()
const featuredSongs = ref([])
const featuredSingers = ref([])

onMounted(async () => {
  try {
    const [songsRes, singersRes] = await Promise.all([
      api.getSongs(),
      api.getSingers()
    ])
    featuredSongs.value = songsRes.data
    featuredSingers.value = singersRes.data
  } catch (error) {
    console.error('获取数据失败:', error)
  }
})

const playSong = (song) => {
  musicStore.playSong(song)
}

const navigateTo = (path) => {
  router.push(path)
}
</script>

<template>
  <div class="home">
    <div class="welcome-banner">
      <h1>欢迎来到音乐空间</h1>
    </div>
    
    <div class="section">
      <h2 class="section-title">推荐歌曲</h2>
      <div class="song-grid">
        <div 
          v-for="song in featuredSongs" 
          :key="song.id" 
          class="song-card" 
          @click="playSong(song)"
        >
          <img :src="song.cover" :alt="song.title" class="song-cover" />
          <div class="song-info">
            <h3>{{ song.title }}</h3>
            <p>{{ song.singer }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="section">
      <h2 class="section-title">热门歌手</h2>
      <div class="singer-grid">
        <div 
          v-for="singer in featuredSingers" 
          :key="singer.id" 
          class="singer-card"
          @click="navigateTo(`/song-list?singerId=${singer.id}`)"
        >
          <img :src="singer.avatar" :alt="singer.name" class="singer-avatar" />
          <div class="singer-info">
            <h3>{{ singer.name }}</h3>
            <p>{{ singer.songsCount }} 首歌曲</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.welcome-banner {
  background: linear-gradient(135deg, #ff4d4d 0%, #990000 100%);
  padding: 30px;
  border-radius: 8px;
  margin-bottom: 30px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(255, 77, 77, 0.3);
}

.welcome-banner h1 {
  color: white;
  font-size: 2.5rem;
  margin: 0;
}

.section {
  margin-bottom: 40px;
}

.section-title {
  color: #ff4d4d;
  margin-bottom: 20px;
  font-size: 1.8rem;
  padding-bottom: 10px;
  border-bottom: 2px solid #333;
}

.song-grid, .singer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 25px;
}

.song-card, .singer-card {
  background-color: #1a1a1a;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.song-card:hover, .singer-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(255, 77, 77, 0.3);
}

.song-cover, .singer-avatar {
  width: 100%;
  height: 180px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.song-card:hover .song-cover, 
.singer-card:hover .singer-avatar {
  transform: scale(1.05);
}

.singer-avatar {
  border-radius: 10px 10px 0 0;
}

.song-info, .singer-info {
  padding: 15px;
}

.song-info h3, .singer-info h3 {
  margin: 0 0 8px 0;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
}

.song-info p, .singer-info p {
  margin: 0;
  color: #aaa;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .song-grid, .singer-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
  }
  
  .song-cover, .singer-avatar {
    height: 140px;
  }
  
  .welcome-banner h1 {
    font-size: 2rem;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
}
</style>