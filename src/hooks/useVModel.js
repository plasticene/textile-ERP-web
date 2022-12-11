// import { Ref, ref, getCurrentInstance } from 'vue';

import kebabCase from 'lodash/kebabCase'
/**
 * 定义vue Ref类型
 * @template T
 * @typedef {import('vue').Ref<T>} Ref
 */

/**
 * onCHange
 * @template T
 * @template P
 * @typedef {(value: T, ...args: P) => void} ChangeHandler
 */

/**
 * 定义vuf类型e Re
 * @template T
 * @typedef {Object} UseVModelParams
 * @property {Ref<T>} value props中toRefs后的value
 * @property {string} [eventName] 自定义事件
 * @property {string} [propName] 自动移propsName
 */

/**
 * 定义vuf类型e Re
 * @template T
 * @typedef {Object} Options
 * @property {Ref<T>} value props中toRefs后的value
 * @property {T} defaultValue 默认值
 * @property {ChangeHandler<T, P>} onChange 自定义onChange
 * @property {string} eventName 自定义事件
 * @property {string} propName 自动移propsName
 * @property {UseVModelParams<T>[]} [alias] // 除了 value + onChange，还支持其他同含义字段和事件
 */

// value: Ref<T>,
// defaultValue: T,
// onChange: ChangeHandler<T, P>,
// eventName = 'change',
// propName = 'value',
// // 除了 value + onChange，还支持其他同含义字段和事件
// alias: UseVModelParams<T>[] = [],

/**
 * @description:
 * @template T
 * @param {Options<T>} options
 * @return {[Ref<T>,(newValue:T)=>void]}
 */
function useVModel(options) {
  const {
    value,
    defaultValue,
    onChange,
    eventName = 'change',
    propName = 'value',
    alias = []
  } = options

  const vm = getCurrentInstance().proxy

  const internalValue = ref()
  internalValue.value = defaultValue

  const isControlled =
    Object.prototype.hasOwnProperty.call(
      vm.$options.propsData || {},
      propName
    ) ||
    Object.prototype.hasOwnProperty.call(
      vm.$options.propsData || {},
      kebabCase(propName)
    )

  // 受控模式

  if (isControlled) {
    return [
      value,
      (newValue, ...args) => {
        // input 事件为 v-model 语法糖
        console.log('useVModel v-model 受控', newValue)
        vm.$emit?.('input', newValue, ...args)
        onChange?.(newValue, ...args)
        if (eventName && eventName !== 'input') {
          vm.$emit?.(eventName, newValue, ...args)
        }
      }
    ]
  }

  // controlled, other fields, upload.files.etc.

  for (let i = 0, len = alias.length; i < len; i++) {
    const item = alias[i]
    if (
      Object.prototype.hasOwnProperty.call(
        vm.$options.propsData || {},
        item.propName
      )
    ) {
      return [
        item.value,
        (newValue, ...args) => {
          // .sync support
          console.log('useVModel .sync support 受控', newValue)
          vm.$emit?.(`update:${item.propName}`, newValue, ...args)
          onChange?.(newValue, ...args)
          if (item.eventName && item.eventName !== 'input') {
            vm.$emit?.(item.eventName, newValue, ...args)
          }
        }
      ]
    }
  }

  // 非受控模式

  return [
    internalValue,
    (newValue, ...args) => {
      internalValue.value = newValue
      console.log('useVModel 非受控', newValue)
      onChange?.(newValue, ...args)
      if (eventName && eventName !== 'input') {
        vm.$emit?.(eventName, newValue, ...args)
      }
    }
  ]
}
export { useVModel }

export default useVModel
