<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useMusicStore } from '../store'
import api from '../utils/api'

const route = useRoute()
const musicStore = useMusicStore()
const songs = ref([])
const loading = ref(true)
const singerName = ref('所有歌曲')

onMounted(async () => {
  try {
    const response = await api.getSongs()
    songs.value = response.data
    
    // 如果有歌手ID参数，筛选该歌手的歌曲
    if (route.query.singerId) {
      // 在实际应用中，这里应该调用API获取特定歌手的歌曲
      const mockSingers = [
        { id: 1, name: '周杰伦' },
        { id: 2, name: '林俊杰' },
        { id: 3, name: '邓紫棋' },
        { id: 4, name: '薛之谦' },
        { id: 5, name: '李荣浩' }
      ]
      const singer = mockSingers.find(s => s.id === parseInt(route.query.singerId))
      if (singer) {
        singerName.value = singer.name + '的歌曲'
        songs.value = songs.value.filter(song => song.singer === singer.name)
      }
    }
  } catch (error) {
    console.error('获取歌曲列表失败:', error)
  } finally {
    loading.value = false
  }
})

const playSong = (song) => {
  musicStore.playSong(song)
}

const toggleFavorite = (song) => {
  musicStore.toggleFavorite(song)
}

const isFavorite = (song) => {
  return musicStore.isFavorite(song)
}
</script>

<template>
  <div class="song-list">
    <h2>{{ singerName }}</h2>
    <el-skeleton :rows="6" animated :loading="loading">
      <template #default>
        <el-table :data="songs" style="width: 100%" class="song-table" :row-class-name="'song-row'">
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
                :icon="isFavorite(row) ? 'StarFilled' : 'Star'" 
                circle 
                @click="toggleFavorite(row)"
                :type="isFavorite(row) ? 'warning' : ''"
              />
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-skeleton>
  </div>
</template>

<style scoped>
.song-list {
  padding: 20px;
}

.song-list h2 {
  color: #ff4d4d;
  margin-bottom: 20px;
  font-size: 24px;
  border-bottom: 1px solid #333;
  padding-bottom: 10px;
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