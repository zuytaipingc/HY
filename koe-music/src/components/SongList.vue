<template>
  <div class="song-list">
    <el-table :data="songs" style="width: 100%" @row-click="handleRowClick">
      <el-table-column prop="title" label="歌曲名称" />
      <el-table-column prop="duration" label="时长" width="120" />
      <el-table-column label="操作" width="120">
        <template #default="scope">
          <el-button 
            size="small" 
            @click.stop="toggleFavorite(scope.row)"
          >
            {{ isFavorite(scope.row.id) ? '取消收藏' : '收藏' }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { useMusicStore } from '../composables/useMusicStore'

const props = defineProps({
  songs: {
    type: Array,
    default: () => []
  }
})

const musicStore = useMusicStore()

const handleRowClick = (song) => {
  musicStore.playSong(song)
}

const isFavorite = (songId) => {
  return musicStore.favorites.some(song => song.id === songId)
}

const toggleFavorite = (song) => {
  if (isFavorite(song.id)) {
    musicStore.removeFromFavorites(song.id)
  } else {
    musicStore.addToFavorites(song)
  }
}
</script>

<style scoped>
.song-list {
  margin-top: 20px;
}

:deep(.el-table) {
  background-color: transparent;
  color: #fff;
}

:deep(.el-table th),
:deep(.el-table tr) {
  background-color: transparent;
}

:deep(.el-table--enable-row-hover .el-table__body tr:hover>td) {
  background-color: rgba(255, 255, 255, 0.1);
  cursor: pointer;
}
</style>