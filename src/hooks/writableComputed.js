import { isEmpty } from 'lodash'

const writableComputed = (depValue, defaultValue = '') => {
  const cache = ref(defaultValue)

  if (!isRef(depValue)) {
    throw new Error(`depValue is need be Ref`)
  }
  // isObject
  // isArray
  // isString

  return computed({
    get: () => {
      return isEmpty(cache.value) ? depValue : cache.value
    },

    set: val => {
      cache.value = val
    }
  })
}

export { writableComputed }
