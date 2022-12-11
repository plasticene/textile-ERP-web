<template>
  <a-input v-bind="$props" :value="_value" @change="onChange" @blur="onBlur">
    <template v-for="(item, key) in $slots" v-slot:[key]>
      <slot :name="key"></slot>
    </template>
  </a-input>
</template>

<script name="HInputNumber" setup>
import InputProps from 'ant-design-vue/es/input/inputProps'
import { isNaN, isUndefined } from 'lodash'
import numeral from 'numeral'

const props = defineProps({
  ...InputProps
})
const emits = defineEmits(['input'])

const _value = ref('')

const formatValue = val => {
  return numeral(val).format('0,0[.][0000]')
}
const onChange = e => {
  const { value } = e.target

  const reg = /^-?[0-9]*(,[0-9]*)*(\.[0-9]*)?$/
  if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
    if (isUndefined(props.value)) {
      _value.value = formatValue(value)
    }
    const reallyValue = numeral(value).value()
    emits('input', reallyValue)
    emits('change', reallyValue)
  }
}
// '.' at the end or only '-' in the input box.
const onBlur = () => {
  const { value } = _value

  if (value.charAt(value.length - 1) === '.' || value === '-') {
    onChange({ target: { value: value } })
  }
}

watch(
  () => props.value,
  val => {
    if (!isNaN(val)) {
      _value.value = formatValue(val)
    }
  },
  {
    immediate: true
  }
)
</script>
