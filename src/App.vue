<script setup lang="ts">
// 获取仓库里面的user信息进行展示
import { useUserStore } from './stores/user'
const userStore = useUserStore()
</script>

<template>
  <pre>{{ JSON.stringify(userStore.user, null, 2) }}</pre>
  <button
    @click="
      userStore.setUser({
        token: '32',
        id: '23',
        account: '1434234234',
        mobile: '15455555555',
        avatar: '2323'
      })
    "
  >
    登录
  </button>
  <button @click="userStore.delUser()">退出登录</button>
</template>
