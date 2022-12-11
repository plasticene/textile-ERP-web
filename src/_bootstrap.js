import { selfGuard } from '@/router/guards'
import interceptors from '@/utils/axios-interceptors'
import { loadBrowserEnv } from '@/utils/browser-env'
import { loadInterceptors } from '@/utils/request'
import { loadGuards, loadRoutes, setAppOptions } from '@/utils/routerUtil'
// 本应用使用
function selfBootstrap({
  router,
  store,
  i18n,
  message,
  getMenuList,
  packageInfo
}) {
  // 设置应用配置
  setAppOptions({ router, store, i18n })
  // 加载 axios 拦截器
  loadInterceptors(interceptors, { router, store, i18n, message })
  // 加载路由
  loadRoutes()
  // 加载路由守卫
  loadGuards(selfGuard, { router, store, i18n, message, getMenuList })
  // 获取浏览器环境和git 提交信息 存储在全局变量中
  loadBrowserEnv(packageInfo)
}
export { selfBootstrap }
