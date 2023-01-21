import { METHOD, request } from '@/utils/request'
const { POST, GET, PUT, DELETE } = METHOD

// 机台列表查询
export function getMachineList(params) {
  return request('/machine', GET, {
    ...params,
    pageNo: 1,
    pageSize: 1000
  })
}
// 机台设置列表查询
export function getMachineSetList(params) {
  return request('/machine/set', GET, {
    ...params,
    pageNo: 1,
    pageSize: 1000
  })
}
// 机台库存记录列表
export function getMachineStockList(params) {
  return request('/machine/stock', GET, params)
}
// 新增机台
export function saveMachine(params) {
  return request('/machine', POST, params)
}
// 修改机台
export function updateMachine(params) {
  return request(`/machine/${params.id}`, PUT, params)
}
// 删除机台
export function delMachine(id) {
  return request(`/machine/stock/${id}`, DELETE)
}
// 获取岗位机台的菜单权限
export function getMachineMenuList(roleId) {
  return request('/machine/menu', GET, {
    roleId
  })
}
// 保存岗位机台的菜单权限
export function saveMachineMenu(params) {
  return request('/machine/menu', POST, params)
}
// 获取当前机台绑定的员工列表
export function getMachineStaffPageList(params) {
  return request('/machine/user', GET, params)
}
// 添加机台关联员工
export function addMachineStaff(params) {
  return request('/machine/user', POST, params)
}
// 批量移除当前岗位绑定的员工
export function delMachineStaff(params) {
  return request(`/machine/user`, DELETE, params)
}
