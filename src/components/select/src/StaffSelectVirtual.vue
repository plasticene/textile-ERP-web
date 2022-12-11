<template>
  <BaseVirtualSelect
    class="staff-search"
    v-bind="$attrs"
    show-search
    :allow-clear="true"
    :mode="multi ? 'multiple' : 'default'"
    :value="form && keyword ? form[keyword] : value"
    :placeholder="placeholder"
    :style="`width: ${width}`"
    :default-active-first-option="false"
    :show-arrow="showArrow"
    :filter-option="false"
    :options="data"
    @search="handleSearch"
    @change="handleChange"
    @focus="onFocus"
  >
    <template #notFoundContent>
      <a-spin v-if="fetching" size="small" />
      <a-empty
        v-else
        :image="simpleImage"
        :description="description"
        :image-style="{ width: '100%' }"
      />
    </template>

    <!-- <a-select-option v-for="d in data" :key="d.value">
      {{ d.text }}
    </a-select-option> -->
  </BaseVirtualSelect>
</template>

<script>
let timeout
let currentValue
import { Empty } from 'ant-design-vue'

import BaseVirtualSelect from './BaseVirtualSelect.vue'
export default {
  name: 'StaffSelect',
  components: { BaseVirtualSelect },
  model: {
    prop: 'value',
    event: 'value:change'
  },
  props: {
    placeholder: {
      type: String,
      default: '请输入姓名或工号'
    },
    width: {
      type: String,
      default: '200px'
    },
    url: {
      type: String,
      default: '/user/getUser'
    },
    multi: {
      type: Boolean,
      default: false
    },
    form: {
      type: Object
    },
    keyword: {
      type: String
    },
    result: {
      type: Array
    },
    value: {
      type: [Array, Number, String]
    },
    method: {
      type: String,
      default: 'get'
    },
    request: {
      type: Function,
      default: () => {},
      required: true
    },
    showArrow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      simpleImage: Empty.PRESENTED_IMAGE_SIMPLE,
      data: [],
      fetching: false,
      isEmpty: false,
      description: ''
      // value: undefined
    }
  },
  watch: {
    result: {
      immediate: true,
      handler(val) {
        if (val) {
          this.data = val.map(v => {
            /**@type {Record<string,any>}  */
            const _v = { ...v }
            if (Object.prototype.hasOwnProperty.call(_v, 'text')) {
              _v.label = _v.text
            }

            return { ..._v }
          })
        }
      }
    }
  },

  methods: {
    handleSearch(value) {
      this.fetching = true
      this.fetch(this.url, value, data => {
        if (!data || data.length == 0) {
          this.isEmpty = true
          this.description = '搜索不到该记录！'
        } else {
          this.isEmpty = false
        }
        this.data = data
      })
    },
    handleChange(value) {
      console.log('staff select change : ', value)
      // 以下会导placeholder失效，先注释
      // const { multi } = this
      // if (value == undefined) {
      //   this.$emit('change', '', {})
      //   this.$emit('value:change', multi ? [] : '')
      //   return
      // }
      // this.value = value
      if (this.form && this.keyword) {
        this.form[this.keyword] = value
      }
      const valueObj = this.data.find(d => d.value == value)
      this.$emit('value:change', value)
      this.$emit('change', value, valueObj)
    },
    fetch(url, value, callback) {
      const { method, request } = this
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      currentValue = value

      const search = () => {
        request(url, method, { viewName: value }).then(res => {
          if (currentValue === value) {
            const result = res.data.content
            const data = []
            result &&
              result.forEach(r => {
                data.push({
                  deptId: r.deptId,
                  phone: r.phone,
                  email: r.email,
                  value: r.id,
                  name: r.viewname,
                  number: r.name,
                  text: `${r.name}/${r.viewname}`,
                  label: `${r.name}/${r.viewname}`
                })
              })
            this.fetching = false

            callback(data)
          }
        })
      }

      timeout = setTimeout(search, 300)
    },
    onFocus() {
      this.description = this.placeholder + '搜索'
    }
  }
}
</script>

<style lang="less" scoped></style>
