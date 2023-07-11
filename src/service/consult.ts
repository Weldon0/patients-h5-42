import { request } from '@/utils/request'
import type { KnowledgePage, KnowledgeParams } from '@/types/consult'

/**
 * 获取文章列表数据
 * @param params
 */
export const getKnowledgePage = (params: KnowledgeParams) =>
  request<KnowledgePage>('/patient/home/knowledge', 'get', params)
