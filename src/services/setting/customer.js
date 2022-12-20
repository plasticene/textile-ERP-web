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
// 新增发货抬头
export function saveDeliveryTitle(params) {
  return request('/customer/ship', POST, params)
}
// 修改发货抬头
export function updateDeliveryTitle(params) {
  return request(`/customer/ship/${params.id}`, PUT, params)
}
// 删除发货抬头
export function delDeliveryTitle(id) {
  return request(`/customer/ship/${id}`, DELETE)
}
// 新增开票抬头
export function saveInvoiceTitle(params) {
  return request('/customer/invoice', POST, params)
}
// 修改开票抬头
export function updateInvoiceTitle(params) {
  return request(`/customer/invoice/${params.id}`, PUT, params)
}
// 删除开票抬头
export function delInvoiceTitle(id) {
  return request(`/customer/invoice/${id}`, DELETE)
}
