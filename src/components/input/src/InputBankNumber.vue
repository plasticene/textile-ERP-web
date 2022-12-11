<template>
  <div class="input-bank-number">
    <InputNumberFormat
      v-bind="$attrs"
      :value="number"
      :placeholder="placeholder"
      :formatter="formatter"
      :parser="parser"
      v-on="{ ...$listeners, change: onChange }"
    />
    <div v-if="this.bankInfo.bankName" class="card-info">
      {{ this.bankInfo.bankName }} {{ this.bankInfo.cardTypeName }}
    </div>
  </div>
</template>

<script>
import { formatBankNumber } from '@/utils/formatter'

import getBankInfoByCardNo from './bankCard'
import InputNumberFormat from './inputNumberFormat.vue'
export default {
  name: 'InputBankNumber',
  components: { InputNumberFormat },
  props: {
    placeholder: { type: String, default: '请输入银行卡号' },
    value: [Number, String],
    separator: { type: String, default: ' ' },
    defaultValue: [Number, String]
  },
  model: {
    prop: 'value',
    event: 'change.value'
  },
  data() {
    return {
      number: this.formatter(this.value || this.defaultValue || ''),
      bankInfo: getBankInfoByCardNo(this.value || this.defaultValue || '')
    }
  },
  watch: {
    value: {
      handler(val) {
        val && this.setNumber(val)
      },
      // 在组件实例创建时会立即调用,强制积极执行回调
      immediate: true
    }
  },
  methods: {
    onChange({ value, event }) {
      // 限制只有数字
      // 去格式化
      if (!this.value) {
        this.setNumber(value.toString())
      } else {
        this.setBankInfo(value)
      }
      this.$emit('change', { value, event, bankInfo: this.bankInfo })
      this.$emit('change.value', value)
    },

    formatter(value) {
      return formatBankNumber(value, this.separator)
    },
    parser(value) {
      return value.replaceAll(this.separator, '')
    },
    setNumber(val) {
      this.number = this.formatter(val || '')
      this.setBankInfo(val)
    },
    setBankInfo(val) {
      this.bankInfo = val.length > 8 ? getBankInfoByCardNo(val) : {}
    }
  }
}
</script>

<style lang="less" scoped>
.card-info {
  opacity: 0.5;
  font-size: 12px;
  padding: 4px;
}
</style>
