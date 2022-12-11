<template>
  <a-input
    v-model="value"
    v-version
    allow-clear
    :max-length="50"
    :addon-before="prefix"
  />
</template>

<script>
export default {
  name: 'VersionInput',
  model: {
    prop: 'version',
    event: 'change'
  },
  props: {
    version: {
      type: String
    },
    prefix: {
      type: String,
      default: 'V'
    },
    oldVersion: {
      type: String
    }
  },
  directives: {
    version: {
      // 只能输入xx(.xx)*n格式的版本号
      inserted: function (el, binding, vnode) {
        const input = el.getElementsByTagName('input')[0]
        input.onkeyup = function () {
          input.value = input.value.replace(/[^(\d.)]|\.(?=\.)/g, '')
          vnode.context.value = input.value
          vnode.context.handleChange()
        }
        input.onblur = function () {
          input.value = input.value
            .replace(/[^(\d.)]|\.(?=\.)/g, '')
            .replace(/[^(\d.)]|\.(?=$)/g, '')
          // Safari 不支持 (?<=exp) 这种断言
          // .replace(/[^(\d.)]|\.(?=\.)|\.(?<=$)/g, '')
          vnode.context.value = input.value
          vnode.context.handleChange()
          if (vnode.context.oldVersion && !vnode.context.compareVersion()) {
            vnode.context.$message.error('新版本号必须大于等于当前版本号')
          }
        }
      }
    }
  },
  data() {
    return {
      value: undefined
    }
  },
  watch: {
    version: {
      handler(val) {
        if (this.prefix) {
          this.value = val && val.replace(new RegExp(`${this.prefix}`, 'g'), '')
        } else {
          this.value = val
        }
      },
      immediate: true
    }
  },
  created() {},
  methods: {
    handleChange() {
      this.$emit('change', `${this.prefix}${this.value}`)
    },
    compareVersion() {
      if (this.oldVersion) {
        const oldVersionArr = this.prefix
          ? this.oldVersion
              .replace(new RegExp(`${this.prefix}`, 'g'), '')
              .split('.')
          : this.oldVersion.split('.')
        const newVersionArr = this.value.split('.')
        const oldVersion = oldVersionArr.map(item => {
          return Number(item)
        })
        const newVersion = newVersionArr.map(item => {
          return Number(item)
        })
        if (oldVersion === newVersion) {
          return false
        }
        for (let i = 0, l = newVersion.length; i < l; i++) {
          if (oldVersion[i] === undefined) {
            oldVersion[i] = 0
          }
          if (oldVersion[i] > newVersion[i]) {
            return false
          } else if (oldVersion[i] === newVersion[i]) {
            continue
          } else {
            return true
          }
        }
      }
    }
  }
}
</script>
<style lang="less" scoped></style>
