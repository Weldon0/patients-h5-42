<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter() // 等价于this.$router
defineProps<{
  title: string
  rightText?: string
}>()

// 接收父组件的自定义事件
const emits = defineEmits<{
  (e: 'clickRight'): void
}>()
// clickRight需要从父组件动态传入事件

const clickLeft = () => {
  // 点击返回的逻辑
  // 是否可以回退，如果可以回退的情况下，再调用路由的back方法进行回退
  // 没有回退的历史了，需要直接跳转首页
  if (history.length > 1) {
    // 路由的回退方法
    // this.$router.back()
    router.back()
  } else {
    router.push('/')
  }
}
const clickRight = () => {
  emits('clickRight')
}
</script>

<template>
  <van-nav-bar
    fixed
    left-arrow
    @click-left="clickLeft"
    :right-text="rightText"
    :title="title"
    @click-right="clickRight"
  ></van-nav-bar>
</template>

<style lang="scss" scoped>
::v-deep() {
  .van-nav-bar {
    &__arrow {
      font-size: 18px;
      color: var(--cp-text1);
    }
    &__text {
      font-size: 15px;
    }
  }
}
</style>
