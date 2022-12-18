<template>
  <advance-table
    v-bind="{
      ...$attrs,
      ...omit($props, [
        'loadDataRequest',
        'stsColor',
        'responsePath',
        'stsKey',
        'responsePath',
        'responseTotalPath',
        'paginationKey',
        'filterProps',
        'defaultFilterValue',
        'initialLoad',
        'showPagination',
        'transformParams'
      ])
    }"
    :scroll="scroll"
    :pagination="showPagination ? pagination : false"
    :data-source="dataSource"
    :columns="columns"
    :loading="loading"
    v-on="$listeners"
    @change="onChange"
    @refresh="onRefresh"
    @reset="onReset"
    @selectedRowChange="updateSelect"
  >
    <template
      v-for="columns in slotColumns"
      v-slot:[columns.scopedSlots.customRender]="{ record, text, index }"
    >
      <slot
        :name="columns.scopedSlots.customRender"
        :record="record"
        :text="text"
        :index="index"
      ></slot>
    </template>

    <template v-for="slot in slots" v-slot:[slot]>
      <!-- <slot :name="slot"></slot> -->
      <SlotRender :key="slot" :slot-node="$slots[slot]" />
    </template>

    <template v-if="$slots.filterBar" #filterBarSlot>
      <FilterJSX
        v-bind="filterProps"
        v-model="filter"
        @submit="handleFilterSubmit"
      >
        <!-- <SlotRender :slot-node="$slots.filterBar" /> -->
        <slot name="filterBar"></slot>
      </FilterJSX>
    </template>

    <template #status="{ record, text }">
      <RecordState
        :text="text"
        :process="record.processInstanceName"
        :color="renderStsColor(record[stsKey])"
      />
    </template>
  </advance-table>
</template>

<script>
import T from 'ant-design-vue/es/table/Table'
// import StandardTable from '@/components/table/StandardTable'
import { get, isEqual, omit } from 'lodash'

import { FilterJSX } from '@/components/filterComponent'
import RecordState from '@/components/recordState'
import SlotRender from '@/components/slotRender'
import AdvanceTable from '@/components/table/advance/TAdvanceTable'
const isDev = process.env.NODE_ENV === 'development'

const defaultPaginationKey = {
  page: 'pageNo',
  pageSize: 'pageSize'
}
export default {
  name: 'TextileAdvanceTable',
  components: { RecordState, AdvanceTable, FilterJSX, SlotRender },
  props: {
    ...omit(T.props, ['loading', 'dataSource', 'pagination']),
    columns: { type: Array, default: () => [] },
    // dataSource: { type: Array, default: () => [] },
    total: { type: Number },
    loadDataRequest: { type: Function, default: () => new Promise() },
    // filter: { type: Object, default: () => ({}) },
    stsColor: { type: Object, default: () => ({}) },
    scroll: { type: Object, default: () => ({ x: 'min-content' }) },
    showPagination: { type: Boolean, default: true },
    initialLoad: { type: Boolean, default: true },
    stsKey: { type: String, default: 'sts' },
    responsePath: { type: String, default: 'data.list' },
    responseTotalPath: { type: String, default: 'data.total' },
    paginationKey: {
      type: Object,
      default: () => defaultPaginationKey
    },
    filterProps: {
      type: Object,
      default: () => ({})
    },
    collapseFilter: Boolean,
    defaultFilterValue: {
      type: Object,
      default: () => ({})
    },
    transformParams: {
      type: Function
    }
  },
  data() {
    this.omit = omit

    return {
      pagination: {
        current: 1,
        pageSize: 10,
        total: 1,
        'show-size-changer': true,
        'show-quick-jumper': true,
        showTotal: total => `共 ${total} 条`
      },
      dataSource: [],
      loading: true,
      pageAction: '',
      filter: {
        ...this.defaultFilterValue
      }
    }
  },
  computed: {
    slots() {
      return Object.keys(this.$slots).filter(slot => slot !== 'filterBar')
    },
    slotColumns({ columns }) {
      return columns
        .filter(col => col.scopedSlots?.customRender)
        .filter(col => col.scopedSlots.customRender !== 'status')
      // .map(col => col.scopedSlots.customRender)
    },
    doRequest({ pageAction }) {
      return ['created', 'activated'].includes(pageAction)
    }
  },
  watch: {
    filter: {
      handler(value, oldValue) {
        if (isEqual(value, oldValue)) return
        // this.pagination.current = 1
        // isDev && console.log('filter change do request')
        // this.getTableData()
      },
      deep: true
    },
    doRequest: function (newValue) {
      if (newValue && this.initialLoad) {
        isDev && console.log('doRequest change do request')
        this.getTableData()
      }
    }
  },

  created() {
    this.pageAction = 'created'
  },
  activated() {
    isDev && console.log('activated')
    this.pageAction = 'activated'
  },
  deactivated() {
    isDev && console.log('un activated')
    this.pageAction = 'deactivated'
  },
  methods: {
    getTableData() {
      const { pageSize, current } = this.pagination
      this.loading = true
      this.pageKey = {
        ...defaultPaginationKey,
        ...this.paginationKey
      }

      return new Promise(resolve => {
        const filterParam = this.transformParams
          ? this.transformParams(this.filter)
          : this.filter
        this.loadDataRequest({
          [this.pageKey.pageSize]: pageSize,
          [this.pageKey.page]: current,
          ...filterParam
        })
          .then(res => {
            // console.log(res)

            this.dataSource = get(res, this.responsePath, [])
            this.pagination.total = get(res, this.responseTotalPath, 1)
            resolve(res)
          })
          .finally(() => {
            this.loading = false
          })
      })
    },
    // eslint-disable-next-line no-unused-vars
    onChange(pagination, filters, sorter, { currentDataSource }) {
      this.pagination.current = pagination.current
      this.pagination.pageSize = pagination.pageSize
      this.pagination.total = pagination.total
      this.getTableData()
      this.$emit('change', pagination, filters, sorter, { currentDataSource })
    },
    updateSelect(selectedRowKeys, selectedRows) {
      this.$emit('selectedRowChange', selectedRowKeys, selectedRows)
    },
    renderStsColor(sts) {
      return this.stsColor[sts] || '#f5f5f5'
    },
    reload() {
      return this.getTableData()
    },
    onRefresh() {
      this.getTableData(this.filter)
    },
    onReset() {
      this.getTableData(this.filter)
    },
    handleFilterSubmit() {
      // this.filter = formData
      this.pagination.current = 1
      isDev && console.log('filter change do request')
      this.getTableData()
    }
  }
}
</script>
