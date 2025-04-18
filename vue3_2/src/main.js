import { createApp } from 'vue'
import './style.css'
// 使用 App.vue 作为根组件
// import App from './components/CustomEvents.vue'
import App from './components/ProvideGrand.vue'
// 导入
import school from './components/school.vue'
// 全局组件注册
const app = createApp(App)
app.provide("shuzhi",'数智产业学院')
// app.component('school', school)
app.mount('#app')