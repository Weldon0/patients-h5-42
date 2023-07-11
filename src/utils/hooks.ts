import { onMounted, onUnmounted, ref } from 'vue'

export const useSize = () => {
  const width = ref(0)

  const setWidth = () => (width.value = window.innerWidth) // 获取视口的宽度

  onMounted(() => {
    setWidth()
    //   屏幕宽度变化的时候，我需要重新setWidth
    window.addEventListener('resize', setWidth)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', setWidth)
  })
  return { width }
}
