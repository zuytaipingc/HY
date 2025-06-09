<template>
  <div class="singer-page">
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

    <!-- 歌手列表内容 -->
    <h2>所有歌手</h2>
    <el-table :data="allSingers" style="width: 100%">
      <el-table-column prop="name" label="歌手名" width="180" />
      <el-table-column label="地区">
        <template #default="{ row }">
          <el-tag>{{ row.region }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="风格">
        <template #default="{ row }">
          <el-tag type="info">{{ row.genre }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button @click="goToSingerDetail(row.id)">查看详情</el-button>
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

// 获取所有歌手
const allSingers = computed(() => musicStore.singers)

// 导航菜单激活状态
const activeNav = computed(() => router.currentRoute.value.path)

// 跳转到歌手详情页
const goToSingerDetail = (singerId) => {
  router.push(`/singer/${singerId}`)
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