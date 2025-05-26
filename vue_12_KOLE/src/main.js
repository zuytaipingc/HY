import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 创建应用实例
const app = createApp(App)

// 安装插件
app.use(router)
app.use(createPinia())
app.use(ElementPlus)

// 全局配置
app.config.globalProperties.$filters = {
  formatDate(value) {
    return new Date(value).toLocaleDateString()
  }
}

// 挂载应用
app.mount('#app')