import { createPinia } from 'pinia'
import persis from 'pinia-plugin-persistedstate'

const pinia = createPinia()

pinia.use(persis)

export default pinia

// 把user模块里面的内容获取到之后进行了导出
export * from './modules/user'
export * from './modules/consult'
