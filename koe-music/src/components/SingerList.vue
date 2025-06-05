<template>
  <div class="singer-list">
    <h3>热门歌手</h3>
    <el-row :gutter="20">
      <el-col 
        v-for="singer in singers" 
        :key="singer.id" 
        :xs="12" 
        :sm="8" 
        :md="6" 
        :lg="4"
        @click="goToSinger(singer.id)"
      >
        <el-card class="singer-card" shadow="hover">
          <el-avatar :size="100" :src="singer.avatar" @error="handleImageError">
            <img :src="singer.avatar" @error="handleImageError"/>
          </el-avatar>
          <div class="singer-name">{{ singer.name }}</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  singers: {
    type: Array,
    default: () => []
  }
})

const router = useRouter()

const handleImageError = (e) => {
  e.target.src = 'https://via.placeholder.com/100?text=No+Image'
}

const goToSinger = (singerId) => {
  router.push(`/singer/${singerId}`)
}
</script>

<style scoped>
.singer-list {
  margin-bottom: 20px;
}

.singer-card {
  text-align: center;
  padding: 20px 0;
  cursor: pointer;
  transition: all 0.3s;
}
.singer-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.singer-name {
  margin-top: 10px;
  font-weight: bold;
  color: #333;
}

/* 修复Element Plus组件样式 */
.el-avatar {
  margin: 0 auto;
}
.el-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>