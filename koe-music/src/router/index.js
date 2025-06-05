import { createRouter, createWebHistory } from 'vue-router'
import { useMusicStore } from '../store/index'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/Home.vue'),
    meta: { showPlayer: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../pages/Register.vue')
  },
  {
    path: '/singer/:id',
    name: 'SingerDetail',
    component: () => import('../pages/SingerDetail.vue'),
    meta: { showPlayer: true }
  },
  {
    path: '/album/:id',
    name: 'AlbumDetail',
    component: () => import('../pages/AlbumDetail.vue'),
    meta: { showPlayer: true }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../pages/Admin.vue'),
    meta: { requiresAuth: true, isAdmin: true }
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