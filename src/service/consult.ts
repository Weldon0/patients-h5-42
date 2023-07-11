import { request } from '@/utils/request'
import type {
  DoctorPage,
  FollowType,
  KnowledgePage,
  KnowledgeParams,
  PageParams
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
