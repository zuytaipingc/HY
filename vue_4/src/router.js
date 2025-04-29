// 创建路由器并暴露出去
import { createRouter, createWebHashHistory } from 'vue-router'
// 引入要呈现的组件
import Home from '../components/Home.vue'
import News from '../components/News.vue'
import About from '../components/About.vue'

// 创建路由器
const router = createRouter({
    // 路由器的工作模式
    history: createWebHashHistory(),
    // 制定路由规则
    routes: [
        {
            path: '/home',
            component: Home
        },
        {
            path: '/news',
            component: News
        },
        {
            path: '/about',
            component: About
        }
    ]
})

export default router