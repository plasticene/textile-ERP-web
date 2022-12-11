<template>
  <div class="with-copy-btn">
    <slot></slot>
    <a-button
      v-show="value"
      type="link"
      shape="circle"
      icon="copy"
      @click="handleClick"
    />
  </div>
</template>

<script>
import clipboard from 'clipboardy'
import { isArray, isObject } from 'lodash'

export default {
  name: 'WithCopyBtn',
  components: {},
  props: {
    value: {
      type: [String, Number, Object, Array]
    }
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    handleClick() {
      if (!this.value) {
        this.$message.info('数据不存在')

        return
      }
      let value = this.value
      if (isArray(this.value)) {
        value = this.value.toString()
      }
      if (isObject(this.value)) {
        value = JSON.stringify(this.value)
      }

      clipboard.write(value).then(() => {
        this.$message.success('复制成功')
      })
    }
  }
}
</script>
<style lang="less" scoped></style>
