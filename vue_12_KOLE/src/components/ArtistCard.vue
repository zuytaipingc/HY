<script setup>
defineProps({
  artist: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['follow'])
</script>

<template>
  <el-card class="artist-card" shadow="hover">
    <div class="artist-avatar">
      <span class="avatar-text">{{ artist.name.charAt(0) }}</span>
    </div>
    
    <div class="artist-info">
      <h3 class="artist-name">{{ artist.name }}</h3>
      <div class="meta">
        <span class="year">{{ artist.year }}</span>
        <el-tag type="danger" size="small">{{ artist.genre }}</el-tag>
      </div>
      <p class="followers">{{ artist.followers }} 粉丝</p>
    </div>
    
    <div class="actions">
      <el-button 
        type="danger" 
        size="small" 
        @click.stop="emit('follow', artist.id)"
      >
        关注
      </el-button>
    </div>
  </el-card>
</template>

<style scoped>
.artist-card {
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid var(--accent-color);
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.artist-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(255, 0, 0, 0.2);
}

.artist-avatar {
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, #000, var(--accent-color));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
}

.avatar-text {
  font-size: 2rem;
  font-weight: bold;
  color: white;
}

.artist-info {
  text-align: center;
}

.artist-name {
  color: var(--accent-color);
  margin: 0 0 0.5rem;
  font-size: 1.2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.meta {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.year {
  color: #aaa;
  font-size: 0.9rem;
}

.followers {
  color: #ddd;
  font-size: 0.8rem;
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

:deep(.el-tag) {
  background-color: rgba(255, 0, 0, 0.1);
  border-color: var(--accent-color);
  color: var(--accent-color);
}
</style>