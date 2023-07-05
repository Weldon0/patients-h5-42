import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import persi from 'pinia-plugin-persistedstate'

import App from '@/App.vue'
import router from './router'

const app = createApp(App)

// 创建pinia实例
const pinia = createPinia()

// 持久化的插件是注册给pinia的
pinia.use(persi)

app.use(pinia)
app.use(router)
// 所有的注册都要放到mount之前
app.mount('#app')
