<script setup>
import { useMusicStore } from '../store'
const store = useMusicStore()
</script>

<template>
  <div class="music-player" v-if="store.currentTrack">
    <div class="track-info">
      <h4>{{ store.currentTrack.name }}</h4>
      <p>{{ store.currentTrack.artist }}</p>
    </div>
    <div class="controls">
      <button @click="store.togglePlay">
        {{ store.isPlaying ? '暂停' : '播放' }}
      </button>
      <input 
        type="range" 
        v-model="store.volume" 
        min="0" 
        max="100"
      >
    </div>
  </div>
</template>

<style scoped>
.music-player {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.9);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--accent-color);
  z-index: 100;
}

.controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

button {
  background: var(--accent-color);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

input[type="range"] {
  width: 100px;
}
</style>