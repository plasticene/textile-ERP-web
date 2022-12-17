import { METHOD, request } from '@/utils/request'
const { POST, GET, PUT, DELETE } = METHOD

// 车间列表分页列表查询
export function getWorkshopPageList(params) {
  return request('/workshop', GET, params)
}
// // 查看投资信息
// export function getWorkshop(id) {
//   return request(`/invest/view/${id}`, GET)
// }
// // 查看投资信息变更记录
// export function getInvestChangeLog(relateId) {
//   return request(`/invest/getChangeList/${relateId}`, GET)
// }
// 新增车间
export function saveWorkshop(params) {
  return request('/workshop', POST, params)
}
// 修改车间
export function updateWorkshop(params) {
  return request(`/workshop/${params.id}`, PUT, params)
}
// 删除车间
export function delWorkshop(id) {
  return request(`/workshop/${id}`, DELETE)
}
