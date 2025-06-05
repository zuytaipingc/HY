<template>
  <div class="audio-player" v-if="currentSong">
    <div class="player-container">
      <div class="song-info">
        <div class="song-title">{{ currentSong.title }}</div>
        <div class="song-duration">{{ formatTime(currentTime) }} / {{ currentSong.duration }}</div>
      </div>
      
      <div class="player-controls">
        <el-button circle @click="togglePlay">
          <el-icon :size="20">
            <VideoPlay v-if="!isPlaying" />
            <VideoPause v-else />
          </el-icon>
        </el-button>
      </div>
      
      <div class="progress-bar">
        <el-slider 
          v-model="currentTime" 
          :max="duration" 
          :format-tooltip="formatTime"
          @change="seekTo"
        />
      </div>
      
      <audio 
        ref="audioElement" 
        :src="currentSong.url" 
        @timeupdate="updateTime"
        @ended="onEnded"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { VideoPlay, VideoPause } from '@element-plus/icons-vue'
import { useMusicStore } from '../composables/useMusicStore'

const musicStore = useMusicStore()
const audioElement = ref(null)

const currentSong = ref(null)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)

// 从store同步状态
const syncStoreState = () => {
  currentSong.value = musicStore.currentSong
  isPlaying.value = musicStore.isPlaying
}

// 初始化
onMounted(() => {
  syncStoreState()
  watch(() => musicStore.currentSong, syncStoreState)
  watch(() => musicStore.isPlaying, (val) => {
    isPlaying.value = val
    if (val && audioElement.value) {
      audioElement.value.play()
    } else if (audioElement.value) {
      audioElement.value.pause()
    }
  })
})

// 播放/暂停
const togglePlay = () => {
  musicStore.togglePlay()
}

// 更新时间
const updateTime = () => {
  if (audioElement.value) {
    currentTime.value = audioElement.value.currentTime
    duration.value = audioElement.value.duration || 0
  }
}

// 跳转到指定时间
const seekTo = (time) => {
  if (audioElement.value) {
    audioElement.value.currentTime = time
  }
}

// 格式化时间
const formatTime = (time) => {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

// 歌曲结束
const onEnded = () => {
  isPlaying.value = false
  musicStore.isPlaying = false
}
</script>

<style scoped>
.audio-player {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  padding: 10px 20px;
  z-index: 1000;
}

.player-container {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.song-info {
  flex: 1;
  min-width: 0;
}

.song-title {
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.song-duration {
  color: #999;
  font-size: 12px;
}

.player-controls {
  margin: 0 20px;
}

.progress-bar {
  flex: 2;
  min-width: 0;
}

audio {
  display: none;
}
</style>