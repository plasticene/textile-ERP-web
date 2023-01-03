import { METHOD, request } from '@/utils/request'
const { POST, GET, PUT, DELETE } = METHOD

// 供应商列表分页列表查询
export function getSupplierPageList(params) {
  return request('/supplier', GET, params)
}
// 新增供应商
export function saveSupplier(params) {
  return request('/supplier', POST, params)
}
// 修改供应商
export function updateSupplier(params) {
  return request(`/supplier/${params.id}`, PUT, params)
}
// 删除供应商
export function delSupplier(id) {
  return request(`/supplier/${id}`, DELETE)
}
