import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './src/components/Home.vue'
import News from './src/components/News.vue'
import About from './src/components/About.vue'
import News001 from './src/components/News001.vue'
import News002 from './src/components/News002.vue'
import News003 from './src/components/News003.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: 'section1',
          component: () => import('./src/components/Home.vue')
        },
        {
          path: 'section2',
          component: () => import('./src/components/Home.vue')
        }
      ]
    },
    {
      path: '/news',
      component: News,
      children: [
        {
          path: 'news001',
          component: News001
        },
        {
          path: 'news002',
          component: News002
        },
        {
          path: 'news003',
          component: News003
        }
      ]
    },
    {
      path: '/about',
      component: About,
      children: [
        {
          path: 'detail1',
          component: () => import('./src/components/About.vue')
        },
        {
          path: 'detail2',
          component: () => import('./src/components/About.vue')
        }
      ]
    }
  ]
})

export default router