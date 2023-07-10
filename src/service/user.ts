import { request } from '@/utils/request'
import type { CodeType, Patient, PatientList, User } from '@/types/user'
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

// 添加患者
export const addPatient = (patient: Patient) =>
  request('/patient/add', 'post', patient)

// 编辑患者信息
export const editPatient = (patient: Patient) =>
  request('/patient/update', 'PUT', patient)

// 删除患者信息
export const delPatient = (id: string) =>
  request(`/patient/del/${id}`, 'DELETE')
