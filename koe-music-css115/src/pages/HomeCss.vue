<template>
  <div class="home-page">
    <!-- 顶部导航栏 -->
    <div class="top-nav">
      <div class="search-container">
        <el-input v-model="searchQuery" placeholder="搜索歌曲、歌手或专辑" class="search-input" @keyup.enter="handleSearch"
          clearable>
          <template #prefix>
            <el-icon class="search-icon">
              <Search />
            </el-icon>
          </template>
        </el-input>
        <el-button type="primary" class="search-btn" @click="handleSearch" :icon="Search">
          搜索
        </el-button>
      </div>

      <div class="auth-buttons">
        <!-- 管理员入口（放在登录/注册按钮前） 已删除-->
        <!-- <el-button 
      v-if="musicStore.isAdmin"
      @click="goToAdmin"
      type="success"
      class="admin-btn"
    >
      管理后台
    </el-button> -->
        <el-button v-if="!isAuthenticated" @click="goToLogin">登录</el-button>
        <el-button v-if="!isAuthenticated" type="primary" @click="goToRegister">注册</el-button>
        <el-button v-else @click="logout">退出</el-button>
      </div>
    </div>
    <!-- 主导航栏 -->
    <div class="main-nav">
      <el-menu 
        :default-active="activeTab" 
        mode="horizontal" 
        @select="handleTabSelect"
        class="nav-menu"
      >
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/album">专辑列表</el-menu-item>
        <el-menu-item index="/singer">歌手列表</el-menu-item>
        <el-menu-item index="/song">歌曲列表</el-menu-item>
      </el-menu>
    </div>

    <!-- 搜索结果 -->
    <div v-if="showSearchResults" class="search-results-card">
      <el-card>
        <template #header>
          <div class="results-header">
            <span>搜索结果</span>
            <el-button type="text" @click="closeResults" class="close-btn">
              <el-icon>
                <Close />
              </el-icon>
            </el-button>
          </div>
        </template>

        <div v-if="searchResults.length > 0">
          <div v-for="item in searchResults" :key="item.id" class="result-item" @click="handleResultClick(item)">
            <el-avatar :size="50" :src="item.cover || item.avatar" class="result-avatar">
              <img :src="item.cover || item.avatar" @error="handleImageError" />
            </el-avatar>
            <div class="result-content">
              <div class="result-title">{{ item.title || item.name }}</div>
              <div class="result-subtitle">
                <el-tag size="small" :type="getResultTagType(item)">
                  {{ getResultType(item) }}
                </el-tag>
                {{ getResultDescription(item) }}
              </div>
            </div>
          </div>
        </div>
        <div v-else class="no-results">
          <el-empty description="没有找到匹配的结果" />
        </div>
      </el-card>
    </div>

    <!-- 主内容区 -->
    <div class="main-content">
      <!-- 左侧内容 -->
      <div class="content-left">
        <!-- 热门歌手 - 修改部分 -->
        <el-card class="section-card">
          <template #header>
            <div class="section-header">
              <el-icon>
                <User />
              </el-icon>
              <span>热门歌手</span>
            </div>
          </template>
          <div class="singers-container">
            <div v-for="singer in singers" :key="singer.id" class="singer-card" @click="goToSinger(singer.id)">
              <div class="singer-avatar-container">
                <el-avatar :size="120" :src="singer.avatar" class="singer-avatar">
                  <img :src="singer.avatar" @error="handleImageError" />
                </el-avatar>
              </div>
              <div class="singer-info">
                <div class="singer-name">{{ singer.name }}</div>
                <div class="singer-desc">{{ singer.description }}</div>
                <div class="singer-tags">
                  <el-tag v-for="tag in singer.tags" :key="tag" size="small" type="info">
                    {{ tag }}
                  </el-tag>
                </div>
              </div>
            </div>
          </div>
        </el-card>

        <!-- 最近播放 -->
        <el-card class="section-card">
          <template #header>
            <div class="section-header">
              <el-icon>
                <Clock />
              </el-icon>
              <span>最近播放</span>
            </div>
          </template>
          <div v-if="recentlyPlayed.length > 0" class="song-list">
            <div v-for="song in recentlyPlayed" :key="song.id" class="song-item" @click="playSong(song)">
              <el-avatar :size="50" :src="song.cover" class="song-cover">
                <img :src="song.cover" @error="handleImageError" />
              </el-avatar>
              <div class="song-details">
                <div class="song-title">{{ song.title }}</div>
                <div class="song-album">{{ getAlbumName(song.albumId) }}</div>
              </div>
              <div class="song-duration">{{ song.duration }}</div>
            </div>
          </div>
          <el-empty v-else description="暂无最近播放记录" />
        </el-card>

        <!-- 我的收藏 -->
        <el-card class="section-card">
          <template #header>
            <div class="section-header">
              <el-icon>
                <Star />
              </el-icon>
              <span>我的收藏</span>
            </div>
          </template>
          <div v-if="favorites.length > 0" class="song-list">
            <div v-for="song in favorites" :key="song.id" class="song-item" @click="playSong(song)">
              <el-avatar :size="50" :src="song.cover" class="song-cover">
                <img :src="song.cover" @error="handleImageError" />
              </el-avatar>
              <div class="song-details">
                <div class="song-title">{{ song.title }}</div>
                <div class="song-album">{{ getAlbumName(song.albumId) }}</div>
              </div>
              <div class="song-actions">
                <div class="song-duration">{{ song.duration }}</div>
                <el-button type="danger" size="small" @click.stop="removeFromFavorites(song.id)" :icon="Delete"
                  circle />
              </div>
            </div>
          </div>
          <el-empty v-else description="收藏夹为空" />
        </el-card>
      </div>

      <!-- 右侧唱片机 -->
      <div class="record-player">
        <el-card>
          <div class="record-container" :class="{ 'is-playing': isRecordPlaying }">
            <img src="/images/albums/5.jpg" class="record" alt="旋转唱片" @error="handleImageError">
            <div class="record-center"></div>
          </div>
          <el-button type="primary" class="record-btn" @click="toggleRecord"
            :icon="isRecordPlaying ? VideoPause : VideoPlay">
            {{ isRecordPlaying ? '暂停' : '播放' }}
          </el-button>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMusicStore } from '../store/index'
