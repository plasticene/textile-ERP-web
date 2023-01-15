import { METHOD, request } from '@/utils/request'
const { POST, GET, PUT, DELETE } = METHOD

// 原料列表查询
export function getMaterialList(keyword) {
  return request('/material', GET, {
    keyword,
    pageNo: 1,
    pageSize: 1000
  })
}
// 原料库存记录列表
export function getMaterialStockList(params) {
  return request('/material/stock', GET, params)
}
// 新增原料
export function saveMaterial(params) {
  return request('/material', POST, params)
}
// 修改原料
export function updateMaterial(params) {
  return request(`/material/${params.id}`, PUT, params)
}
// 删除原料
export function delMaterial(id) {
  return request(`/material/stock/${id}`, DELETE)
}
// 获取岗位原料的菜单权限
export function getMaterialMenuList(roleId) {
  return request('/material/menu', GET, {
    roleId
  })
}
// 保存岗位原料的菜单权限
export function saveMaterialMenu(params) {
  return request('/material/menu', POST, params)
}
// 获取当前原料绑定的员工列表
export function getMaterialStaffPageList(params) {
  return request('/material/user', GET, params)
}
// 添加原料关联员工
export function addMaterialStaff(params) {
  return request('/material/user', POST, params)
}
// 批量移除当前岗位绑定的员工
export function delMaterialStaff(params) {
  return request(`/material/user`, DELETE, params)
}
