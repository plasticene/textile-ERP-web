import { debounce, get } from 'lodash'

/**
 * 接口返回包装
 * @template C
 * @typedef {Object} Data
 * @property {C} content
 */

/**
 * xhr 返回包装
 * @template C
 * @typedef {Object} Response
 * @property {Data<C>} data
 */

/**
 * 接口返回包装
 * @template R
 * @typedef {Promise<Response<R>>} ReturnValue
 */

/**
 * 定义vue Ref类型
 * @template T
 * @typedef {import('vue').Ref<T>} Ref
 */

/**
 * 定义 Promise 类型
 * @template T
 * @typedef {Promise<T>} PromiseWrap
 */

/**
 * 定义返回为 Promise 函数的类型
 * @template T
 * @typedef {(args: any[]) => Promise<T>} PromiseType
 */

/**
 * 解包 返回为 Promise 的 函数的返回结果
 * @template T
 * @typedef {ReturnType<T> extends PromiseWrap<infer U> ? U : T extends (...args: any) => infer R ? R : never} UnPromisify
 */

/**
 * 解包 xhr data 包装
 * @template T
 * @typedef {T extends Response<infer U>?U:T } UnWrapData
 */

/**
 * @template T
 * @typedef {object} OptionType
 * @property {object} [params] 静态参数
 * @property {()=>object} [getParams] 利用函数的方法，获取最新的 params 参数
 * @property {*} [defaultData] 初始值，防止对象或者数组在页面初始化的时出现错误
 * @property {boolean|Ref<boolean>} [immediate] 是否立即执行请求
 * @property {(ReturnType<T>)=>void} [onResponse] 请求后完成后的回调
 * @property {()=>any} [beforeToRef] 在包装成ref之前的处理喊出，return 的值将会成为 data 的值
 * @property {Object} [debounceOptions] 防抖函数的配置
 */

/**
 * @template T
 * @typedef {object} RequestReturn
 * @property {Ref<Boolean>} isFetching 请求状态
 * @property {Ref<Boolean>} isFinished 利请求是否结束
 * @property {(params:Parameters<T>[0])=>ReturnType<T>} execute 请求执行函数
 * @property {Ref<UnWrapData<UnPromisify<T>>>} data 请求返回值
 * @property {Ref<T>} requestRef 经过Ref包装的请求体，为了可以修改请求体
 */

/**
 * @description: 请求hook
 * @template T
 * @param {T} request 发起请求的 axios 实例
 * @param {OptionType<T>} [options={}] 配置项
 * @return {RequestReturn<T>} { isFetching, isFinished, execute, data }
 */
function useRequest(request, options = {}) {
  const {
    params,
    // 利用函数的方法，获取最新的 params 参数
    getParams,
    // 初始值
    defaultData,
    // 是否立即请求
    immediate = true,
    // 请求回调
    onResponse,
    beforeToRef
  } = options
  const isFetching = ref(false)
  const isFinished = ref(true)
  const requestRef = isRef(request) ? request : ref(request)
  const data = ref(defaultData || {})
  const debounceOptions = {
    ...{ leading: false, maxWait: undefined, trailing: true },
    ...(options.debounceOptions || {})
  }

  /**
   * @description:
   * @type {RequestReturn<RequestType>['execute']} executeParams
   */
  const execute = executeParams => {
    isFinished.value = true
    isFetching.value = true

    return new Promise((resolve, reject) => {
      requestRef
        .value(executeParams ? executeParams : getParams ? getParams() : params)
        .then(res => {
          const content = get(res, 'data.content', defaultData)
          const beforeToRefContent = beforeToRef ? beforeToRef(content) : false
          data.value = beforeToRefContent ? beforeToRefContent : content

          onResponse && onResponse(data.value)
          resolve(data.value)
        })
        .finally(() => {
          isFetching.value = false
          isFinished.value = false
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  const debounceExecute = debounceOptions.maxWait
    ? debounce(execute, debounceOptions.maxWait, {
        leading: debounceOptions.leading,
        trailing: debounceOptions.trailing
      })
    : execute

  const unRefImmediate = unref(immediate)
  if (unRefImmediate) {
    debounceExecute()
  }

  if (isRef(immediate)) {
    watch(immediate, v => {
      if (v) {
        debounceExecute()
      }
    })
  }

  return { isFetching, isFinished, execute: debounceExecute, data, requestRef }
}

export { useRequest }
