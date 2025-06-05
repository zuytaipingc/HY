<template>
  <el-card class="recently-played">
    <template #header>
      <div class="card-header">
        <span>最近播放</span>
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
      </div>
    </div>
    <div v-else class="empty-message">
      暂无最近播放记录
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
</script>

<style scoped>
.recently-played {
  margin-bottom: 20px;
}

.card-header {
  font-weight: bold;
  font-size: 16px;
}

.song-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  cursor: pointer;
}

.song-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.song-title {
  flex-grow: 1;
}

.song-duration {
  color: #999;
}

.empty-message {
  color: #999;
  text-align: center;
  padding: 20px 0;
}
</style>