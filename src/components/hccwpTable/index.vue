<template>
  <StandardTable
    v-bind="$attrs"
    :scroll="scroll"
    :pagination="showPagination ? pagination : false"
    :data-source="dataSource"
    :columns="columns"
    :loading="loading"
    @change="onChange"
  >
    <template
      v-for="columns in slotColumns"
      v-slot:[columns.scopedSlots.customRender]="{ record, text }"
    >
      <slot
        :name="columns.scopedSlots.customRender"
        :record="record"
        :text="text"
      ></slot>
    </template>
    <template #status="{ record, text }">
      <RecordState
        :text="text"
        :process="record.processInstanceName"
        :color="renderStsColor(record[stsKey])"
      />
    </template>
  </StandardTable>
</template>

<script>
import { get, isEqual } from 'lodash'

import RecordState from '@/components/recordState'
import StandardTable from '@/components/table/StandardTable'
const isDev = process.env.NODE_ENV === 'development'

const defaultPaginationKey = {
  page: 'page',
  pageSize: 'pageSize'
}
export default {
  name: 'HccwpTable',
  components: { RecordState, StandardTable },
  props: {
    columns: { type: Array, default: () => [] },
    // dataSource: { type: Array, default: () => [] },
    total: { type: Number },
    loadDataRequest: { type: Function, default: () => new Promise() },
    filter: { type: Object, default: () => ({}) },
    stsColor: { type: Object, default: () => ({}) },
    scroll: { type: Object, default: () => ({ x: 'mix-content' }) },
    showPagination: { type: Boolean, default: true },
    initialLoad: { type: Boolean, default: true },
    stsKey: { type: String, default: 'sts' },
    responsePath: { type: String, default: 'data.content.records' },
    responseTotalPath: { type: String, default: 'data.content.total' },
    paginationKey: {
      type: Object,
      default: () => defaultPaginationKey
    }
  },
  data() {
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
      pageAction: ''
    }
  },
  computed: {
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
        this.pagination.current = 1
        isDev && console.log('filter change do request')
        this.getTableData()
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
        this.loadDataRequest({
          [this.pageKey.pageSize]: pageSize,
          [this.pageKey.page]: current,
          ...this.filter
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
      this.$emit('change', pagination)
    },
    renderStsColor(sts) {
      return this.stsColor[sts] || '#f5f5f5'
    },
    reload() {
      return this.getTableData()
    }
  }
}
</script>
