<script setup>
import { ref, onMounted } from 'vue'
import ArtistCard from './components/ArtistCard.vue'
import { ElMessage } from 'element-plus'

// 您提供的艺术家数据
const artists = ref([
  { id: 1, name: 'Analogic Presents', year: '101.2', genre: '电子', followers: '12.8万' },
  { id: 2, name: 'Automatic Approach', year: '2018', genre: '摇滚', followers: '8.6万' },
  { id: 3, name: 'Aerologic（气动）', year: '2020', genre: '氛围', followers: '5.2万' },
  { id: 4, name: '阿拉斯泰尔加的布雷斯', year: '2021', genre: '民谣', followers: '3.4万' },
  { id: 5, name: 'Alife Automne（自 Meera 制作）', year: '2021', genre: '实验', followers: '2.1万' },
  { id: 6, name: '阿尔法九头蛇', year: '2021', genre: '金属', followers: '6.7万' }
])

const loading = ref(false)
const searchQuery = ref('')

// 模拟API加载
onMounted(() => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 800)
})

const filteredArtists = computed(() => {
  return artists.value.filter(artist => 
    artist.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    artist.genre.toLowerCase().includes(searchQuery.value.toLowerCase())
)
})


const followArtist = (artistId) => {
  const artist = artists.value.find(a => a.id === artistId)
  if (artist) {
    ElMessage.success(`已关注 ${artist.name}`)
  }
}
</script>

<template>
  <div class="artists-page">
    <div class="page-header">
      <h1 class="page-title">艺术家</h1>
      <div class="search-box">
        <el-input
          v-model="searchQuery"
          placeholder="搜索艺术家或流派..."
          clearable
          prefix-icon="el-icon-search"
        />
      </div>
    </div>

    <el-divider border-style="dashed" />

    <div v-loading="loading" class="artists-container">
      <template v-if="filteredArtists.length > 0">
        <div class="artists-grid">
          <ArtistCard
            v-for="artist in filteredArtists"
            :key="artist.id"
            :artist="artist"
            @follow="followArtist"
          />
        </div>
      </template>
      <el-empty v-else description="未找到匹配的艺术家" />
    </div>
  </div>
</template>

<style scoped>
.artists-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.page-title {
  color: var(--accent-color);
  font-size: 2.5rem;
  margin: 0;
  text-shadow: 0 0 10px rgba(255, 0, 0, 0.3);
}

.search-box {
  width: 300px;
}

:deep(.el-input__inner) {
  background-color: rgba(0, 0, 0, 0.5);
  border-color: #444;
  color: white;
}

:deep(.el-input__inner:focus) {
  border-color: var(--accent-color);
}

.el-divider {
  margin: 1.5rem 0;
  background-color: rgba(255, 0, 0, 0.2);
}

.artists-container {
  min-height: 300px;
}

.artists-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  padding: 1rem 0;
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .search-box {
    width: 100%;
  }
  
  .artists-grid {
    grid-template-columns: 1fr;
  }
}
</style>