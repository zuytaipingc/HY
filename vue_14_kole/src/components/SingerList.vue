<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../utils/api'

const singers = ref([])
const loading = ref(true)
const router = useRouter()

onMounted(async () => {
  try {
    const response = await api.getSingers()
    singers.value = response.data
  } catch (error) {
    console.error('获取歌手列表失败:', error)
  } finally {
    loading.value = false
  }
})

const viewSinger = (singerId) => {
  router.push(`/song-list?singerId=${singerId}`)
}
</script>

<template>
  <div class="singer-list">
    <h2>歌手列表</h2>
    <el-skeleton :rows="6" animated :loading="loading">
      <template #default>
        <div class="singers-container">
          <div v-for="singer in singers" :key="singer.id" class="singer-item" @click="viewSinger(singer.id)">
            <img :src="singer.avatar" :alt="singer.name" class="singer-avatar" />
            <div class="singer-details">
              <h3>{{ singer.name }}</h3>
              <p>{{ singer.songsCount }} 首歌曲</p>
            </div>
          </div>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<style scoped>
.singer-list {
  padding: 20px;
}

.singer-list h2 {
  color: #ff4d4d;
  margin-bottom: 20px;
  font-size: 24px;
  border-bottom: 1px solid #333;
  padding-bottom: 10px;
}

.singers-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.singer-item {
  display: flex;
  align-items: center;
  background-color: #1a1a1a;
  padding: 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.singer-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(255, 77, 77, 0.2);
}

.singer-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 15px;
}

.singer-details h3 {
  margin: 0 0 5px 0;
  color: white;
  font-size: 16px;
}

.singer-details p {
  margin: 0;
  color: #aaa;
  font-size: 14px;
}
</style>