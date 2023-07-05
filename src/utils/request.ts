import router from '@/router'
import { useUserStore } from '@/stores'
import axios, { AxiosError } from 'axios'
import { showToast } from 'vant'

const baseURL = 'https://consult-api.itheima.net/'
const request = axios.create({
  baseURL: baseURL,
  timeout: 10000
})

// 请求拦截器 >> 注入token
request.interceptors.request.use(
  (config) => {
    // token注入，判断是否有token
    const userStore = useUserStore()
    const token = userStore.user?.token

    if (token) {
      // 注入token
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (err) => Promise.reject(err)
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 判断后端的code是否为10000
    if (response.data.code !== 10000) {
      // 请求出错
      // 提示用户
      showToast(response.data.message || '系统出错')
      return Promise.reject(response.data.message || '系统出错')
    }
    return response.data // axios默认包裹了一层 data
  },
  (err: AxiosError) => {
    // 判断401
    if (err.response?.status === 401) {
      const { delUser } = useUserStore()
      delUser() // 清空用户信息
      //   跳转登录页面
      router.push('/login')
    }
    return Promise.reject(err)
  }
)

export default request
