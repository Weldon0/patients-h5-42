<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter() // 等价于this.$router
const props = defineProps<{
  title: string
  rightText?: string
  back?: () => void // 可以接受一个函数类型
}>()

// 接收父组件的自定义事件
const emits = defineEmits<{
  (e: 'clickRight'): void
}>()
// clickRight需要从父组件动态传入事件

const clickLeft = () => {
  // 家庭档案这个页面，只需要关闭弹层，所以需要自定义返回按钮的功能
  // 点击返回的逻辑
  // 是否可以回退，如果可以回退的情况下，再调用路由的back方法进行回退
  // 没有回退的历史了，需要直接跳转首页
  // 如果父组件传递返回按钮的事件，执行，同时return代码
  if (props.back) {
    props.back()
    return
  }
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
