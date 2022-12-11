<template>
  <a-date-picker
    v-bind="$attrs"
    mode="year"
    value-format="YYYY"
    format="YYYY"
    :value="`${_value}`"
    :open="isOpen"
    v-on="$listeners"
    @panelChange="onPanelChange"
    @openChange="openChange"
    @change="onChange"
  />
</template>

<script name="HYearPicker" setup>
import { isNull } from 'lodash'

const props = defineProps({
  value: [String, Number]
})

const emits = defineEmits(['input', 'change'])
const isOpen = ref(false)

const _value = ref('')

const onChange = val => {
  const formatVal = val ? val.format('YYYY') : ''
  // 如果props value 不存在
  // 为了完全受控
  if (!hasPropsValue()) {
    _value.value = formatVal
  }
  emits('input', formatVal)
  emits('change', formatVal)
}

const onPanelChange = momentVal => {
  onChange(momentVal)
  isOpen.value = false
}

const openChange = status => {
  isOpen.value = status
}

watch(
  () => props.value,
  val => {
    // clear 的时候 props.value 是null
    _value.value = !hasPropsValue() || isNull(val) ? '' : val
  },
  { immediate: true }
)

function hasPropsValue() {
  return typeof props.value !== 'undefined'
}
</script>
