<script setup lang="ts">
import KnowledgeCard from './KnowledgeCard.vue'
import { ref } from 'vue'
import type {
  KnowledgeType,
  KnowledgeParams,
  KnowledgeList
} from '@/types/consult'
import { getKnowledgePage } from '@/service/consult'
const loading = ref(false)
// 接受父组件传递过来的列表数据的类型
const props = defineProps<{
  type: KnowledgeType
}>()
// 默认会触发，vant组件帮我们触发
const list = ref<KnowledgeList>([])

// 定义请求列表数据的参数
const params = ref<KnowledgeParams>({
  type: props.type,
  current: 1,
  pageSize: 10
})
const onLoad = async () => {
  const res = await getKnowledgePage(params.value)
  // 文章列表的数据，需要把他拼接到list里面去，因为列表是连续的，不能直接替换
  list.value.push(...res.data.rows)
  if (params.value.current >= res.data.pageTotal) {
    // 如果当前页码数大于总的页数，证明没有数据了,把finished表示变为true
    finished.value = true
  } else {
    // 如果还有更多数据，让页码自增
    params.value.current++
  }
  // loading变为false
  loading.value = false
  //   数据请求完毕之后需要把loading变为false
  //   如果服务器端没有更多数据了需要把finished变为true
}
const finished = ref(false)
</script>

<template>
  <div class="knowledge-list">
    <van-list
      v-model:loading="loading"
      @load="onLoad"
      :finished="finished"
      finished-text="没有更多数据了"
    >
      <knowledge-card
        v-for="item in list"
        :key="item.id"
        :item="item"
      ></knowledge-card>
    </van-list>
  </div>
</template>

<style lang="scss" scoped>
.knowledge-list {
  padding: 0 15px;
}
</style>
