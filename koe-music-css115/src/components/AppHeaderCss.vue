<template>
  <div class="app-header">
    <!-- 左侧Logo和主导航 -->
    <div class="header-left">
      <router-link to="/" class="logo-link">
        <img src="@/assets/logo.png" alt="音乐平台" class="logo-img">
        <span class="logo-text">音乐平台</span>
      </router-link>
      
      <nav class="main-nav">
        <router-link to="/discover" class="nav-item">
          <el-icon><House /></el-icon>
          <span>发现音乐</span>
        </router-link>
        <router-link to="/library" class="nav-item">
          <el-icon><Collection /></el-icon>
          <span>我的音乐</span>
        </router-link>
      </nav>
    </div>

    <!-- 中间搜索框 -->
    <div class="search-container">
      <el-input
        v-model="searchQuery"
        placeholder="搜索歌曲、歌手或专辑"
        class="search-input"
        @keyup.enter="handleSearch"
        clearable
      >
        <template #prefix>
          <el-icon class="search-icon"><Search /></el-icon>
        </template>
      </el-input>
    </div>

    <!-- 右侧用户操作区 -->
    <div class="user-actions">
      <!-- 管理员入口 -->
      <el-button
        v-if="musicStore.isAdmin"
        type="success"
        class="admin-btn"
        @click="goToAdmin"
      >
        <el-icon><Setting /></el-icon>
        <span>管理后台</span>
      </el-button>

      <!-- 用户登录状态 -->
      <template v-if="musicStore.isAuthenticated">
        <el-dropdown>
          <div class="user-profile">
            <el-avatar :size="36" :src="musicStore.user?.avatar || defaultAvatar" />
            <span class="username">{{ musicStore.user?.username }}</span>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="goToUserCenter">
                <el-icon><User /></el-icon>
                个人中心
              </el-dropdown-item>
              <el-dropdown-item @click="logout">
                <el-icon><SwitchButton /></el-icon>
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
      
      <!-- 未登录状态 -->
      <template v-else>
        <el-button @click="goToLogin" class="auth-btn">登录</el-button>
        <el-button type="primary" @click="goToRegister" class="auth-btn">注册</el-button>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMusicStore } from '@/store/index'
import { 
  House, Collection, Search, Setting, 
  User, SwitchButton 
} from '@element-plus/icons-vue'

const router = useRouter()
const musicStore = useMusicStore()
const searchQuery = ref('')
const defaultAvatar = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      path: '/search',
      query: { q: searchQuery.value }
    })
    searchQuery.value = ''
  }
}

const goToAdmin = () => {
  router.push('/admin')
}

const goToLogin = () => {
  router.push('/login')
}

const goToRegister = () => {
  router.push('/register')
}

const goToUserCenter = () => {
  router.push('/user')
}

const logout = () => {
  musicStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.app-header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 40px;
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
}

.logo-img {
  height: 32px;
}

.logo-text {
  font-size: 18px;
  font-weight: 600;
  color: var(--el-color-primary);
}

.main-nav {
  display: flex;
  gap: 20px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--el-text-color-regular);
  text-decoration: none;
  font-size: 15px;
  padding: 8px 12px;
  border-radius: 4px;
  transition: all 0.3s;
}

.nav-item:hover {
  color: var(--el-color-primary);
  background-color: var(--el-color-primary-light-9);
}

.nav-item.router-link-active {
  color: var(--el-color-primary);
  font-weight: 500;
}

.search-container {
  flex: 1;
  max-width: 500px;
  margin: 0 20px;
}

.search-input {
  transition: all 0.3s;
}

.search-input:focus-within {
  box-shadow: 0 0 0 2px var(--el-color-primary-light-5);
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.admin-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: var(--el-color-success);
  border-color: var(--el-color-success);
}

.admin-btn:hover {
  background-color: var(--el-color-success-light-3);
  border-color: var(--el-color-success-light-3);
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 20px;
  transition: all 0.3s;
}

.user-profile:hover {
  background-color: var(--el-fill-color-light);
}

.username {
  font-size: 14px;
  font-weight: 500;
}

.auth-btn {
  padding: 8px 16px;
}
</style>