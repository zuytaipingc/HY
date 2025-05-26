<script setup>
const games = [
  { name: '音乐猜猜乐', description: '根据旋律猜歌名', players: 1024 },
  { name: '节奏大师', description: '跟随节奏点击屏幕', players: 2048 },
  { name: '歌词填空', description: '补全缺失的歌词', players: 512 }
]
</script>

<template>
  <div class="games-page">
    <h1 class="page-title">我的游戏</h1>
    <div class="games-grid">
      <div class="game-card" v-for="(game, index) in games" :key="index">
        <h3>{{ game.name }}</h3>
        <p>{{ game.description }}</p>
        <div class="stats">
          <span>玩家: {{ game.players }}</span>
          <button>开始游戏</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.games-page {
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

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.game-card {
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid var(--accent-color);
  padding: 1.5rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.stats {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
}

button {
  background: var(--accent-color);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}
</style>