<template>
  <BaseCard :title="title">
    <Descriptions :options="options" :vertical="vertical" :gutter="gutter">
      <template
        v-for="op in hasSlots"
        #[op.scopedSlots.customRender]="{ record }"
      >
        <slot :name="op.scopedSlots.customRender" :record="record"></slot>
      </template>
    </Descriptions>
  </BaseCard>
</template>

<script>
import Descriptions from '@/components/descriptions'

import BaseCard from './BaseCard.vue'

export default {
  name: 'HBaseCardInfo',
  components: {
    BaseCard,
    Descriptions
  },
  props: {
    options: { type: Array, default: () => [] },
    title: String,
    vertical: { type: Boolean, default: true },
    gutter: { type: Array, default: () => [24, 24] }
  },
  computed: {
    hasSlots({ options }) {
      return options.filter(op => !!op.scopedSlots)
    }
  }
}
</script>
