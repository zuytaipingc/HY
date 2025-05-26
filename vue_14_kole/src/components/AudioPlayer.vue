<script setup>
import { computed } from 'vue'
import { useMusicStore } from '../store'
import { ElSlider } from 'element-plus'

const musicStore = useMusicStore()

const currentSong = computed(() => musicStore.currentSong)
const isPlaying = computed(() => musicStore.isPlaying)

const togglePlay = () => {
  musicStore.togglePlay()
}

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`
}

// 模拟进度条数据
const currentTime = computed(() => isPlaying.value ? 120 : 0) // 2分钟
const duration = computed(() => 240) // 4分钟
const progress = computed(() => (currentTime.value / duration.value) * 100)
</script>

<template>
  <div class="audio-player" v-if="currentSong">
    <div class="player-container">
      <div class="song-info">
        <img :src="currentSong.cover" class="song-cover" />
        <div class="song-details">
          <h3>{{ currentSong.title }}</h3>
          <p>{{ currentSong.singer }}</p>
        </div>
      </div>
      
      <div class="player-controls">
        <div class="progress-container">
          <span class="time">{{ formatTime(currentTime) }}</span>
          <el-slider v-model="progress" :show-tooltip="false" class="progress-bar" />
          <span class="time">{{ formatTime(duration) }}</span>
        </div>
        
        <div class="buttons">
          <el-button :icon="isPlaying ? 'VideoPause' : 'VideoPlay'" circle @click="togglePlay" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.audio-player {
  height: 100%;
  background-color: #1a1a1a;
  border-top: 1px solid #333;
  display: flex;
  align-items: center;
  padding: 0 20px;
}

.player-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.song-info {
  display: flex;
  align-items: center;
}

.song-cover {
  width: 50px;
  height: 50px;
  border-radius: 4px;
  margin-right: 15px;
  object-fit: cover;
}

.song-details h3 {
  margin: 0 0 5px 0;
  font-size: 16px;
  color: white;
}

.song-details p {
  margin: 0;
  font-size: 14px;
  color: #aaa;
}

.player-controls {
  flex: 1;
  max-width: 600px;
  margin: 0 30px;
}

.progress-container {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.time {
  color: #aaa;
  font-size: 12px;
  min-width: 40px;
}

.progress-bar {
  flex: 1;
}

.buttons {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

:deep(.el-slider__runway) {
  background-color: #333;
  height: 4px;
}

:deep(.el-slider__bar) {
  background-color: #ff4d4d;
  height: 4px;
}

:deep(.el-slider__button) {
  width: 12px;
  height: 12px;
  border: 2px solid #ff4d4d;
}

:deep(.el-button) {
  background-color: transparent;
  border-color: #ff4d4d;
  color: #ff4d4d;
  font-size: 18px;
  width: 40px;
  height: 40px;
}

:deep(.el-button:hover) {
  background-color: rgba(255, 77, 77, 0.1);
}
</style>