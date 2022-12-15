import { LOGIN, ROUTES } from '@/services/api'
import { METHOD, removeAuthorization, request } from '@/utils/request'
const { POST, GET } = METHOD
/**
 * 登录服务
 * @param name 账户名
 * @param password 账户密码
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function login(name, password) {
  return request('/user/login', POST, {
    username: name,
    password: password
  })
}

// 超管选择进入的公司
export async function switchOrg(orgId) {
  return request(`/user/choice/${orgId}`, POST)
}
// 获取登录人信息
export async function getUserInfo() {
  return request(`/user/info`, GET)
}

export async function getRoutesConfig() {
  return request(ROUTES, GET)
}

/**
 * 退出登录
 */
export function logout() {
  localStorage.removeItem(process.env.VUE_APP_ROUTES_KEY)
  localStorage.removeItem(process.env.VUE_APP_PERMISSIONS_KEY)
  localStorage.removeItem(process.env.VUE_APP_ROLES_KEY)
  removeAuthorization()
}
export default {
  login,
  logout,
  getRoutesConfig
}
