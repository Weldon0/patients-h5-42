<script setup lang="ts">
import { getAllDep } from '@/service/consult'
import { useConsultStore } from '@/stores'
import type { TopDep } from '@/types/consult'
import { computed } from 'vue'
import { ref } from 'vue'

const active = ref(0)
const consultStore = useConsultStore()

// 请求分类数据
const allDep = ref<TopDep[]>([])
const getDep = async () => {
  const res = await getAllDep()
  allDep.value = res.data
}

getDep()

// 通过计算属性计算二级分类数据
const subDep = computed(() => {
  return allDep.value[active.value]?.child || []
})
</script>

<template>
  <div class="consult-dep-page">
    <cp-nav-bar title="选择科室" />
    <div class="wrapper">
      <van-sidebar v-model="active">
        <van-sidebar-item
          :title="item.name"
          v-for="item in allDep"
          :key="item.id"
        />
      </van-sidebar>
      <div class="sub-dep">
        <router-link
          to="/consult/illness"
          v-for="item in subDep"
          :key="item.id"
          @click="consultStore.setDepId(item.id)"
        >
          {{ item.name }}</router-link
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  height: calc(100vh - 46px);
  overflow: hidden;
  display: flex;
  .sub-dep {
    flex: 1;
    height: 100%;
    overflow-y: auto;
    > a {
      display: block;
      padding: 14px 30px;
      color: var(--cp-dark);
    }
  }
}
.van-sidebar {
  width: 114px;
  &-item {
    padding: 14px;
    color: var(--cp-tag);
    &--select {
      color: var(--cp-main);
      font-weight: normal;
      &::before {
        display: none;
      }
    }
  }
}
.consult-dep-page {
  padding-top: 46px;
}
</style>
