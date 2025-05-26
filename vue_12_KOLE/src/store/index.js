import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMusicStore = defineStore('music', () => {
  const currentTrack = ref(null)
  const isPlaying = ref(false)
  const volume = ref(80)
  const favorites = ref([])
  const playlist = ref([])

  const playTrack = (track) => {
    currentTrack.value = track
    isPlaying.value = true
    if (!playlist.value.some(t => t.id === track.id)) {
      playlist.value.push(track)
    }
  }

  const togglePlay = () => {
    isPlaying.value = !isPlaying.value
  }

  const addToFavorites = (track) => {
    if (!favorites.value.some(fav => fav.id === track.id)) {
      favorites.value.push(track)
    }
  }

  return {
    currentTrack,
    isPlaying,
    volume,
    favorites,
    playlist,
    playTrack,
    togglePlay,
    addToFavorites
  }
})