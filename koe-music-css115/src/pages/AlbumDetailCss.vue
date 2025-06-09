<template>
  <div class="album-detail">
    <div class="back-header">
      <el-button 
        @click="goBack" 
        :icon="ArrowLeft" 
        text 
        class="back-button"
      >
        返回
      </el-button>
      <h1 class="album-title">{{ album.title }}</h1>
    </div>

    <div class="album-header">
      <img :src="album.cover" class="album-cover" :alt="album.title">
      <div class="album-meta">
        <h2>{{ album.title }}</h2>
        <p>发行年份: {{ album.year }}</p>
        <p>歌手: {{ singerName }}</p>
      </div>
    </div>

    <h3>歌曲列表</h3>
    <div class="song-list">
      <div v-for="song in songs" :key="song.id" class="song-item" @click="playSong(song)">
        <img :src="song.cover" class="song-cover" :alt="song.title">
        <div class="song-info">
          <h4>{{ song.title }}</h4>
          <p>{{ song.duration }}</p>
        </div>
        <button class="btn favorite-btn" @click.stop="toggleFavorite(song)">
          {{ isFavorite(song.id) ? '取消收藏' : '收藏' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount } from 'vue'
import { ArrowLeft } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { useMusicStore } from '../store/index'

const route = useRoute()
const router = useRouter()
const musicStore = useMusicStore()

const albumId = parseInt(route.params.id)
const album = computed(() => {
  for (const singerId in musicStore.albums) {
    const found = musicStore.albums[singerId].find(a => a.id === albumId)
    if (found) return found
  }
  return {}
})

const songs = computed(() => musicStore.songs[albumId] || [])

const singerName = computed(() => {
  const singer = musicStore.singers.find(s => s.id === album.value.singerId)
  return singer ? singer.name : '未知歌手'
})

const isFavorite = (songId) => {
  return musicStore.favorites.some(song => song.id === songId)
}

const playSong = (song) => {
  musicStore.playSong(song)
}

const toggleFavorite = (song) => {
  if (isFavorite(song.id)) {
    musicStore.removeFromFavorites(song.id)
  } else {
    musicStore.addToFavorites(song)
  }
}

const goBack = () => {
  router.go(-1)
}

// 新增的生命周期钩子
onMounted(() => {
  // 确保页面可以滚动
  document.documentElement.style.overflow = 'auto'
  document.body.style.overflow = 'auto'
})

onBeforeUnmount(() => {
  // 离开页面时恢复滚动
  document.documentElement.style.overflow = 'auto'
  document.body.style.overflow = 'auto'
  document.documentElement.style.height = 'auto'
  document.body.style.height = 'auto'
})
</script>

<style scoped>
.album-detail {
  padding: 20px;
  overflow-y: auto;
  height: 100vh;
  padding: 20px 20px 20px 9%;
  /* 左侧留白14%（约1/7屏幕宽度） */
  max-width: 1000px;
  /* 适当增加最大宽度 */
  margin: 0;
}

.album-header {
  display: flex;
  gap: 30px;
  margin: 30px 0;
  display: flex;
  gap: 20px;
  margin: 20px 0;
  align-items: flex-start;
}
.album-title {
  margin: 0;
  font-size: 18px;
  font-weight: normal;
}


.album-cover {
  width: 160px;
  /* 稍大的封面尺寸 */
  height: 160px;
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.album-meta h2 {
  margin: 0 0 10px;
  font-size: 28px;
}

.album-meta p {
  margin: 8px 0;
  color: #aaa;
}

.song-list {
  margin-top: 30px;
}

.song-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.3s;
}

.song-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.song-cover {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  object-fit: cover;
  margin-right: 15px;
}

.song-info {
  flex-grow: 1;
}

.song-info h4 {
  margin: 0;
  font-size: 16px;
}

.song-info p {
  margin: 5px 0 0;
  color: #aaa;
  font-size: 14px;
}

.favorite-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
}

.favorite-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}
.back-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.back-button {
  padding: 8px 12px;
  font-size: 14px;
  color: var(--el-text-color-primary);
}

.back-button:hover {
  color: var(--el-color-primary);
}

</style>