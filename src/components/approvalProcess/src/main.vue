<template>
  <div class="approval-process">
    <SectionTitle v-if="title" :title="title" />
    <StandardTable
      row-key="taskId"
      :scroll="{ x: true }"
      :columns="columns"
      :data-source="dataSource"
      :pagination="pagination"
      size="small"
      @change="onChange"
    >
      <template slot="dept" slot-scope="{ text }">
        {{ $store.state.account.deptList[text] }}
      </template>
    </StandardTable>
  </div>
</template>

<script>
import SectionTitle from '@/components/sectionTitle'
import StandardTable from '@/components/table/StandardTable'

import { columns } from './config'
export default {
  name: 'approvalProcess',
  components: {
    SectionTitle,
    StandardTable
  },
  props: {
    title: String,
    dataSource: Array
  },
  data() {
    this.columns = columns
    return {
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
        hideOnSinglePage: true,
        showQuickJumper: true
      }
    }
  },
  mounted() {},
  methods: {
    handleClick(record) {
      const path = record.url ? record.url : 'borrow'
      this.$router.push('/workbench/approval/' + path + '/' + record.id)
    },
    getTableData() {
      // eslint-disable-next-line no-unused-vars
      let param = {
        page: this.pagination.current,
        limit: this.pagination.pageSize
      }
    },

    // eslint-disable-next-line no-unused-vars
    onChange(pagination, filters, sorter, { currentDataSource }) {
      this.pagination.total = pagination.total
      this.pagination.current = pagination.current
      this.pagination.pageSize = pagination.pageSize
      this.getTableData()
    }
  }
}
</script>
<style lang="less" scoped>
:deep (.ant-table-body) {
  overflow-x: auto !important;
}
</style>
