import { METHOD, request } from '@/utils/request'
const { POST, GET, PUT, DELETE } = METHOD

// 客户列表分页列表查询
export function getCustomerPageList(params) {
  return request('/customer', GET, params)
}
// 新增客户
export function saveCustomer(params) {
  return request('/customer', POST, params)
}
// 修改客户
export function updateCustomer(params) {
  return request(`/customer/${params.id}`, PUT, params)
}
// 删除客户
export function delCustomer(id) {
  return request(`/customer/${id}`, DELETE)
}
