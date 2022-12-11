<template>
  <div class="h-textarea">
    <a-textarea
      ref="textarea"
      v-bind="{ ...$props, ...$attrs }"
      :value="state"
      @input="onInput"
      @blur="onBlur"
    />
    <div v-if="maxLength" class="max-length">
      {{ value?.length || 0 }}/{{ maxLength }}
    </div>
  </div>
</template>

<script name="HTextarea" setup>
import inputProps from 'ant-design-vue/es/input/inputProps'
import { isUndefined } from 'lodash'
const props = defineProps({
  ...inputProps,
  value: String,
  autoSize: [Object, Boolean]
})

const emit = defineEmits(['input', 'change', 'blur'])
const state = ref('')
const textarea = ref(null)
const onInput = event => {
  const value = event.target.value
  if (isUndefined(props.value)) {
    state.value = value
  } else {
    emit('input', value)
  }
  emit('change', event)
}

const onBlur = () => {
  emit('blur', state.value)
}
watch(
  () => props.value,
  val => {
    // clear 的时候 props.value 是null
    if (!isUndefined(props.value)) {
      state.value = val
      emit('change', { target: { value: val } })
    }
  },
  { immediate: true }
)

defineExpose({
  focus() {
    textarea.value.focus()
  }
})
</script>

<style lang="less" scoped>
.h-textarea {
  position: relative;
  .max-length {
    position: absolute;
    right: 12px;
    bottom: 2px;
    opacity: 0.5;
    font-size: 12px;
    pointer-events: none;
  }
}
</style>
