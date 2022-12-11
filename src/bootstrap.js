import '@/theme/index.js'

import guards from '@/router/guards'
import interceptors from '@/utils/axios-interceptors'
import { loadBrowserEnv } from '@/utils/browser-env'
import { loadInterceptors } from '@/utils/request'
import { loadGuards, loadRoutes, setAppOptions } from '@/utils/routerUtil'

/**
 * 启动引导方法
 * 应用启动时需要执行的操作放在这里
 * @param router 应用的路由实例
 * @param store 应用的 vuex.store 实例
 * @param i18n 应用的 vue-i18n 实例
 * @param i18n 应用的 message 实例
 */
function bootstrap({ router, store, i18n, message, getMenuList, packageInfo }) {
  // 设置应用配置
  setAppOptions({ router, store, i18n })
  // 加载 axios 拦截器
  loadInterceptors(interceptors, { router, store, i18n, message })
  // 加载路由
  loadRoutes()
  // 加载路由守卫
  loadGuards(guards, { router, store, i18n, message, getMenuList })
  // 获取浏览器环境和git 提交信息 存储在全局变量中
  loadBrowserEnv(packageInfo)
}

export default bootstrap
