/* eslint-disable no-unused-vars */
import hljs from 'highlight.js'
// import {loginIgnore} from '@/router/index'
// import {checkAuthorization} from '@/utils/request'
import Cookies from 'js-cookie'
import NProgress from 'nprogress'
import Vue from 'vue'

import { getFirstMenu, hasAuthority } from '@/utils/authority-utils'
NProgress.configure({ showSpinner: false })

/**
 * 进度条开始
 * @param to
 * @param form
 * @param next
 */
const progressStart = (to, from, next) => {
  // start progress bar
  if (!NProgress.isStarted()) {
    NProgress.start()
  }
  next()
}

// /**
//  * 登录守卫
//  * @param to
//  * @param form
//  * @param next
//  * @param options
//  */
// const loginGuard = (to, from, next, options) => {
//   const {message} = options
//   if (!loginIgnore.includes(to) && !checkAuthorization()) {
//     message.warning('登录已失效，请重新登录')
//     next({path: '/login'})
//   } else {
//     next()
//   }
// }

/**
 * 权限守卫
 * @param to
 * @param form
 * @param next
 * @param options
 */
const clearJSESSIONID = (to, from, next, options) => {
  if (to.query.JSESSIONID) {
    Cookies.remove('JSESSIONID')
    Cookies.set('JSESSIONID', to.query.JSESSIONID)
    delete to.query.JSESSIONID
    let query = ''
    let path = to.path
    Object.keys(to.query).forEach((item, index) => {
      query = index ? `&${item}=${to.query[item]}` : `${item}=${to.query[item]}`
    })

    if (
      to.redirectedFrom === '/' ||
      to.redirectedFrom?.includes('/?JSESSIONID=')
    ) {
      path = '/'
    }
    next(query ? `${path}?${query}` : path)
  } else {
    next()
  }
}

/**
 * 权限守卫
 * @param to
 * @param form
 * @param next
 * @param options
 */
const authorityGuard = (to, from, next, options) => {
  // 404界面不用拦截
  if (to.name === '404') {
    next()
    return
  }
  const { store, message, getMenuList } = options
  let menuData = store.getters['setting/filterMenuDate']
  // 若路由没权限，且此时store中没有菜单数据，则重新获取菜单数据
  if (
    getMenuList &&
    !hasAuthority(to, menuData) &&
    (!store.state.account.user || !store.state.account.user.id)
  ) {
    getMenuList().then(res => {
      menuData = res.data.content.menus
      go2Next(to, menuData, next, message)
    })
  } else {
    go2Next(to, menuData, next, message)
  }
}

// 本项目不拦截路由
const selfAuthorityGuard = (to, from, next, options) => {
  next()
}

/**
 * 根据菜单数据进行路由跳转
 * @param to
 * @param menuData
 * @param next
 * @param message
 */
const go2Next = (to, menuData, next, message) => {
  // 若'/'的redirect无访问权限，则跳转到第一个有权限的路由
  if (
    to.redirectedFrom === '/' &&
    !hasAuthority(to, menuData) &&
    getFirstMenu(menuData)
  ) {
    next({
      path: getFirstMenu(menuData)
    })
  }
  // 其他路由无权限，直接跳转至403
  else if (!hasAuthority(to, menuData)) {
    message.warning(`对不起，您无权访问页面`)
    next({ path: '/403' })
  }
  // 有权限则正常访问
  else {
    next()
  }
}

/**
 * 混合导航模式下一级菜单跳转重定向
 * @param to
 * @param from
 * @param next
 * @param options
 * @returns {*}
 */
const redirectGuard = (to, from, next, options) => {
  const { store } = options
  const getFirstChild = routes => {
    const route = routes[0]
    if (!route.children || route.children.length === 0) {
      return route
    }
    return getFirstChild(route.children)
  }
  if (store.state.setting.layout === 'mix') {
    const firstMenu = store.getters['setting/firstMenu']
    if (firstMenu.find(item => item.fullPath === to.fullPath)) {
      store.commit('setting/setActivatedFirst', to.fullPath)
      const subMenu = store.getters['setting/subMenu']
      if (subMenu.length > 0) {
        const redirect = getFirstChild(subMenu)
        return next({ path: redirect.fullPath })
      }
    }
  }
  next()
}

/**
 * 进度条结束
 * @param to
 * @param form
 * @param options
 */
const progressDone = () => {
  // finish progress bar
  NProgress.done()
}

const hjs = () => {
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)')
    Array.prototype.forEach.call(blocks, hljs.highlightElement)
  })
}

export default {
  beforeEach: [clearJSESSIONID, progressStart, authorityGuard, redirectGuard],
  afterEach: [progressDone, hjs]
}

// 本应用使用
export const selfGuard = {
  beforeEach: [
    clearJSESSIONID,
    progressStart,
    selfAuthorityGuard,
    redirectGuard
  ],
  afterEach: [progressDone, hjs]
}
