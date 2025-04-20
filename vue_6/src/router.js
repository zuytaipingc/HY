import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './components/Home.vue'
import About from './components/About.vue'
const router = createRouter({
  // 更改路由链接激活项的类名
  // linkActiveClass: 'router-active',
  history: createWebHashHistory(),
  // routes: [
  //   { path: '/home', component: Home },
  //   { path: '/about', component: About },
  // ]

  // 路由重定向
  // routes: [
  //   { path: '/', redirect: '/home' },
  //   { path: '/home', component: () => import('./components/Home.vue') },
  //   { path: '/about', component: () => import('./components/About.vue') }
  // ]

//   嵌套路由
  routes: [
    { path: '/', redirect: '/about' },
    { path: '/home', component: () => import ('./components/Home.vue') },
    {
      path: '/about',
      component: () => import('./components/About.vue'),
      children: [
        { path: 'tab1', component: () => import ('./components/pages/Tab1.vue') },
        { path: 'tab2', component: () => import ('./components/pages/Tab2.vue') }
      ]
    }
  ]

  // 动态路由——获取动态路径参数
  // 1.	使用$route.params获取参数值
  // routes: [
  //   { path: '/', redirect: '/movie'},
  //   { path: '/home', component: () => import('./components/Home.vue') },
  //   { path: '/about', component: () => import('./components/About.vue') },
  //   {
  //     path: '/movie',
  //     component: () => import ('./components/Movie.vue'),
  //     children: [
  //       { path: ':id', component: () => import ('./components/movieDetails.vue') }
  //     ]
  //   }
  // ]

  // 2.	使用props获取参数值
  // routes: [
  //   { path: '/', redirect: '/movie'},
  //   { path: '/home', component: () => import('./components/Home.vue') },
  //   { path: '/about', component: () => import('./components/About.vue') },
  //   {
  //     path: '/movie',
  //     component: () => import ('./components/Movie.vue'),
  //     children: [
  //       { path: ':id', component: () => import ('./components/movieDetails.vue'), props: true }
  //     ]
  //   }
  // ]


  // 3. 命名路由
//   routes: [
//     { path: '/', redirect: '/user'},
//     { path: '/home', component: () => import('./components/Home.vue') },
//     { path: '/about', component: () => import('./components/About.vue') },
//     {
//       path: '/movie',
//       component: () => import ('./components/Movie.vue'),
//       children: [
//         { path: ':id', name: 'MovieDetails', component: () => import ('./components/movieDetails.vue'), props: true }
//       ]
//     },
//     // 导航守卫-登录组件
//     { path: '/login', name: 'Login', component: () => import ('./components/Login.vue') }
//   ]
// })

// 注册全局导航守卫
// router.beforeEach((to, from, next) => {
//   let isLogin = false
//   if (to.name == 'MovieDetails') {
//     if (isLogin) {
//       next()
//     } else {
//       next({ name: 'Login' })
//     }
//   } else {
//     next()
//   }
})

export default router