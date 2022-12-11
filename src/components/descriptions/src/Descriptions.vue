<template>
  <a-row type="flex" :gutter="gutter">
    <template v-for="(op, index) in options">
      <a-col
        v-if="op.type !== 'description-line'"
        :key="op.label + '-' + index"
        :span="op.span || span"
      >
        <description-item
          :label="op.label"
          :vertical="!isUndefined(op.vertical) ? op.vertical : vertical"
        >
          <template #value>
            <slot
              v-if="op.scopedSlots && op.scopedSlots.customRender"
              :name="op.scopedSlots.customRender"
              :record="op"
              :text="op.value"
            ></slot>
            <template v-else>
              {{ op.customRender ? op.customRender(op.value, op) : op.value }}
            </template>
          </template>
        </description-item>
      </a-col>

      <div
        v-else
        :key="op.label + '-description-line-' + index"
        class="description-line"
        :style="`width:calc(100% - ${24}px )`"
      ></div>
    </template>
  </a-row>
</template>

<script>
import { isUndefined } from 'lodash'

import DescriptionItem from './DescriptionItem.vue'

export default {
  name: 'Descriptions',
  components: { DescriptionItem },
  props: {
    options: {
      type: Array,
      default: () => []
    },
    span: {
      type: Number,
      default: 6
    },
    gutter: {
      type: [Number, Object, Array],
      default: () => [12, 12]
    },
    vertical: { type: Boolean }
  },
  data() {
    this.isUndefined = isUndefined
    return {}
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
.description-line {
  display: block;
  border-bottom: 1px solid var(--color-border-1);
  height: 1px;
  width: 100%;
  margin: 0 auto;
}
</style>
