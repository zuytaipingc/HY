import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Artists from '../pages/Artists.vue'
import Games from '..//pages/Games.vue'
import Events from '..//pages/Events.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: '音乐首页' }
  },
  {
    path: '/artists',
    name: 'Artists',
    component: Artists,
    meta: { title: '艺术家列表' }
  },
  {
    path: '/games',
    name: 'Games',
    component: Games,
    meta: { title: '音乐游戏' }
  },
  {
    path: '/events',
    name: 'Events',
    component: Events,
    meta: { title: '分享活动' }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: '用户登录', guestOnly: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { title: '用户注册', guestOnly: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

// 动态标题设置
router.beforeEach((to) => {
  document.title = to.meta.title || '音乐网站'
})

export default router