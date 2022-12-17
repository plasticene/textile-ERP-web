import { METHOD, request } from '@/utils/request'
const { POST, GET, PUT, DELETE } = METHOD

// 车间列表分页列表查询
export function getRolePageList(name) {
  return request('/role', GET, {
    name,
    pageNo: 1,
    pageSize: 1000
  })
}
// 新增车间
export function saveRole(params) {
  return request('/role', POST, params)
}
// 修改车间
export function updateRole(params) {
  return request(`/role/${params.id}`, PUT, params)
}
// 删除车间
export function delRole(id) {
  return request(`/role/${id}`, DELETE)
}
