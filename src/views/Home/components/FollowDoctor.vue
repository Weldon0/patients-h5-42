<script setup lang="ts">
import DoctorCard from '@/views/Home/components/DoctorCard.vue'
import { getDoctorPage } from '@/service/consult'
// import { useSize } from '@/utils/hooks'
//
// const { width } = useSize()

import { useWindowSize } from '@vueuse/core'
import { ref } from 'vue'
import type { DoctorList } from '@/types/consult'

const { width } = useWindowSize()

const list = ref<DoctorList>([])

const loadData = async () => {
  const res = await getDoctorPage({ current: 1, pageSize: 5 })
  list.value = res.data.rows
}
loadData()
</script>

<template>
  <div class="follow-doctor">
    <div class="head">
      <p>推荐关注</p>
      <a href="javascript:;"> 查看更多<i class="van-icon van-icon-arrow" /></a>
    </div>
    <div class="body">
      <van-swipe :width="(150 / 375) * width" :show-indicators="false">
        <van-swipe-item v-for="item in list" :key="item.id">
          <DoctorCard :item="item" />
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.follow-doctor {
  background-color: var(--cp-bg);
  height: 250px;
  .head {
    display: flex;
    justify-content: space-between;
    height: 45px;
    align-items: center;
    padding: 0 15px;
    font-size: 13px;
    > a {
      color: var(--cp-tip);
    }
  }
  .body {
    width: 100%;
    overflow: hidden;
  }
}
</style>
