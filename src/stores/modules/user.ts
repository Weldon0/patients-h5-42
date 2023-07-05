import type { User } from '@/types/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const user = ref<User>()

    //   设置用户信息的方法
    const setUser = (u: User) => {
      user.value = u
    }

    //   移除用户信息函数
    const delUser = () => {
      user.value = undefined
    }

    return {
      user,
      setUser,
      delUser
    }
  },
  {
    persist: true // 开启当前仓库的本地存储
  }
)
