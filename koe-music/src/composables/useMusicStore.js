// src/composables/useMusicStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useMusicStore = defineStore('music', () => {
  // 用户状态
  const user = ref(JSON.parse(localStorage.getItem('music_user')) || null)
  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.isAdmin || false)
  
  // 登录方法（普通用户）
  const login = (userData) => {
    user.value = { ...userData, isAdmin: false }
    localStorage.setItem('music_user', JSON.stringify(user.value))
    initUserData()
  }
  
  // 管理员登录
  const adminLogin = (adminData) => {
    user.value = { ...adminData, isAdmin: true }
    localStorage.setItem('music_user', JSON.stringify(user.value))
    initUserData()
  }
  
  // 退出登录
  const logout = () => {
    user.value = null
    localStorage.removeItem('music_user')
    favorites.value = []
    recentlyPlayed.value = []
  }
  
  // 注册方法
  const register = (userData) => {
    user.value = { ...userData, isAdmin: false }
    localStorage.setItem('music_user', JSON.stringify(user.value))
    initUserData()
  }
  
  // 初始化用户数据
  const initUserData = () => {
    const savedFavorites = localStorage.getItem(`music_favorites_${user.value?.username}`)
    if (savedFavorites) {
      favorites.value = JSON.parse(savedFavorites)
    }
    
    const savedRecentlyPlayed = localStorage.getItem(`music_recentlyPlayed_${user.value?.username}`)
    if (savedRecentlyPlayed) {
      recentlyPlayed.value = JSON.parse(savedRecentlyPlayed)
    }
  }
  
  // 音乐数据
  const singers = ref([
    { 
      id: 1, 
      name: '周杰伦', 
      avatar: '/images/singers/1.jpg',
      description: '亚洲流行天王',
      region: '台湾',
      genre: '流行'
    },
    { 
      id: 2, 
      name: '林俊杰', 
      avatar: '/images/singers/2.jpg',
      description: '新加坡著名歌手、华语流行乐男歌手、音乐人、影视演员',
      region: '新加坡',
      genre: '流行'
    },
    {   id:3, 
      name: '邓紫棋', 
      avatar: '/images/singers/3.jpg',
      description: '香港著名创作型歌手',
      region: '香港',
      genre: '流行'
    }
  ])
  
  const albums = ref({
    1: [
      { id: 1, title: '七里香', cover: '/images/albums/1.jpg', year: 2004, singerId: 1 },
      { id: 2, title: '范特西', cover: '/images/albums/2.jpg', year: 2001, singerId: 1 }
    ],
    2: [
      { id: 3, title: '她说', cover: '/images/albums/3.jpg', year: 2010, singerId: 2 },
      { id: 4, title: '新地球', cover: '/images/albums/4.jpg', year: 2014, singerId: 2 }
    ],
    3: [
      { id: 5, title: '摩天动物园', cover: '/images/albums/5.jpg', year: 2010, singerId: 3 },
      { id: 6, title: '启示录', cover: '/images/albums/6.jpg', year: 2014, singerId: 3 }
    ]
  })
  
  const songs = ref({
    1: [
      { 
        id: 1, 
        title: '七里香', 
        duration: '4:59', 
        albumId: 1, 
        url: 'https://music.163.com/song/media/outer/url?id=386538.mp3', 
        cover: '/images/songs/1.jpg',
        popularity: 80 
      },
      { 
        id: 2, 
        title: '我的地盘', 
        duration: '4:59', 
        albumId: 1, 
        url: 'https://music.163.com/song/media/outer/url?id=386538.mp3', 
        cover: '/images/songs/2.jpg',
        popularity: 80 
      }
    ],
    2: [
      { 
        id: 3, 
        title: '爱在西元前', 
        duration: '3:50', 
        albumId: 2, 
        url: 'https://music.163.com/song/media/outer/url?id=386688.mp3', 
        cover: '/images/songs/3.jpg',
        popularity: 75 
      },
      { 
        id: 4, 
        title: '简单爱', 
        duration: '3:50', 
        albumId: 2, 
        url: 'https://music.163.com/song/media/outer/url?id=386688.mp3', 
        cover: '/images/songs/4.jpg',
        popularity: 75 
      }
    ],
    3: [
      { 
        id: 5, 
        title: '她说', 
        duration: '4:59', 
        albumId: 3, 
        url: 'https://music.163.com/song/media/outer/url?id=386538.mp3', 
        cover: '/images/songs/5.jpg',
        popularity: 80 
      },
      { 
        id: 6, 
        title: '爱笑的眼睛', 
        duration: '4:59', 
        albumId: 3, 
        url: 'https://music.163.com/song/media/outer/url?id=386538.mp3', 
        cover: '/images/songs/6.jpg',
        popularity: 80 
      }
    ],
    4: [
      { 
        id: 7, 
        title: '新地球', 
        duration: '3:50', 
        albumId: 4, 
        url: 'https://music.163.com/song/media/outer/url?id=386688.mp3', 
        cover: '/images/songs/7.jpg',
        popularity: 75 
      },
      { 
        id: 8, 
        title: '浪漫血液', 
        duration: '3:50', 
        albumId: 4, 
        url: 'https://music.163.com/song/media/outer/url?id=386688.mp3', 
        cover: '/images/songs/8.jpg',
        popularity: 75 
      }
    ],
    5: [
      { 
        id: 9, 
        title: '摩天动物园', 
        duration: '4:59', 
        albumId: 5, 
        url: 'https://music.163.com/song/media/outer/url?id=386538.mp3', 
        cover: '/images/songs/9.jpg',
        popularity: 80 
      },
      { 
        id: 10, 
        title: '透明', 
        duration: '4:59', 
        albumId: 5, 
        url: 'https://music.163.com/song/media/outer/url?id=386538.mp3', 
        cover: '/images/songs/10.jpg',
        popularity: 80 
      }
    ],
    6: [
      { 
        id: 11, 
        title: '泡沫', 
        duration: '3:50', 
        albumId: 6, 
        url: 'https://music.163.com/song/media/outer/url?id=386688.mp3', 
        cover: '/images/songs/11.jpg',
        popularity: 75 
      },
      { 
        id: 12, 
        title: '我的秘密', 
        duration: '3:50', 
        albumId: 6, 
        url: 'https://music.163.com/song/media/outer/url?id=386688.mp3', 
        cover: '/images/songs/12.jpg',
        popularity: 75 
      }
    ]
  })
  
  // 播放状态
  const currentSong = ref(null)
  const isPlaying = ref(false)
  const recentlyPlayed = ref([])
  const favorites = ref([])
  const searchResults = ref([])
  
  // 播放歌曲
  const playSong = (song) => {
    currentSong.value = song
    isPlaying.value = true
    
    // 添加到最近播放
    if (!recentlyPlayed.value.some(s => s.id === song.id)) {
      recentlyPlayed.value.unshift(song)
      if (recentlyPlayed.value.length > 10) {
        recentlyPlayed.value.pop()
      }
      
      if (user.value?.username) {
        localStorage.setItem(
          `music_recentlyPlayed_${user.value.username}`,
          JSON.stringify(recentlyPlayed.value)
        )
      }
    }
  }
  
  // 切换播放状态
  const togglePlay = () => {
    isPlaying.value = !isPlaying.value
  }
  
  // 收藏管理
  const addToFavorites = (song) => {
    if (!favorites.value.some(s => s.id === song.id)) {
      favorites.value.push(song)
      
      if (user.value?.username) {
        localStorage.setItem(
          `music_favorites_${user.value.username}`,
          JSON.stringify(favorites.value)
        )
      }
    }
  }
  
  const removeFromFavorites = (songId) => {
    favorites.value = favorites.value.filter(song => song.id !== songId)
    
    if (user.value?.username) {
      localStorage.setItem(
        `music_favorites_${user.value.username}`,
        JSON.stringify(favorites.value)
      )
    }
  }
  
  // 搜索功能
  const search = (query) => {
    const results = []
    const queryLower = query.toLowerCase()
    
    // 搜索歌曲
    Object.values(songs.value).forEach(albumSongs => {
      albumSongs.forEach(song => {
        if (song.title.toLowerCase().includes(queryLower)) {
          results.push({ ...song, type: 'song' })
        }
      })
    })
    
    // 搜索歌手
    singers.value.forEach(singer => {
      if (singer.name.toLowerCase().includes(queryLower)) {
        results.push({ 
          id: singer.id,
          name: singer.name,
          avatar: singer.avatar,
          description: singer.description,
          type: 'singer'
        })
      }
    })
    
    // 搜索专辑
    Object.values(albums.value).forEach(singerAlbums => {
      singerAlbums.forEach(album => {
        if (album.title.toLowerCase().includes(queryLower)) {
          results.push({
            id: album.id,
            title: album.title,
            cover: album.cover,
            singerId: album.singerId,
            type: 'album'
          })
        }
      })
    })
    
    searchResults.value = results
    return results
  }
  
  // 获取专辑名称
  const getAlbumName = (albumId) => {
    for (const singerId in albums.value) {
      const album = albums.value[singerId].find(a => a.id === albumId)
      if (album) return album.title
    }
    return '未知专辑'
  }
  
  // 管理员方法 - 添加歌手
  const addSinger = (singerData) => {
    const newId = Math.max(...singers.value.map(s => s.id), 0) + 1
    singers.value.push({
      id: newId,
      ...singerData
    })
  }
  
  // 管理员方法 - 更新歌手
  const updateSinger = (id, singerData) => {
    const index = singers.value.findIndex(s => s.id === id)
    if (index !== -1) {
      singers.value[index] = { ...singers.value[index], ...singerData }
    }
  }
  
  // 管理员方法 - 删除歌手
  const deleteSinger = (id) => {
    singers.value = singers.value.filter(singer => singer.id !== id)
  }
  
  // 初始化用户数据
  if (user.value) {
    initUserData()
  }
  
  return {
    // 用户相关
    user,
    isAuthenticated,
    isAdmin,
    login,
    adminLogin,
    logout,
    register,
    
    // 音乐数据
    singers,
    albums,
    songs,
    
    // 播放状态
    currentSong,
    isPlaying,
    recentlyPlayed,
    favorites,
    searchResults,
    
    // 方法
    playSong,
    togglePlay,
    addToFavorites,
    removeFromFavorites,
    search,
    getAlbumName,
    
    // 管理员方法
    addSinger,
    updateSinger,
    deleteSinger
  }
})