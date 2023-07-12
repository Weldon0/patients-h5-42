import { request } from '@/utils/request'
import type {
  DoctorPage,
  FollowType,
  Image,
  KnowledgePage,
  KnowledgeParams,
  PageParams,
  TopDep
} from '@/types/consult'

/**
 * 获取文章列表数据
 * @param params
 */
export const getKnowledgePage = (params: KnowledgeParams) =>
  request<KnowledgePage>('/patient/home/knowledge', 'get', params)

export const getDoctorPage = (params: PageParams) =>
  request<DoctorPage>('/home/page/doc', 'get', params)

export const followDoctor = (id: number | string, type: FollowType = 'doc') =>
  request('/like', 'post', { id, type })

// 获取分类数据
export const getAllDep = () => request<TopDep[]>('/dep/all')

// 上传图片
export const uploadImg = (file: File) => {
  // 构建一个formData对象
  const fd = new FormData()

  fd.append('file', file)

  return request<Image>('/upload', 'post', fd)
}
