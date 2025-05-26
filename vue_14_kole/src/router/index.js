import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../views/MainLayout.vue'
import Home from '../views/Home.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      },
      {
        path: 'singer-list',
        name: 'SingerList',
        component: () => import('../components/SingerList.vue')
      },
      {
        path: 'song-list',
        name: 'SongList',
        component: () => import('../components/SongList.vue')
      },
      {
        path: 'recently-played',
        name: 'RecentlyPlayed',
        component: () => import('../components/RecentlyPlayed.vue')
      },
      {
        path: 'favorites',
        name: 'Favorites',
        component: () => import('../components/Favorites.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router