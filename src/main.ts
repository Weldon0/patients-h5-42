import './assets/main.scss'
import 'vant/lib/index.css'

import { createApp } from 'vue'
import { ConfigProvider } from 'vant'
import 'virtual:svg-icons-register'

import App from '@/App.vue'
import router from './router'
import pinia from './stores'

const app = createApp(App)

// 创建pinia实例
app.use(pinia)
app.use(router)
app.use(ConfigProvider)
// 所有的注册都要放到mount之前
app.mount('#app')
