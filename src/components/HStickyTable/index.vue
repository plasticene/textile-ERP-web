<template>
  <div
    class="vc-sticky-table-wrapper"
    :class="{ 'is-sticky': isSticky, 'has-pagination': isSticky && pagination }"
    :style="{
      '--header-top': stickyValue.headerTop,
      '--scroll-bar-bottom': stickyValue.scrollBarBottom,
      '--pagination-bottom': stickyValue.paginationBottom
    }"
  >
    <!-- FIXME: sticky 的时候 scroll  不传 默认是 x：max-content -->
    <a-table
      ref="tableRef"
      class="vc-sticky-table"
      :class="{ 'is-sticky-table': isSticky }"
      v-bind="{ ...$attrs, ...omit($props, ['sticky', 'scrollBarBottom']) }"
      :scroll="{
        x: 'min-content',
        ...$props.scroll,
        ...(isSticky ? { y: 'max-content' } : {})
      }"
      :expanded-row-keys="expandedRowKeys"
      v-on="$listeners"
      @expandedRowsChange="expandedRowsChange"
    >
      <template
        v-for="columns in slotColumns"
        v-slot:[columns.scopedSlots.customRender]="text, record, index"
      >
        <slot
          :name="columns.scopedSlots.customRender"
          :record="record"
          :text="text"
          :index="index"
        ></slot>
      </template>
    </a-table>
    <div
      v-if="showScrollBar"
      class="scroll-footer-wrapper"
      :style="{ bottom: stickyValue.scrollBarBottom }"
    >
      <div
        ref="scrollRef"
        class="scroll-footer"
        @mouseenter="onScrollMouseover"
        @mouseleave="onScrollMouseleave"
        @scroll.passive="onCustomScroll"
      >
        <i :style="{ width: scrollWidth + 'px' }"></i>
      </div>
    </div>
  </div>
</template>
<script name="HStickyTable" setup>
import T from 'ant-design-vue/es/table/Table'
import { isObject, omit } from 'lodash'

import { useTableScroll } from './useTableScroll'

const props = defineProps({
  ...T.props,
  columns: Array,
  sticky: [Boolean, Object],
  scrollBarBottom: { type: String, default: '0px' }
})
const emits = defineEmits(['update:expandedRowKeys', 'expandedRowsChange'])

const defaultStickyValue = {
  headerTop: 0,
  scrollBarBottom: props.scrollBarBottom,
  paginationBottom: '0px'
}
const {
  scrollRef,
  tableRef,
  showScrollBar,
  scrollWidth,
  onCustomScroll,
  onScrollMouseover,
  onScrollMouseleave
} = useTableScroll(props)

const slotColumns = computed(() => {
  return props.columns.filter(col => col.scopedSlots?.customRender)
})

const expandedRowsChange = expandedRowKeys => {
  emits('update:expandedRowKeys', expandedRowKeys)
  emits('expandedRowsChange', expandedRowKeys)
}

const isSticky = computed(() => {
  return !!props.sticky
})
const stickyValue = computed(() => {
  return {
    ...defaultStickyValue,
    ...(isObject(props.sticky) ? props.sticky : {})
  }
})

defineExpose({ tableRef: tableRef.value })
</script>
<style lang="less" src="./index.less"></style>
