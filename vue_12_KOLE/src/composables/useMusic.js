import { ref, computed } from 'vue'

export default function useMusic() {
  const volume = ref(80)
  const isMuted = ref(false)
  
  const volumeIcon = computed(() => {
    if (isMuted.value || volume.value === 0) return 'volume-off'
    if (volume.value < 30) return 'volume-low'
    if (volume.value < 70) return 'volume-medium'
    return 'volume-high'
  })
  
  function toggleMute() {
    isMuted.value = !isMuted.value
  }
  
  return {
    volume,
    isMuted,
    volumeIcon,
    toggleMute
  }
}