<script setup lang="ts">
import { Button } from 'vant'
// 获取仓库里面的user信息进行展示
import { useUserStore } from '@/stores'
const userStore = useUserStore()
</script>

<template>
  <van-config-provider theme="dark">
    <pre>{{ JSON.stringify(userStore.user, null, 2) }}</pre>
    <Button
      type="primary"
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
    </Button>
    <Button type="primary" @click="userStore.delUser()"
      >退出登录</Button
    ></van-config-provider
  >
</template>
