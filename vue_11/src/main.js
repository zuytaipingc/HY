import { createApp } from 'vue'
import './style.css'
// import './mock/mockServer.js'
import App from './App.vue'
import store from './store'

const app = createApp(App)
app.use(store)
app.mount('#app') // 只保留这一次挂载