<script setup>
import { ref, computed } from 'vue'
import { useMusicStore } from '../store'
import { useRouter } from 'vue-router'
import AudioPlayer from '../components/AudioPlayer.vue'

const musicStore = useMusicStore()
const router = useRouter()

const activeIndex = ref('1')
const isCollapse = ref(false)

const handleSelect = (key) => {
  switch (key) {
    case '1':
      router.push('/')
      break
    case '2':
      router.push('/singer-list')
      break
    case '3':
      router.push('/song-list')
      break
    case '4':
      router.push('/recently-played')
      break
    case '5':
      router.push('/favorites')
      break
    case '6':
      router.push('/login')
      break
  }
}

const logout = () => {
  musicStore.logout()
  router.push('/login')
}

const isLoggedIn = computed(() => musicStore.user !== null)
</script>

<template>
  <div class="main-layout">
    <el-container>
      <el-aside width="220px">
        <div class="logo" @click="router.push('/')">
          <h1>音乐空间</h1>
        </div>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-vertical"
          :collapse="isCollapse"
          @select="handleSelect"
          background-color="#1a1a1a"
          text-color="#fff"
          active-text-color="#ff4d4d"
        >
          <el-menu-item index="1">
            <el-icon><home-filled /></el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon><user /></el-icon>
            <span>歌手列表</span>
          </el-menu-item>
          <el-menu-item index="3">
            <el-icon><headset /></el-icon>
            <span>歌曲列表</span>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon><clock /></el-icon>
            <span>最近播放</span>
          </el-menu-item>
          <el-menu-item index="5">
            <el-icon><star /></el-icon>
            <span>收藏夹</span>
          </el-menu-item>
          <el-menu-item index="6" v-if="!isLoggedIn">
            <el-icon><user /></el-icon>
            <span>登录/注册</span>
          </el-menu-item>
          <el-menu-item v-else @click="logout">
            <el-icon><switch-button /></el-icon>
            <span>退出登录</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      
      <el-container>
        <el-header>
          <div class="header-content">
            <h2>欢迎来到音乐空间</h2>
            <div class="user-info" v-if="isLoggedIn">
              <el-avatar :size="40" :src="'https://example.com/default-avatar.jpg'" />
              <span>{{ musicStore.user.username }}</span>
            </div>
          </div>
        </el-header>
        
        <el-main>
          <router-view />
        </el-main>
        
        <el-footer>
          <AudioPlayer />
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.main-layout {
  height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #330000 100%);
  color: white;
}

.el-container {
  height: 100%;
}

.el-aside {
  background-color: #1a1a1a;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 220px;
  min-height: 400px;
  flex: 1;
}

.el-menu {
  border-right: none;
}

.logo {
  padding: 20px;
  text-align: center;
  color: #ff4d4d;
  font-size: 22px;
  border-bottom: 1px solid #333;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logo:hover {
  color: white;
  background-color: rgba(255, 77, 77, 0.1);
}

.el-header {
  background-color: #1a1a1a;
  border-bottom: 1px solid #333;
  display: flex;
  align-items: center;
  height: 80px;
}

.header-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
}

.header-content h2 {
  color: #ff4d4d;
  font-size: 1.5rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1rem;
}

.el-main {
  background-color: #0d0d0d;
  padding: 30px;
  overflow-y: auto;
}

.el-footer {
  background-color: #1a1a1a;
  border-top: 1px solid #333;
  padding: 0;
  height: 90px !important;
}

@media (max-width: 768px) {
  .el-aside {
    width: 180px !important;
  }
  
  .logo {
    font-size: 18px;
    padding: 15px;
  }
  
  .header-content {
    padding: 0 15px;
  }
  
  .header-content h2 {
    font-size: 1.2rem;
  }
  
  .user-info span {
    display: none;
  }
}
</style>