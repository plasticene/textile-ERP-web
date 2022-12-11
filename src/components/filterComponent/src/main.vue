<template>
  <a-form class="filter-component" layout="inline" :form="form">
    <a-form-item
      v-for="(_slot, index) in slotsShow"
      :key="_slot.tag + '-' + index"
    >
      <RenderVNode class="mw-200" :v="_slot" />
    </a-form-item>

    <a-form-item
      v-for="(_slot, index) in slotsHidden"
      v-show="showMore"
      :key="_slot.tag + '-' + index + '-hidden-group'"
    >
      <RenderVNode class="mw-200" :v="_slot" />
    </a-form-item>

    <a-form-item v-if="slotsHidden.length > 0">
      <a-button type="link" @click="handleToggle">
        {{ !showMore ? '更多' : '收起' }}
      </a-button>
    </a-form-item>
    <a-form-item>
      <a-button class="mr-2x" @click="handleReset">重置</a-button>
      <a-button type="primary" ghost @click="handleSubmit">
        <a-icon type="search" />
        查询
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { drop, take } from 'lodash'
import { v4 as uuid } from 'uuid'

function VNodeRender(h, ctx) {
  //添加静态class
  if (ctx.data.staticClass) {
    if (ctx.props.v.data) {
      if (!ctx.props.v.data.class) {
        ctx.props.v.data.class = {}
      }
      ctx.props.v.data.class[ctx.data.staticClass] = true
    }
  }

  return ctx.props.v
}

export default {
  name: 'FilterComponent',
  components: {
    RenderVNode: {
      functional: true,
      render: VNodeRender
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    formName: { type: String, default: 'filter-component-' + uuid() },
    value: { type: Object, default: () => ({}) },
    foldSize: { type: Number, default: 3 }
  },
  data() {
    return {
      form: this.$form.createForm(this, {
        name: this.formName,
        onValuesChange: (props, values) => {
          this.$emit('change', values)
        }
      }),
      showMore: false
    }
  },
  computed: {
    slots({ $slots }) {
      console.log('$slots', $slots)
      return $slots.default.filter(slot => {
        return slot.tag
      })
    },
    slotsShow({ slots, foldSize }) {
      if (!foldSize) {
        return slots
      }
      return take(slots, this.foldSize)
    },
    slotsHidden({ slots, foldSize }) {
      if (!foldSize) {
        return []
      }
      return drop(slots, this.foldSize)
    }
  },
  mounted() {
    this.$emit('mounted', this.form)
  },
  methods: {
    handleReset() {
      this.form.resetFields()
      const v = this.form.getFieldsValue()
      this.$emit('reset')
      this.$emit('change', v)
      this.$emit('submit', v)
    },
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.$emit('submit', values)
        }
      })
    },
    handleToggle() {
      this.showMore = !this.showMore
    }
  }
}
</script>
<style lang="less">
.filter-component {
  .mw-200 {
    min-width: 200px;
  }
}
</style>
