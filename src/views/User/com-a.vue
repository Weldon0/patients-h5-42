<template>
  <h1>{{ modelValue }}</h1>
  <button @click="emits('update:modelValue', 100)">更新value</button>
</template>

<script setup lang="ts">
// 如何获取父组件通过v-model传递过来的值，value属性，$emit('input')
// const attrs = useAttrs()
// vue3，接收父组件传递过来的v-model的值，使用modelValue === vue2当中的value
// 更新这个值使用update:modelValue

// 没有.sync修饰符
defineProps<{
  modelValue: number
  count: number
}>()

// 接收自定义事件的写法
const emits = defineEmits<{
  'update:modelValue': [value: number]
  'update:count': [value: number]
}>()
</script>

<style lang="scss" scoped></style>
