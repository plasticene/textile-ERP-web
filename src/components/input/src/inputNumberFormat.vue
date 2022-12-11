<template>
  <a-input
    v-bind="$attrs"
    :value="number"
    :placeholder="placeholder"
    @change="onChange"
    @input="onInput"
    @pressEnter="onPressEnter"
    @keydown="onKeydown"
  />
</template>

<script>
export default {
  name: 'inputNumberFormat',
  props: {
    placeholder: { type: String, default: '请输入' },
    value: [Number, String],
    defaultValue: [Number, String],
    formatter: {
      type: Function,
      default: () => {}
    },
    parser: {
      type: Function,
      default: () => {}
    }
  },
  model: {
    prop: 'value',
    event: 'change.value'
  },
  data() {
    return {
      number: this.format(this.value || this.defaultValue || '')
    }
  },

  watch: {
    value: {
      handler(val) {
        if (val) {
          this.setNumber(val)
        }
      },
      // 在组件实例创建时会立即调用
      // 强制积极执行回调
      immediate: true
    }
  },

  mounted() {},

  methods: {
    onChange(e) {
      // 限制只有数字
      // 去格式化
      const value = this.parse(e.target.value.replace(/\D/g, ''))

      if (!this.value) {
        this.setNumber(value)
      }
      this.$emit('change', { value, event: e })
      this.$emit('change.value', value)
    },

    onInput(e) {
      const value = e.target.value
      this.$emit('input', e, value.replace(/\D/g, ''))
    },

    onPressEnter(event) {
      this.$emit('pressEnter', {
        event,
        value: event.target.value,
        parseValue: this.parse(event.target.value)
      })
    },

    onKeydown(e) {
      this.$emit('keydown', e)
    },
    format(value) {
      return this.formatter ? this.formatter(value) : value
    },
    parse(value) {
      return this.parser ? this.parser(value) : value
    },

    setNumber(val) {
      this.number = this.format(val || '')
    }
  }
}
</script>
