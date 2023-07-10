import { request } from '@/utils/request'
import type { CodeType, PatientList, User } from '@/types/user'
import type { UserInfo } from '@/types/user'

export const loginApi = (mobile: string, password: string) => {
  return request<User>('/login/password', 'POST', { mobile, password })
}

export const sendCode = (mobile: string, type: CodeType) =>
  request('/code', 'GET', { mobile, type })

export const loginByMobile = (mobile: string, code: string) =>
  request<User>('/login', 'POST', { mobile, code })

export const getUserInfo = () => request<UserInfo>('/patient/myUser')

// 获取患者列表接口
export const getPatientList = () => request<PatientList>('/patient/mylist')