import {
  Search, Close, User, Clock, Star, Delete,
  VideoPlay, VideoPause
} from '@element-plus/icons-vue'


const router = useRouter()
const musicStore = useMusicStore()

// 搜索相关
const searchQuery = ref('')
const showSearchResults = ref(false)

const searchResults = computed(() => musicStore.searchResults)
const singers = computed(() => [
  {
    id: 1,
    name: '周杰伦',
    avatar: '/images/singers/1.jpg',
    description: '亚洲流行天王，2000年发行首张专辑《Jay》',
    tags: ['华语流行', '创作歌手', '金曲奖']
  },
  {
    id: 2,
    name: '林俊杰',
    avatar: '/images/singers/2.jpg',
    description: '新加坡著名歌手、词曲创作人',
    tags: ['R&B', '创作才子']
  },
  {
    id: 3,
    name: '邓紫棋',
    avatar: '/images/singers/3.jpg',
    description: '香港创作型女歌手，2008年出道',
    tags: ['创作歌手', '实力女声']
  }
])
const recentlyPlayed = computed(() => musicStore.recentlyPlayed)
const favorites = computed(() => musicStore.favorites)
const isAuthenticated = computed(() => musicStore.isAuthenticated)
const isRecordPlaying = ref(false)

// 处理菜单点击跳转
const handleTabSelect = (index) => {
  router.push(index) // 使用vue-router进行跳转
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    musicStore.search(searchQuery.value)
    showSearchResults.value = true
  }
}

const closeResults = () => {
  showSearchResults.value = false
  searchQuery.value = ''
}

const handleResultClick = (item) => {
  if (item.type === 'song') {
    musicStore.playSong(item)
  } else if (item.type === 'album') {
    router.push(`/album/${item.id}`)
  } else {
    router.push(`/singer/${item.id}`)
  }
  closeResults()
}

const getResultType = (item) => {
  return item.type === 'song' ? '歌曲' :
    item.type === 'album' ? '专辑' : '歌手'
}

const getResultTagType = (item) => {
  return item.type === 'song' ? 'success' :
    item.type === 'album' ? 'warning' : 'info'
}

const getResultDescription = (item) => {
  if (item.type === 'song') {
    return `专辑: ${musicStore.getAlbumName(item.albumId)}`
  }
  if (item.type === 'album') {
    const singer = musicStore.singers.find(s => s.id === item.singerId)
    return singer ? `歌手: ${singer.name}` : ''
  }
  return item.description
}

// 播放控制
const toggleRecord = () => {
  isRecordPlaying.value = !isRecordPlaying.value
}

// 图片错误处理
const handleImageError = (e) => {
  e.target.src = 'https://via.placeholder.com/150?text=No+Image'
}

// 路由导航
const goToSinger = (singerId) => {
  router.push(`/singer/${singerId}`)
}

const playSong = (song) => {
  musicStore.playSong(song)
  isRecordPlaying.value = true
}

const getAlbumName = (albumId) => {
  return musicStore.getAlbumName(albumId)
}

