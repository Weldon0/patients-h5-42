import type { FollowType } from '@/types/consult'
import { ref } from 'vue'
import { followDoctor } from '@/service/consult'

/**
 * 关注逻辑
 * @param {FollowType} type 关注的类型
 */
export const useFollow = (type: FollowType = 'doc') => {
  const loading = ref(false)
  const follow = async (item: { id: string | number; likeFlag: 0 | 1 }) => {
    loading.value = true
    await followDoctor(item.id, type)
    item.likeFlag = item.likeFlag === 1 ? 0 : 1
    loading.value = false
  }
  return {
    loading, // 是否正在加载中
    follow // 调用的时候会请求接口处理关注或者取消关注逻辑
  }
}
