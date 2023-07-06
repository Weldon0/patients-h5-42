import router from '@/router'
import { useUserStore } from '@/stores'
import type { User } from '@/types/user'
import axios, { AxiosError } from 'axios'
import type { Method } from 'axios'
import { showToast } from 'vant'

const baseURL = 'https://consult-api.itheima.net/'
const instance = axios.create({
  baseURL: baseURL,
  timeout: 10000
})

// 请求拦截器 >> 注入token
instance.interceptors.request.use(
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
instance.interceptors.response.use(
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

type Data<T> = {
  code: number
  message: string
  data: T
}

// 基于instance封装一个request请求
const request = <T>(
  url: string,
  method: Method = 'get',
  submitData?: object
) => {
  // 为了继承泛型
  return instance.request<T, Data<T>>({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
    // 处理参数
  })
}
// 调用接口requset的时候，会把当前接口后端返回的数据的ts类型作为泛型传入
// request<User>('/login', 'POST', { mobile: '' }).then((res) => {
//   // res
// })

// request<List>('/getList', 'POST', { mobile: '' }).then((res) => {
//   // res
// })

// baseURL其他地方可能会用到
export { request, baseURL }
