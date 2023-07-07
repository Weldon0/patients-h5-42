import { request } from '@/utils/request'
import type { User } from '@/types/user'

export const loginApi = (mobile: string, password: string) => {
  return request<User>('/login/password', 'POST', { mobile, password })
}
