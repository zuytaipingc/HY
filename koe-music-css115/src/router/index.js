import { createRouter, createWebHistory } from 'vue-router'
import { useMusicStore } from '../store/index'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/HomeCss.vue'),
    meta: { showPlayer: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/LoginCss.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../pages/RegisterCss.vue')
  },
  {
    path: '/singer/:id',
    name: 'SingerDetail',
    component: () => import('../pages/SingerDetailCss.vue'),
    meta: { showPlayer: true }
  },
  {
    path: '/album/:id',
    name: 'AlbumDetail',
    component: () => import('../pages/AlbumDetailCss.vue'),
    meta: { showPlayer: true }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../pages/AdminCss.vue'),
    meta: { requiresAuth: true, isAdmin: true }
  },
  {
    path: '/song',
    name: 'Song',
    component: () => import('../pages/SongCss.vue'),
    meta: { showPlayer: true }
  },
  {
    path: '/album',
    name: 'Album',
    component: () => import('../pages/AlbumCss.vue'),
    meta: { showPlayer: true }
  },
  {
    path: '/singer',
    name: 'Singer',
    component: () => import('../pages/SingerCss.vue'),
    meta: { showPlayer: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const musicStore = useMusicStore()
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!musicStore.isAuthenticated) {
      next('/login')
      return
    }
  }
  
  if (to.matched.some(record => record.meta.isAdmin)) {
    if (!musicStore.isAdmin) {
      next('/')
      alert('您没有管理员权限')
      return
    }
  }
  
  next()
})

export default router