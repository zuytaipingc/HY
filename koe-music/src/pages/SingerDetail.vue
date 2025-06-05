<template>
  <div class="singer-detail">
    <!-- 新增返回按钮 -->
     <div class="back-header">
      <el-button 
        @click="router.back()" 
        :icon="ArrowLeft" 
        text 
        class="back-button"
      >
        返回
      </el-button>
      <h1 class="singer-title">{{ singer.name }}</h1>
    </div>
    <!-- 歌手头部信息 -->
    <div class="singer-header">
      <el-avatar :size="120" :src="singer.avatar" class="singer-avatar">
        <img :src="singer.avatar" @error="handleImageError" />
      </el-avatar>
      <div class="singer-info">
        <h1>{{ singer.name }}</h1>
        <div class="singer-meta">
          <el-tag type="info">{{ singer.region }}</el-tag>
          <el-tag type="success">{{ singer.genre }}</el-tag>
        </div>
        <p class="singer-description">{{ singer.description }}</p>
        <div class="singer-stats">
          <div class="stat-item">
            <span class="stat-number">{{ albums.length }}</span>
            <span class="stat-label">张专辑</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ totalSongs }}</span>
            <span class="stat-label">首歌曲</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 专辑列表 -->
    <div class="section-title">
      <el-icon>
        <Collection />
      </el-icon>
      <span>专辑列表</span>
    </div>

    <div class="album-grid">
      <div v-for="album in albums" :key="album.id" class="album-card" @click="goToAlbum(album.id)">
        <div class="album-cover-container">
          <el-image :src="album.cover" class="album-cover" fit="cover" :preview-src-list="[album.cover]">
            <template #error>
              <div class="image-error">
                <el-icon>
                  <Picture />
                </el-icon>
              </div>
            </template>
          </el-image>
          <div class="album-year">{{ album.year }}</div>
        </div>
        <div class="album-info">
          <h3 class="album-title">{{ album.title }}</h3>
          <div class="album-actions">
            <el-button type="primary" size="small" @click.stop="playRandomSong(album.id)" circle>
              <el-icon>
                <VideoPlay />
              </el-icon>
            </el-button>
            <el-button type="info" size="small" @click.stop="goToAlbum(album.id)" circle>
              <el-icon>
                <More />
              </el-icon>
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 热门歌曲 -->
    <div class="section-title">
      <el-icon>
        <Headset />
      </el-icon>
      <span>热门歌曲</span>
    </div>

    <div class="song-list">
      <div v-for="(song, index) in topSongs" :key="song.id" class="song-item" @click="playSong(song)">
        <div class="song-index">{{ index + 1 }}</div>
        <el-image :src="song.cover" class="song-cover" fit="cover">
          <template #error>
            <div class="image-error">
              <el-icon>
                <Picture />
              </el-icon>
            </div>
          </template>
        </el-image>
        <div class="song-details">
          <div class="song-title">{{ song.title }}</div>
          <div class="song-album">{{ getAlbumName(song.albumId) }}</div>
        </div>
        <div class="song-duration">{{ song.duration }}</div>
        <div class="song-popularity">
          <el-progress :percentage="song.popularity" :show-text="false" :stroke-width="4" />
        </div>
      </div>
    </div>

    <!-- 歌手介绍 -->
    <div class="section-title">
      <el-icon>
        <Document />
      </el-icon>
      <span>歌手介绍</span>
    </div>

    <el-card class="bio-card">
      <div v-html="formattedBio"></div>
      <div class="social-links" v-if="singer.socialLinks">
        <a v-for="link in singer.socialLinks" :key="link.type" :href="link.url" target="_blank" class="social-link">
          <el-icon :size="20">
            <component :is="link.icon" />
          </el-icon>
        </a>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ArrowLeft } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { useMusicStore } from '../store'
import {
  Collection, Headset, Document, Picture,
  VideoPlay, More, Share, ChatDotRound
} from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const musicStore = useMusicStore()

// 获取歌手数据
const singerId = parseInt(route.params.id)
const singer = computed(() => {
  return musicStore.singers.find(s => s.id === singerId) || {
    name: '',
    avatar: '',
    description: '',
    region: '',
    genre: '',
    socialLinks: []
  }
})

// 获取专辑数据
const albums = computed(() => {
  return Object.values(musicStore.albums)
    .flat()
    .filter(album => album.singerId === singerId)
    .sort((a, b) => b.year - a.year)
})

