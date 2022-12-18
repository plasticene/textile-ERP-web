import { METHOD, request } from '@/utils/request'
const { POST, GET, PUT, DELETE } = METHOD

// 员工列表分页列表查询
export function getStaffPageList(params) {
  return request('/user', GET, params)
}
// 新增员工
export function saveStaff(params) {
  return request('/user', POST, params)
}
// 修改员工
export function updateStaff(params) {
  return request(`/user/${params.id}`, PUT, params)
}
// 删除员工
export function delStaff(id) {
  return request(`/user/${id}`, DELETE)
}
