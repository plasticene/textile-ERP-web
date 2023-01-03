import { METHOD, request } from '@/utils/request'
const { POST, GET, PUT, DELETE } = METHOD

// 代工厂列表分页列表查询
export function getFactoryPageList(params) {
  return request('/foundry', GET, params)
}
// 新增代工厂
export function saveFactory(params) {
  return request('/foundry', POST, params)
}
// 修改代工厂
export function updateFactory(params) {
  return request(`/foundry/${params.id}`, PUT, params)
}
// 删除代工厂
export function delFactory(id) {
  return request(`/foundry/${id}`, DELETE)
}
