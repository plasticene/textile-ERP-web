// /**
//  * 判断是否有路由的权限
//  * @param authority 路由权限配置
//  * @param permissions 用户权限集合
//  * @returns {boolean|*}
//  */
// function hasPermission(authority, permissions) {
//   let required = '*'
//   if (typeof authority === 'string') {
//     required = authority
//   } else if (typeof authority === 'object') {
//     required = authority.permission
//   }
//   return (
//     required === '*' ||
//     (permissions &&
//       permissions.findIndex(
//         item => item === required || item.id === required
//       ) !== -1)
//   )
// }

// /**
//  * 判断是否有路由需要的角色
//  * @param authority 路由权限配置
//  * @param roles 用户角色集合
//  */
// function hasRole(authority, roles) {
//   let required = undefined
//   if (typeof authority === 'object') {
//     required = authority.role
//   }
//   return authority === '*' || hasAnyRole(required, roles)
// }

// /**
//  * 判断是否有需要的任意一个角色
//  * @param required {String | Array[String]} 需要的角色，可以是单个角色或者一个角色数组
//  * @param roles 拥有的角色
//  * @returns {boolean}
//  */
// function hasAnyRole(required, roles) {
//   if (!required) {
//     return false
//   } else if (Array.isArray(required)) {
//     return (
//       roles.findIndex(role => {
//         return (
//           required.findIndex(item => item === role || item === role.id) !== -1
//         )
//       }) !== -1
//     )
//   } else {
//     return (
//       roles.findIndex(role => role === required || role.id === required) !== -1
//     )
//   }
// }

/**
 * 路由权限校验, 不在menus中的路由不能访问
 * @param route 路由
 * @param permissions 用户权限集合
 * @param roles 用户角色集合
 * @returns {boolean}
 */
function hasAuthority(route, menus) {
  let menuId = 0
  // 若meta中permission为true，或父级meta中permission为true，则有权限
  if (
    route.meta.permission ||
    route.matched.some(item => item.meta.permission)
  ) {
    return true
  } else if (route.meta.id) {
    menuId = route.meta.id
  }
  // meta中没有id，则需要查找最近的父级菜单meta中是否有id
  else {
    let menu = route.matched.filter(item => item.meta.id !== undefined)
    menuId = menu && menu.length ? menu[menu.length - 1].meta.id : 0
  }
  // 都没有id，则有权限
  if (!menuId) {
    return true
  }
  // 有id的情况下，判断是否有权限
  for (let i = 0, l = menus.length; i < l; i++) {
    if (menus[i].id === menuId) {
      return true
    } else if (menus[i].list) {
      const flag = hasAuthority(route, menus[i].list)
      if (flag) {
        return flag
      }
    }
  }
  return false
}
/**
 * 获取接口返回menus中第一个有jump的菜单
 * @param route 路由
 * @param permissions 用户权限集合
 * @param roles 用户角色集合
 * @returns {boolean}
 */
function getFirstMenu(menus) {
  for (let i = 0, l = menus.length; i < l; i++) {
    if (menus[i].jump) {
      return menus[i].jump.replace('/#', '')
    } else if (menus[i].list) {
      const path = getFirstMenu(menus[i].list)
      if (path) {
        return path.replace('/#', '')
      }
    }
  }
  return false
}

/**
 * 根据权限配置过滤菜单数据(这个方法好像没有用到。。待确认)
 * @param menuData
 * @param permissions
 * @param roles
 */
function filterMenu(menuData, permissions, roles) {
  return menuData.filter(menu => {
    if (menu.meta && menu.meta.invisible === undefined) {
      if (!hasAuthority(menu, permissions, roles)) {
        return false
      }
    }
    if (menu.children && menu.children.length > 0) {
      menu.children = filterMenu(menu.children, permissions, roles)
    }
    return true
  })
}

/**
 * 不过滤权限
 * @param menuData
 * @param permissions
 * @param roles
 */
function selfFilterMenu(menuData) {
  return menuData
}

/**
 * 根据后端返回权限过滤菜单数据
 * @param menuData
 * @param filterMenu
 */
function filterMenuData(menuData, filterMenu, isAdmin) {
  const accessedRouters = []
  menuData.forEach(item => {
    const menu = filterMenu.find(ele => ele.id === item.meta.id)
    if (
      !menu &&
      !item.meta.id &&
      (item.meta.invisible || item.meta.permission)
    ) {
      accessedRouters.push(item)
    } else if (
      !menu &&
      (item.meta.id === 'roleCtrl' || (item.meta.id === 'admin' && isAdmin))
    ) {
      if (item.children) {
        item.children = filterMenuData(item.children, [], isAdmin)
      }
      accessedRouters.push(item)
    } else if (menu) {
      item.name = menu.title
      item.meta.jump = menu.jump
      item.meta.target = menu.target
      if (item.children) {
        const childrenRouter = item.children
        item.children = item.children.filter(ele => ele.hidden === true)
        if (menu.list && menu.list.length) {
          item.children = item.children.concat(
            filterMenuData(childrenRouter, menu.list, isAdmin)
          )
        }
      }
      accessedRouters.push(item)
    }
  })
  return accessedRouters
}

export { filterMenu, filterMenuData, getFirstMenu, hasAuthority }
// 本应用使用
export { selfFilterMenu }
