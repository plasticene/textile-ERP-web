import axios from 'axios'
import Cookie from 'js-cookie'

// 跨域认证信息 header 名
const xsrfHeaderName = 'token'
// const xsrfHeaderName = 'Authorization'

axios.defaults.timeout = 5000
axios.defaults.withCredentials = true
axios.defaults.xsrfHeaderName = xsrfHeaderName
axios.defaults.xsrfCookieName = xsrfHeaderName

// 认证类型
const AUTH_TYPE = {
  BEARER: 'Bearer',
  BASIC: 'basic',
  AUTH1: 'auth1',
  AUTH2: 'auth2'
}

// http method
const METHOD = {
  GET: 'get',
  POST: 'post'
}
let baseURL = process.env.VUE_APP_API_BASE_URL
if (process.env.NODE_ENV === 'development') {
  baseURL = '/dev-server'
  // baseURL = '/test-server'
  if (window.__HCCWP_REQUEST_BASE_URL) {
    baseURL = window.__HCCWP_REQUEST_BASE_URL
  }
  console.info(
    `%c web-components request base URL:\n%c baseURL: ${baseURL},\n__HCCWP_REQUEST_BASE_URL: ${window.__HCCWP_REQUEST_BASE_URL}`,
    'color: rgb(166,69,0);font-Weight:bold',
    'color: rgb(255,125,0);'
  )
}

const service = axios.create({
  baseURL: window.__HCCWP_REQUEST_BASE_URL || baseURL, // api base_url
  timeout: 30000, // 请求超时时间
  withCredentials: true
})
function hccwpRequest(baseUrl) {
  return function request(url, method, params, config) {
    switch (method) {
      case METHOD.GET:
        return service.get(url, { params, ...config, baseURL: baseUrl })
      case METHOD.POST:
        return service.post(url, params, { ...config, baseURL: baseUrl })
      default:
        return service.get(url, { params, ...config, baseURL: baseUrl })
    }
  }
}
/**
 * axios请求
 * @param url 请求地址
 * @param method {METHOD} http method
 * @param params 请求参数
 * @returns {Promise<AxiosResponse<T>>}
 */
async function request(url, method, params, config) {
  switch (method) {
    case METHOD.GET:
      return service.get(url, { params, ...config })
    case METHOD.POST:
      return service.post(url, params, config)
    default:
      return service.get(url, { params, ...config })
  }
}

/**
 * 设置认证信息
 * @param auth {Object}
 * @param authType {AUTH_TYPE} 认证类型，默认：{AUTH_TYPE.BEARER}
 */
function setAuthorization(auth, authType = AUTH_TYPE.BEARER) {
  switch (authType) {
    case AUTH_TYPE.BEARER:
      // Cookie.set(xsrfHeaderName, 'Bearer ' + auth.token, {
      Cookie.set(xsrfHeaderName, auth.token, {
        expires: auth.expireAt
      })
      break
    case AUTH_TYPE.BASIC:
    case AUTH_TYPE.AUTH1:
    case AUTH_TYPE.AUTH2:
    default:
      break
  }
}

/**
 * 移出认证信息
 * @param authType {AUTH_TYPE} 认证类型
 */
function removeAuthorization(authType = AUTH_TYPE.BEARER) {
  switch (authType) {
    case AUTH_TYPE.BEARER:
      Cookie.remove(xsrfHeaderName)
      break
    case AUTH_TYPE.BASIC:
    case AUTH_TYPE.AUTH1:
    case AUTH_TYPE.AUTH2:
    default:
      break
  }
}

/**
 * 检查认证信息
 * @param authType
 * @returns {boolean}
 */
function checkAuthorization(authType = AUTH_TYPE.BEARER) {
  switch (authType) {
    case AUTH_TYPE.BEARER:
      if (Cookie.get(xsrfHeaderName)) {
        return true
      }
      break
    case AUTH_TYPE.BASIC:
    case AUTH_TYPE.AUTH1:
    case AUTH_TYPE.AUTH2:
    default:
      break
  }
  return false
}

/**
 * 加载 axios 拦截器
 * @param interceptors
 * @param options
 */
function loadInterceptors(interceptors, options) {
  const { request, response } = interceptors
  // 加载请求拦截器
  request.forEach(item => {
    let { onFulfilled, onRejected } = item
    if (!onFulfilled || typeof onFulfilled !== 'function') {
      onFulfilled = config => config
    }
    if (!onRejected || typeof onRejected !== 'function') {
      onRejected = error => Promise.reject(error)
    }
    service.interceptors.request.use(
      config => onFulfilled(config, options),
      error => onRejected(error, options)
    )
  })
  // 加载响应拦截器
  response.forEach(item => {
    let { onFulfilled, onRejected } = item
    if (!onFulfilled || typeof onFulfilled !== 'function') {
      onFulfilled = response => response
    }
    if (!onRejected || typeof onRejected !== 'function') {
      onRejected = error => Promise.reject(error)
    }
    service.interceptors.response.use(
      response => onFulfilled(response, options),
      error => onRejected(error, options)
    )
  })
}

/**
 * 解析 url 中的参数
 * @param url
 * @returns {Object}
 */
function parseUrlParams(url) {
  const params = {}
  if (!url || url === '' || typeof url !== 'string') {
    return params
  }
  const paramsStr = url.split('?')[1]
  if (!paramsStr) {
    return params
  }
  const paramsArr = paramsStr.replace(/&|=/g, ' ').split(' ')
  for (let i = 0; i < paramsArr.length / 2; i++) {
    const value = paramsArr[i * 2 + 1]
    params[paramsArr[i * 2]] =
      value === 'true' ? true : value === 'false' ? false : value
  }
  return params
}

export {
  AUTH_TYPE,
  checkAuthorization,
  hccwpRequest,
  loadInterceptors,
  METHOD,
  parseUrlParams,
  removeAuthorization,
  request,
  setAuthorization
}
