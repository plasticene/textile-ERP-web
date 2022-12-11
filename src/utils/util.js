import enquireJs from 'enquire.js'
import { sortBy } from 'lodash'

import { METHOD, request } from './request'

export function isDef(v) {
  return v !== undefined && v !== null
}

/**
 * Remove an item from an array.
 */
export function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

export function isRegExp(v) {
  return _toString.call(v) === '[object RegExp]'
}

export function enquireScreen(call) {
  const handler = {
    match: function () {
      call && call(true)
    },
    unmatch: function () {
      call && call(false)
    }
  }
  enquireJs.register('only screen and (max-width: 767.99px)', handler)
}

const _toString = Object.prototype.toString

/**
 * @description: 获取图片文件流
 * @param {*}
 * @return {*}
 */
export const requestURLToBlob = url => {
  return new Promise((resolve, reject) => {
    request(url, METHOD.GET, {}, { responseType: 'blob' })
      .then(res => {
        console.log('requestURLToBlob', res, {}, { responseType: 'blob' })
        resolve(res.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

/**
 * @description:  通过视频DOM 获取视频封面URL
 * @param {HTMLElement} video 视频dom 对象
 * @return {Promise} 返回一个promise，回调是封面data uri
 */
export const getVideoCover = video => {
  return new Promise(resolve => {
    const scale = 0.8
    const canvas = document.createElement('canvas') // 创建一个画布
    canvas.width = video.videoWidth * scale
    canvas.height = video.videoHeight * scale
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height) // getContext:设置画布环境；drawImage:画画

    const coverUrl = canvas.toDataURL('image/png') // 获取图片的url

    resolve(coverUrl)
  })
}

/*
 * 数字序号转字符串序号  0 => "A"
 */
export function indexToString(index) {
  var charCode
  return index
    .toString(26)
    .split('')
    .map(function (item) {
      charCode = item.charCodeAt(0)
      charCode += charCode >= 97 ? 10 : 49
      return String.fromCharCode(charCode)
    })
    .join('')
    .toUpperCase()
}

/*
 * 字符串序号转数字序号  "A" => 0
 */
export function stringToIndex(str) {
  var charCode
  return parseInt(
    str
      .toLowerCase()
      .split('')
      .map(function (item) {
        charCode = item.charCodeAt(0)
        charCode -= charCode < 107 ? 49 : 10
        return String.fromCharCode(charCode)
      })
      .join(''),
    26
  )
}

// 数组对象方法排序：
export function sortByKey(array, key) {
  return array.sort(function (a, b) {
    var x = a[key]
    var y = b[key]
    return x < y ? -1 : x < y ? 1 : 0
  })
}

/**
 * @description: 下拉 转换，从object map 转换成 select 支持的数组格式
 * @param {Object} objectMap 对象
 * @return {Array<{label,value}>} {label,value}[]
 */
export const transformObjectToSelectOptions = (
  objectMap,
  options = { toNumber: false }
) => {
  const array = []
  const { toNumber } = options
  for (const key in objectMap) {
    array.push({
      label: objectMap[key],
      value: toNumber ? parseFloat(key) : key
    })
  }
  return array
}

/**
 * @description: 判断类型
 * @param {Object} obj
 * @param {*} type ['']
 * @return {Boolean} Boolean
 */
export function typeOf(obj, type) {
  const getType = Function.prototype.call.bind(Object.prototype.toString)
  if (type) {
    return getType(obj) === `[object ${type}]`
  } else {
    return getType(obj)
  }
}

export function download(link, name) {
  if (!name) {
    name = link.slice(link.lastIndexOf('/') + 1)
  }
  let eleLink = document.createElement('a')
  eleLink.download = name
  eleLink.style.display = 'none'
  eleLink.href = link
  eleLink.target = '_blank'
  document.body.appendChild(eleLink)
  eleLink.click()
  document.body.removeChild(eleLink)
}
/**
 * 根据后端返回权限过滤菜单数据
 * @param menuData
 * @param filterMenu
 */
export function filterMenuData(menuData, filterMenu, isAdmin) {
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

// 删除数组中重复的项
export function removeDupList(list) {
  const strings = list.map(item => JSON.stringify(item))
  const removedDupList = [...new Set(strings)] //也可以使用Array.from(new Set(strings))
  return removedDupList.map(item => JSON.parse(item))
}
// 设置元素的单个样式
const reUnit = /width|height|top|left|right|bottom|margin|padding/i
export function setStyle(node, att, val, style) {
  style = style || node.style

  if (style) {
    if (val === null || val === '') {
      // normalize unsetting
      val = ''
    } else if (!isNaN(Number(val)) && reUnit.test(att)) {
      // number values may need a unit
      val += 'px'
    }

    if (att === '') {
      att = 'cssText'
      val = ''
    }

    style[att] = val
  }
}
// 设置元素的多个样式
export function setStyles(el, hash) {
  const HAS_CSSTEXT_FEATURE = typeof el.style.cssText !== 'undefined'
  function trim(str) {
    return str.replace(/^\s+|\s+$/g, '')
  }
  let originStyleText
  const originStyleObj = {}
  if (HAS_CSSTEXT_FEATURE) {
    originStyleText = el.style.cssText
  } else {
    originStyleText = el.getAttribute('style')
  }
  originStyleText.split(';').forEach(item => {
    if (item.indexOf(':') !== -1) {
      const obj = item.split(':')
      originStyleObj[trim(obj[0])] = trim(obj[1])
    }
  })

  const styleObj = {}
  Object.keys(hash).forEach(item => {
    setStyle(el, item, hash[item], styleObj)
  })
  const mergedStyleObj = Object.assign({}, originStyleObj, styleObj)
  const styleText = Object.keys(mergedStyleObj)
    .map(item => item + ': ' + mergedStyleObj[item] + ';')
    .join(' ')

  if (HAS_CSSTEXT_FEATURE) {
    el.style.cssText = styleText
  } else {
    el.setAttribute('style', styleText)
  }
}

// list to Tree
export function constructTree(data, options = {}) {
  const { pidKey = 'pid' } = options
  const tree = []

  // 先进行 pid 找到顶级版块，再进行orderby排序，再进行树转换
  // 顶级版块必然在前
  const sortedData = sortBy(data, ['pid', 'orderby']).map(item => ({
    ...item,
    key: item.id
  }))
  const idMapping = sortedData.reduce((acc, el) => {
    acc[el.id] = el
    return acc
  }, {})

  sortedData.forEach(item => {
    // 判断根节点
    const parent = idMapping[item[pidKey]]
    if (parent) {
      ;(parent.children || (parent.children = [])).push(item)
    } else {
      //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 tree 结果集中，作为顶级
      tree.push(item)
    }
  })

  return tree
}

export function logVersion(info) {
  const infoText = info._versionText || 'no Load'
  const getLabelStyle = (background = '#606060') => {
    return `padding: 4px 5px; border-radius: 2px 0 0 2px; color: #fff; background: ${background}`
  }
  const getValueStyle = (background = '#606060') => {
    return `padding: 4px 5px; border-radius: 0px 2px  2px 0; color: #fff; background: ${background}`
  }
  const { log } = console
  log(
    `%c${'Build'}%c${infoText.replace('Build', '')}`,
    getLabelStyle('#888'),
    getValueStyle('rgb(24,144,255)')
  )
}

// 用于提取字典接口中返回的状态颜色值
export function getDictColor(arr, sts) {
  const stsObj = arr.find(item => item.value === sts)
  const color = stsObj
    ? stsObj.memo.match(/#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/)
    : ''
  return color ? color[0] : ''
}

export function getDictsColor(arr) {
  return arr.map(item => {
    const color = item.memo.match(/#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/)
    return {
      ...item,
      color: color ? color[0] : 'var(--color-fill-3)'
    }
  })
}
