// 401拦截
const resp401 = {
  /**
   * 响应数据之前做点什么
   * @param response 响应对象
   * @param options 应用配置 包含: {router, i18n, store, message}
   * @returns {*}
   */
  onFulfilled(response, options) {
    console.log(199990, response)
    const { message } = options
    if (response.data.code === 401) {
      message.error('请先登陆')
      const loginURL = '/#/login'
      window.location = `${loginURL}?redirectUrl=${encodeURIComponent(
        window.location.href
      )}`
    }
    return response
  },
  /**
   * 响应出错时执行
   * @param error 错误对象
   * @param options 应用配置 包含: {router, i18n, store, message}
   * @returns {Promise<never>}
   */
  onRejected(error, options) {
    const { message } = options
    const { response } = error
    console.log(19999, response)
    if (response.status === 401) {
      message.error('请先登陆')
      const loginURL = '/#/login'
      window.location = `${loginURL}?redirectUrl=${encodeURIComponent(
        window.location.href
      )}`
    }
    return Promise.reject(error)
  }
}
// 500拦截
const resp500 = {
  /**
   * 响应数据之前做点什么
   * @param response 响应对象
   * @param options 应用配置 包含: {router, i18n, store, message}
   * @returns {*}
   */
  onFulfilled(response, options) {
    const { message } = options
    if (response.data.code === 500) {
      message.error('无此权限')
    }
    return response
  },
  /**
   * 响应出错时执行
   * @param error 错误对象
   * @param options 应用配置 包含: {router, i18n, store, message}
   * @returns {Promise<never>}
   */
  onRejected(error, options) {
    const { message } = options
    const { response } = error
    console.log(error)
    if (response.status === 500) {
      message.error({
        content: response.message,
        key: 'error-500'
      })
    }
    return Promise.reject(error)
  }
}

const resp403 = {
  onFulfilled(response, options) {
    const { message } = options
    if (response.data.code === 403) {
      message.error('请求被拒绝')
    }
    return response
  },
  onRejected(error, options) {
    const { message } = options
    const { response } = error
    if (response.status === 403) {
      message.error('请求被拒绝')
    }
    return Promise.reject(error)
  }
}

const reqCommon = {
  /**
   * 发送请求之前做些什么
   * @param config axios config
   * @param options 应用配置 包含: {router, i18n, store, message}
   * @returns {*}
   */
  onFulfilled(config) {
    return config
  },
  /**
   * 请求出错时做点什么
   * @param error 错误对象
   * @param options 应用配置 包含: {router, i18n, store, message}
   * @returns {Promise<never>}
   */
  onRejected(error, options) {
    const { message } = options
    message.error(error.message)
    return Promise.reject(error)
  }
}

const resCode = {
  onRejected(error, options) {
    const { message } = options
    message.error(error.response.data.msg)
    return Promise.reject(error)
  },
  onFulfilled(response, options) {
    const { message } = options
    if (!response) {
      return
    }
    console.log('%c Line:129 🍋 response', 'color:#ed9ec7', response)
    if (response.data.code !== 200 && response.data.code !== 401) {
      message.error({
        content: response.data.msg,
        key: response.data.code
      })

      return Promise.reject(response)
    } else {
      return response.data
    }
  }
}

export default {
  request: [reqCommon], // 请求拦截
  response: [resp500, resp401, resp403, resCode] // 响应拦截
}
