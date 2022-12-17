<template>
  <div :id="id" ref="table" class="advanced-table">
    <a-spin :spinning="loading">
      <div
        :class="['header-bar', size]"
        :style="{
          paddingTop: $slots.filterBarSlot && !collapseFilter ? '8px' : 0
        }"
      >
        <div class="title">
          <template v-if="title">{{ title }}</template>
          <SlotRender :slot-node="$slots.header" />
        </div>
        <SlotRender
          v-if="!collapseFilter && $slots.filterBarSlot"
          class="table-filter-text"
          :slot-node="$slots.filterBarSlot"
        />

        <div class="actions">
          <a-tooltip v-if="$slots.filterBarSlot && collapseFilter" title="查询">
            <div
              class="action-wrap"
              :class="{ 'is-active': collapseActive }"
              @click="toggleFilerBar"
            >
              <a-icon class="action" type="filter" />
            </div>
          </a-tooltip>
          <a-tooltip title="刷新">
            <div class="action-wrap">
              <a-icon
                class="action"
                :type="loading ? 'loading' : 'reload'"
                @click="refresh"
              />
            </div>
          </a-tooltip>
          <action-size v-model="sSize" />

          <action-columns :columns="columns" @reset="onColumnsReset" />

          <a-tooltip title="全屏">
            <div class="action-wrap">
              <a-icon
                class="action"
                :type="fullScreen ? 'fullscreen-exit' : 'fullscreen'"
                @click="toggleScreen"
              />
            </div>
          </a-tooltip>
        </div>
      </div>
      <a-collapse
        v-if="collapseFilter && $slots.filterBarSlot"
        class="custom-collapse"
        :active-key="collapseActive"
      >
        <a-collapse-panel key="filter-bar">
          <SlotRender class="filter-bar" :slot-node="$slots.filterBarSlot" />
        </a-collapse-panel>
      </a-collapse>

      <SelectAlert
        class="mb-2x"
        :show-info="showInfo"
        :selected-rows="selectedRows"
        @selectedRowChange="updateSelect"
        @onClear="onSelectClear"
      />

      <HStickyTable
        v-bind="{
          ...$attrs,
          ...omit($props, [
            'showInfo',
            'checkboxProps',
            'collapseFilter',
            'rowSelection'
          ]),
          columns: visibleColumns,
          title: undefined,
          loading: false
        }"
        :size="sSize"
        :row-selection="rowSelection"
        @expandedRowsChange="onExpandedRowsChange"
        @change="onChange"
        @expand="onExpand"
      >
        <template
          v-for="slot in scopedSlots"
          :slot="slot"
          slot-scope="{ text, record, index }"
        >
          <slot :name="slot" v-bind="{ text, record, index }"></slot>
        </template>
        <template>
          <SlotRender
            v-for="slot in slots"
            :slot="slot"
            :key="slot"
            :slot-node="$slots[slot]"
          />
        </template>
        <template
          :slot="$scopedSlots.expandedRowRender ? 'expandedRowRender' : ''"
          slot-scope="record, index, indent, expanded"
        >
          <slot
            v-bind="{ record, index, indent, expanded }"
            :name="$scopedSlots.expandedRowRender ? 'expandedRowRender' : ''"
          ></slot>
        </template>
      </HStickyTable>
    </a-spin>
  </div>
</template>

<script>
import T from 'ant-design-vue/es/table/Table'
import { omit } from 'lodash'

import HStickyTable from '@/components/HStickyTable/index.vue'
import SlotRender from '@/components/slotRender'
import ActionColumns from '@/components/table/advance/ActionColumns'
import ActionSize from '@/components/table/advance/ActionSize'

import { fullScreen, selectAlert } from './mixin'
import SelectAlert from './SelectAlert'

export default {
  name: 'TAdvanceTable',
  components: {
    ActionColumns,
    ActionSize,
    SelectAlert,
    SlotRender,
    HStickyTable
  },
  mixins: [selectAlert, fullScreen],
  props: {
    ...T.props,
    childrenColumnName: { type: String, default: 'children' },
    columns: Array,
    loading: Boolean,
    locale: Object,
    pagination: [Object, Boolean],
    size: String,
    title: String,
    formatConditions: Boolean,
    collapseFilter: Boolean,
    rowKey: [String, Function],
    dataSource: { type: Array, default: () => [] },
    scroll: Object
  },
  provide() {
    return {
      table: this
    }
  },
  data() {
    this.omit = omit
    return {
      id: `${new Date().getTime()}-${Math.floor(Math.random() * 10)}`,
      sSize: this.size || 'default',
      conditions: {},
      collapseActive: ''
    }
  },

  computed: {
    slots() {
      return Object.keys(this.$slots).filter(
        slot =>
          !(slot === 'title' || slot === 'header' || slot === 'filterBarSlot')
      )
    },
    scopedSlots() {
      return Object.keys(this.$scopedSlots).filter(
        slot =>
          slot !== 'expandedRowRender' &&
          slot !== 'title' &&
          slot !== 'filterBarSlot' &&
          slot !== 'header'
      )
    },
    visibleColumns() {
      return this.columns.filter(col => col.visible)
    }
  },

  methods: {
    refresh() {
      this.$emit('refresh', this.conditions)
    },
    onSearchChange(conditions, searchOptions) {
      this.conditions = conditions
      this.$emit('search', conditions, searchOptions)
    },

    onColumnsReset(conditions) {
      this.$emit('reset', conditions)
    },
    onExpandedRowsChange(expandedRows) {
      this.$emit('expandedRowsChange', expandedRows)
    },
    onChange(pagination, filters, sorter, options) {
      this.$emit('change', pagination, filters, sorter, options)
    },
    onExpand(expanded, record) {
      this.$emit('expand', expanded, record)
    },

    toggleFilerBar() {
      if (this.collapseActive) {
        this.collapseActive = ''
      } else {
        this.collapseActive = 'filter-bar'
      }
    }
  }
}
</script>

<style scoped lang="less" src="./index.less"></style>
