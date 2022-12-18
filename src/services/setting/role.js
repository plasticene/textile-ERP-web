import { METHOD, request } from '@/utils/request'
const { POST, GET, PUT, DELETE } = METHOD

// 角色列表分页列表查询
export function getRolePageList(name) {
  return request('/role', GET, {
    name,
    pageNo: 1,
    pageSize: 1000
  })
}
// 新增角色
export function saveRole(params) {
  return request('/role', POST, params)
}
// 修改角色
export function updateRole(params) {
  return request(`/role/${params.id}`, PUT, params)
}
// 删除角色
export function delRole(id) {
  return request(`/role/${id}`, DELETE)
}
// 获取岗位角色的菜单权限
export function getRoleMenuList(roleId) {
  return request('/role/menu', GET, {
    roleId
  })
}
// 保存岗位角色的菜单权限
export function saveRoleMenu(params) {
  return request('/role/menu', POST, params)
}
