<script setup>
const events = [
  { title: '音乐分享会', date: '2023-12-15', location: '线上直播' },
  { title: '新歌发布会', date: '2024-01-20', location: '上海音乐厅' },
  { title: '艺术家交流会', date: '2024-02-10', location: '北京798艺术区' }
]
</script>

<template>
  <div class="events-page">
    <h1 class="page-title">分享活动</h1>
    <div class="events-list">
      <div class="event-card" v-for="(event, index) in events" :key="index">
        <h3>{{ event.title }}</h3>
        <p><strong>日期:</strong> {{ event.date }}</p>
        <p><strong>地点:</strong> {{ event.location }}</p>
        <button class="register-btn">报名参加</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.events-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.page-title {
  color: var(--accent-color);
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
}

.events-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.event-card {
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid var(--accent-color);
  padding: 1.5rem;
  border-radius: 8px;
  transition: transform 0.3s;
}

.event-card:hover {
  transform: translateY(-5px);
}

.register-btn {
  background: var(--accent-color);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  margin-top: 1rem;
  cursor: pointer;
  width: 100%;
}
</style>