// 计算总歌曲数
const totalSongs = computed(() => {
  return albums.value.reduce((total, album) => {
    return total + (musicStore.songs[album.id]?.length || 0)
  }, 0)
})

// 热门歌曲 (取播放量前10)
const topSongs = computed(() => {
  const allSongs = albums.value.flatMap(album =>
    musicStore.songs[album.id] || []
  )
  return [...allSongs]
    .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
    .slice(0, 10)
})

// 格式化歌手介绍
const formattedBio = computed(() => {
  return singer.value.description.replace(/\n/g, '<br>')
})

// 播放随机歌曲
const playRandomSong = (albumId) => {
  const songs = musicStore.songs[albumId]
  if (songs && songs.length > 0) {
    const randomIndex = Math.floor(Math.random() * songs.length)
    musicStore.playSong(songs[randomIndex])
  }
}

// 跳转到专辑
const goToAlbum = (albumId) => {
  router.push(`/album/${albumId}`)
}

// 图片错误处理
const handleImageError = (e) => {
  e.target.src = 'https://via.placeholder.com/150?text=No+Image'
}

// 获取专辑名
const getAlbumName = (albumId) => {
  return musicStore.getAlbumName(albumId)
}
</script>

<style scoped>
.singer-detail {
  position: relative;
  padding-top: 60px;
  /* 避免按钮遮挡内容 */
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: var(--el-text-color-primary);
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* 歌手头部信息 */
.singer-header {
  display: flex;
  gap: 30px;
  margin-bottom: 40px;
  align-items: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
}

.singer-avatar {
  flex-shrink: 0;
}

.singer-info {
  flex: 1;
}

.singer-info h1 {
  margin: 0 0 10px;
  font-size: 2rem;
}

.singer-meta {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.singer-description {
  margin: 15px 0;
  line-height: 1.6;
  color: var(--el-text-color-secondary);
}

.singer-stats {
  display: flex;
  gap: 30px;
  margin-top: 20px;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 1.5rem;
  font-weight: bold;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--el-text-color-secondary);
}

/* 区块标题 */
.section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 30px 0 20px;
  font-size: 1.3rem;
  color: var(--el-text-color-primary);
}

.section-title .el-icon {
  font-size: 1.2em;
}

/* 专辑网格 */
.album-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.album-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s;
  cursor: pointer;
}

.album-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.album-cover-container {
  position: relative;
  aspect-ratio: 1/1;
}

.album-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.album-year {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 3px 8px;
  border-radius: 10px;
  font-size: 0.8rem;
}

.album-info {
  padding: 15px;
}

.album-title {
  margin: 0 0 10px;
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.album-actions {
  display: flex;
  justify-content: space-between;
}

/* 歌曲列表 */
.song-list {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  margin-bottom: 30px;
}

.song-item {
  display: grid;
  grid-template-columns: 30px 50px 1fr 80px 100px;
  align-items: center;
  padding: 12px 15px;
  gap: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s;
}

.song-item:hover {
  background: rgba(255, 255, 255, 0.05);
}

.song-index {
  text-align: center;
  color: var(--el-text-color-secondary);
  font-size: 0.9rem;
}

.song-cover {
  width: 50px;
  height: 50px;
  border-radius: 4px;
}

.song-details {
  overflow: hidden;
}

.song-title {
  font-weight: 500;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.song-album {
  font-size: 0.8rem;
  color: var(--el-text-color-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.song-duration {
  color: var(--el-text-color-secondary);
  font-size: 0.9rem;
}

.song-popularity {
  padding-right: 10px;
}

/* 歌手介绍 */
.bio-card {
  margin-bottom: 30px;
  background: rgba(255, 255, 255, 0.03);
  border: none;
}

.social-links {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.social-link {
  color: var(--el-text-color-secondary);
  transition: all 0.3s;
}

.social-link:hover {
  color: var(--el-color-primary);
  transform: translateY(-2px);
}

/* 图片错误处理 */
.image-error {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  color: #999;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .singer-header {
    flex-direction: column;
    text-align: center;
  }

  .singer-meta {
    justify-content: center;
  }

  .album-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .song-item {
    grid-template-columns: 30px 1fr 60px;
  }

  .song-cover,
  .song-popularity {
    display: none;
  }
}
</style>