const removeFromFavorites = (songId) => {
  musicStore.removeFromFavorites(songId)
}

const goToLogin = () => {
  router.push('/login')
}

const goToRegister = () => {
  router.push('/register')
}

const logout = () => {
  musicStore.logout()
}
const goToAdmin = () => {
  router.push('/admin')
}

onMounted(() => {
  document.documentElement.style.overflow = 'auto'
  document.body.style.overflow = 'auto'
})
</script>

<style scoped>
.home-page {
  padding: 20px;
  position: relative;
  height: 100vh;
  overflow: hidden;
}

/* 顶部导航 */
.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  gap: 20px;
  padding: 15px 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.search-container {
  flex: 1;
  display: flex;
  max-width: 600px;
  gap: 10px;
}

.search-input {
  flex: 1;
}

.search-icon {
  color: var(--el-color-primary);
  font-size: 16px;
}

.auth-buttons {
  display: flex;
  gap: 10px;
}

/* 搜索结果 */
.search-results-card {
  position: absolute;
  top: 90px;
  left: 20px;
  right: 20px;
  z-index: 2000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.result-item {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 4px;
}

.result-item:hover {
  background-color: var(--el-color-primary-light-9);
}

.result-avatar {
  margin-right: 15px;
}

.result-content {
  flex: 1;
}

.result-title {
  font-weight: 500;
  margin-bottom: 4px;
}

.result-subtitle {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--el-text-color-secondary);
}

.no-results {
  padding: 20px;
  text-align: center;
}

/* 主内容区 */
.main-content {
  display: flex;
  gap: 30px;
  height: calc(100vh - 100px);
}

.content-left {
  flex: 1;
  overflow-y: auto;
  padding-right: 10px;
}

.section-card {
  margin-bottom: 25px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.1rem;
}

/* 热门歌手修改部分 */
.singers-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.singer-card {
  display: flex;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s;
  gap: 15px;
  align-items: center;
}

.singer-card:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-3px);
}

.singer-avatar-container {
  flex-shrink: 0;
}

.singer-avatar {
  border: 3px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s;
}

.singer-card:hover .singer-avatar {
  border-color: var(--el-color-primary);
}

.singer-info {
  flex: 1;
  min-width: 0;
}

.singer-name {
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 5px;
}

.singer-desc {
  font-size: 13px;
  color: var(--el-text-color-secondary);
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.singer-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

/* 歌曲列表 */
.song-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.song-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  cursor: pointer;
  transition: all 0.3s;
  gap: 15px;
}

.song-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.song-cover {
  flex-shrink: 0;
}

.song-details {
  flex: 1;
  min-width: 0;
}

.song-title {
  font-weight: 500;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.song-album {
  font-size: 12px;
  color: var(--el-text-color-secondary);
}

.song-duration {
  font-size: 14px;
  color: var(--el-text-color-secondary);
  margin-left: auto;
  padding: 0 10px;
}

.song-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* 唱片机 */
.record-player {
  width: 300px;
  position: sticky;
  top: 20px;
  overflow: hidden;
}

.record-container {
  width: 250px;
  height: 250px;
  margin: 0 auto 20px;
  position: relative;
}

.record {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.record-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  background: #000;
  border-radius: 50%;
  border: 5px solid #333;
  z-index: 2;
}

.is-playing .record {
  animation: rotateRecord 5s linear infinite;
}

@keyframes rotateRecord {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.record-btn {
  display: block;
  margin: 0 auto;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .main-content {
    flex-direction: column;
    height: auto;
  }

  .content-left {
    overflow-y: visible;
  }

  .record-player {
    width: 100%;
    position: static;
    margin-top: 30px;
  }

  .record-container {
    width: 200px;
    height: 200px;
  }

  .singers-container {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .top-nav {
    flex-direction: column;
    align-items: stretch;
    gap: 15px;
  }

  .search-container {
    max-width: none;
  }
}

/* 主导航栏样式 */
.main-nav {
  margin: 0 auto 30px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.nav-menu {
  background: transparent;
  border-bottom: none;
}

/* 增大导航项间距和字体 */
.nav-menu :deep(.el-menu-item) {
  font-size: 16px;
  height: 60px;
  line-height: 60px;
  margin: 0 15px;
  padding: 0 20px;
}

/* 激活状态样式 */
.nav-menu :deep(.el-menu-item.is-active) {
  color: var(--el-color-primary);
  border-bottom: 3px solid var(--el-color-primary);
}

/* 悬停效果 */
.nav-menu :deep(.el-menu-item:hover) {
  background: rgba(255, 255, 255, 0.1);
}

</style>