<template>
  <a-range-picker
    v-bind="$attrs"
    :mode="['month', 'month']"
    :value="_value"
    :disabled-date="disabledDate"
    v-on="$listeners"
    @panelChange="onPanelChange"
    @change="onChange"
  />
</template>

<script name="HMonthRangePicker" setup>
import { isNull } from 'lodash'
import moment from 'moment'

const props = defineProps({
  value: Array
})

const emits = defineEmits(['input', 'change'])

const _value = ref([])

const disabledDate = current => {
  // Can not select days before today and today
  return current && current > moment().endOf('month')
}
const onChange = val => {
  const formatVal = val
  console.log(2222, val)
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
}

watch(
  () => props.value,
  val => {
    // clear 的时候 props.value 是null
    _value.value = !hasPropsValue() || isNull(val) ? [] : val
  },
  { immediate: true }
)

function hasPropsValue() {
  return typeof props.value !== 'undefined'
}
</script>
