import { defineStore } from 'pinia'

export const useMusicStore = defineStore('music', {
  state: () => ({
    currentSong: null,
    isPlaying: false,
    recentlyPlayed: [],
    favorites: [],
    user: null
  }),
  actions: {
    login(user) {
      this.user = user
    },
    logout() {
      this.user = null
    },
    register(user) {
      // 在实际应用中这里会调用API
      this.user = user
    },
    addToRecentlyPlayed(song) {
      const existingIndex = this.recentlyPlayed.findIndex(s => s.id === song.id)
      if (existingIndex !== -1) {
        this.recentlyPlayed.splice(existingIndex, 1)
      }
      this.recentlyPlayed.unshift(song)
      if (this.recentlyPlayed.length > 10) {
        this.recentlyPlayed.pop()
      }
    },
    toggleFavorite(song) {
      const index = this.favorites.findIndex(s => s.id === song.id)
      if (index === -1) {
        this.favorites.push(song)
      } else {
        this.favorites.splice(index, 1)
      }
    },
    playSong(song) {
      this.currentSong = song
      this.isPlaying = true
      this.addToRecentlyPlayed(song)
    },
    togglePlay() {
      this.isPlaying = !this.isPlaying
    }
  },
  getters: {
    isFavorite: (state) => (song) => {
      return state.favorites.some(s => s.id === song.id)
    }
  }
})