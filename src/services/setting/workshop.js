import { METHOD, request } from '@/utils/request'
const { POST, GET } = METHOD

// 车间列表分页列表查询
export function getWorkshopPageList(params) {
  return request('/workshop', GET, params)
}
// // 查看投资信息
// export function getInvestInfo(id) {
//   return request(`/invest/view/${id}`, GET)
// }
// // 查看投资信息变更记录
// export function getInvestChangeLog(relateId) {
//   return request(`/invest/getChangeList/${relateId}`, GET)
// }
// // 新增投资信息
// export function saveInvestInfo(params) {
//   return request('/invest/save', POST, params)
// }
// // 修改投资信息
// export function updateInvestInfo(params) {
//   return request('/invest/update', POST, params)
// }
// // 作废投资信息
// export function delInvest(id) {
//   return request(`/invest/delete/${id}`, GET)
// }
