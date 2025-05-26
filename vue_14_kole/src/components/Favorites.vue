<script setup>
import { computed } from 'vue'
import { useMusicStore } from '../store'

const musicStore = useMusicStore()

const favorites = computed(() => musicStore.favorites)

const playSong = (song) => {
  musicStore.playSong(song)
}

const toggleFavorite = (song) => {
  musicStore.toggleFavorite(song)
}
</script>

<template>
  <div class="favorites">
    <h2>我的收藏</h2>
    <div v-if="favorites.length === 0" class="empty-message">
      <el-empty description="暂无收藏歌曲" />
    </div>
    <el-table v-else :data="favorites" style="width: 100%" class="song-table">
      <el-table-column width="50">
        <template #default="{ $index }">
          <span class="song-index">{{ $index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="歌曲" width="300">
        <template #default="{ row }">
          <div class="song-info" @click="playSong(row)">
            <img :src="row.cover" class="song-cover" />
            <div class="song-title">
              <h3>{{ row.title }}</h3>
              <p>{{ row.singer }}</p>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="时长" width="100">
        <template #default="{ row }">
          <span class="song-duration">{{ row.duration }}</span>
        </template>
      </el-table-column>
      <el-table-column width="80">
        <template #default="{ row }">
          <el-button 
            icon="StarFilled" 
            circle 
            @click="toggleFavorite(row)"
            type="warning"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
.favorites {
  padding: 20px;
}

.favorites h2 {
  color: #ff4d4d;
  margin-bottom: 20px;
  font-size: 24px;
  border-bottom: 1px solid #333;
  padding-bottom: 10px;
}

.empty-message {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
}

.song-table {
  background-color: transparent;
  color: white;
}

.song-table :deep(.el-table__row) {
  background-color: #1a1a1a;
  color: white;
}

.song-table :deep(.el-table__row:hover) {
  background-color: #2a2a2a;
}

.song-table :deep(th.el-table__cell) {
  background-color: #1a1a1a;
  color: #ff4d4d;
}

.song-table :deep(.el-table__inner-wrapper::before) {
  background-color: transparent;
}

.song-index {
  display: inline-block;
  width: 100%;
  text-align: center;
  color: #aaa;
}

.song-info {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.song-cover {
  width: 50px;
  height: 50px;
  border-radius: 4px;
  margin-right: 15px;
  object-fit: cover;
}

.song-title h3 {
  margin: 0 0 5px 0;
  font-size: 16px;
  color: white;
}

.song-title p {
  margin: 0;
  font-size: 14px;
  color: #aaa;
}

.song-duration {
  color: #aaa;
}
</style>