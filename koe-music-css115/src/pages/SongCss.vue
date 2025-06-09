<template>
  <div class="song-page">
    <!-- 主导航栏 -->
    <el-menu 
      :default-active="activeNav" 
      mode="horizontal" 
      @select="handleNavSelect"
      router
      class="nav-menu"
    >
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/singer">歌手列表</el-menu-item>
      <el-menu-item index="/album">专辑列表</el-menu-item>
      <el-menu-item index="/song">歌曲列表</el-menu-item>
    </el-menu>

    <!-- 歌曲列表内容 -->
    <h2>所有歌曲</h2>
    <el-table :data="allSongs" style="width: 100%">
      <el-table-column prop="title" label="歌曲名" width="180" />
      <el-table-column label="歌手">
        <template #default="{ row }">
          <el-tag @click="goToSinger(row.singerId)">
            {{ getSingerName(row.singerId) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="专辑">
        <template #default="{ row }">
          <el-tag @click="goToAlbum(row.albumId)">
            {{ getAlbumName(row.albumId) }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useMusicStore } from '../store/index'

const router = useRouter()
const musicStore = useMusicStore()

// 获取所有歌曲（展平嵌套结构）
const allSongs = computed(() => {
  return Object.values(musicStore.songs).flat()
})

// 导航菜单激活状态
const activeNav = computed(() => router.currentRoute.value.path)

// 获取关联数据
const getSingerName = (singerId) => {
  return musicStore.singers.find(s => s.id === singerId)?.name || '周杰伦'
}

const getAlbumName = musicStore.getAlbumName

// 跳转到歌手页
const goToSinger = (singerId) => {
  router.push(`/singer/${singerId}`)
}

// 跳转到专辑页
const goToAlbum = (albumId) => {
  router.push(`/album/${albumId}`)
}
</script>

<style scoped>
/* 统一导航栏样式 */
.nav-menu {
  margin-bottom: 24px;
  background-color: var(--el-color-primary);
  border-radius: 6px;
  padding: 0 16px;
}

.nav-menu :deep(.el-menu--horizontal) {
  border-bottom: none;
}

.nav-menu :deep(.el-menu-item) {
  color: white;
  transition: all 0.3s;
  font-weight: 500;
}

.nav-menu :deep(.el-menu-item:hover) {
  background-color: var(--el-color-primary-light-3);
}

.nav-menu :deep(.el-menu-item.is-active) {
  background-color: var(--el-color-primary-dark-2);
  border-bottom: 2px solid white;
}

/* 表格样式微调保持协调 */
.el-table {
  margin-top: 16px;
  border-radius: 6px;
  overflow: hidden;
}

</style>