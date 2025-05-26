import axios from 'axios'

const api = axios.create({
  baseURL: 'https://mock-api.example.com/music',
  timeout: 5000
})

// 模拟数据
const mockData = {
  singers: [
    { id: 1, name: '周杰伦', avatar: 'https://example.com/avatar1.jpg', songsCount: 120 },
    { id: 2, name: '林俊杰', avatar: 'https://example.com/avatar2.jpg', songsCount: 90 },
    { id: 3, name: '邓紫棋', avatar: 'https://example.com/avatar3.jpg', songsCount: 80 },
    { id: 4, name: '薛之谦', avatar: 'https://example.com/avatar4.jpg', songsCount: 70 },
    { id: 5, name: '李荣浩', avatar: 'https://example.com/avatar5.jpg', songsCount: 60 }
  ],
  songs: [
    { id: 1, title: '晴天', singer: '周杰伦', duration: '4:30', cover: 'https://example.com/cover1.jpg', url: 'https://example.com/song1.mp3' },
    { id: 2, title: '江南', singer: '林俊杰', duration: '4:15', cover: 'https://example.com/cover2.jpg', url: 'https://example.com/song2.mp3' },
    { id: 3, title: '泡沫', singer: '邓紫棋', duration: '3:50', cover: 'https://example.com/cover3.jpg', url: 'https://example.com/song3.mp3' },
    { id: 4, title: '演员', singer: '薛之谦', duration: '4:20', cover: 'https://example.com/cover4.jpg', url: 'https://example.com/song4.mp3' },
    { id: 5, title: '模特', singer: '李荣浩', duration: '3:45', cover: 'https://example.com/cover5.jpg', url: 'https://example.com/song5.mp3' }
  ]
}

export default {
  // 获取歌手列表
  getSingers() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: mockData.singers })
      }, 500)
    })
  },
  
  // 获取歌曲列表
  getSongs() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: mockData.songs })
      }, 500)
    })
  },
  
  // 登录
  login(credentials) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { user: { id: 1, username: credentials.username } } })
      }, 500)
    })
  },
  
  // 注册
  register(userData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { user: { id: 2, username: userData.username } } })
      }, 500)
    })
  }
}