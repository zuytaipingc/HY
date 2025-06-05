<template>
  <el-card class="favorite-list">
    <template #header>
      <div class="card-header">
        <span>我的收藏</span>
      </div>
    </template>
    <div v-if="songs.length > 0">
      <div 
        v-for="song in songs" 
        :key="song.id" 
        class="song-item"
        @click="playSong(song)"
      >
        <div class="song-title">{{ song.title }}</div>
        <div class="song-duration">{{ song.duration }}</div>
        <el-button 
          size="small" 
          type="danger" 
          @click.stop="removeFromFavorites(song.id)"
        >
          取消收藏
        </el-button>
      </div>
    </div>
    <div v-else class="empty-message">
      收藏夹为空
    </div>
  </el-card>
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

const playSong = (song) => {
  musicStore.playSong(song)
}

const removeFromFavorites = (songId) => {
  musicStore.removeFromFavorites(songId)
}
</script>

<style scoped>
.favorite-list {
  margin-bottom: 20px;
}

.card-header {
  font-weight: bold;
  font-size: 16px;
}

.song-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  cursor: pointer;
}

.song-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.song-title {
  flex-grow: 1;
  margin-right: 10px;
}

.song-duration {
  color: #999;
  margin-right: 10px;
  width: 50px;
}

.empty-message {
  color: #999;
  text-align: center;
  padding: 20px 0;
}
</style>