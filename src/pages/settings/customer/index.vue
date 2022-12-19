<template>
  <div class="customer page-list">
    <a-button class="mb-4x" type="primary" size="small" @click="handleAdd">
      新增客户
    </a-button>
    <StandardTable
      ref="tableRef"
      row-key="id"
      :scroll="{ y: 'calc(100vh - 276px)' }"
      :columns="columns"
      :data-source="tableData"
      :pagination="pagination"
      @change="onChange"
    >
      <div slot="action" slot-scope="{ record }">
        <a class="customer__button" @click="handleEdit(record)">编辑</a>
        <a-popconfirm
          v-if="!record.machineCount"
          :title="`确定删除 ${record.name} 车间？`"
          ok-text="确定"
          cancel-text="取消"
          @confirm="handleDel(record)"
        >
          <a class="customer__button customer__button--red">删除</a>
        </a-popconfirm>
        <a-tooltip v-else>
          <template slot="title">该车间已关联机台，不可删除</template>
          <a-button type="link" disabled>删除</a-button>
        </a-tooltip>
      </div>
      <template slot="expandedRowRender" slot-scope="{ record }">
        <a-table
          :columns="deliveryColumns"
          :data-source="record.shipTitles"
          :pagination="false"
        >
          <div slot="action" slot-scope="text, record">
            <a class="customer__button" @click="handleEdit(record)">编辑</a>
            <a-popconfirm
              v-if="!record.machineCount"
              :title="`确定删除 ${record.name} 车间？`"
              ok-text="确定"
              cancel-text="取消"
              @confirm="handleDel(record)"
            >
              <a class="customer__button customer__button--red">删除</a>
            </a-popconfirm>
            <a-tooltip v-else>
              <template slot="title">该车间已关联机台，不可删除</template>
              <a-button type="link" disabled>删除</a-button>
            </a-tooltip>
          </div>
        </a-table>
        <a-table
          :columns="invoiceColumns"
          :data-source="record.invoiceTitles"
          :pagination="false"
        >
          <div slot="address" slot-scope="text, record">
            <span>{{ text }}</span>
            <br />
            <span>{{ record.phoneNumber }}</span>
          </div>
          <div slot="bankAccount" slot-scope="text, record">
            <span>{{ record.bank }}</span>
            <br />
            <span>{{ text }}</span>
          </div>
          <div slot="action" slot-scope="text, record">
            <a class="customer__button" @click="handleEdit(record)">编辑</a>
            <a-popconfirm
              v-if="!record.machineCount"
              :title="`确定删除 ${record.name} 车间？`"
              ok-text="确定"
              cancel-text="取消"
              @confirm="handleDel(record)"
            >
              <a class="customer__button customer__button--red">删除</a>
            </a-popconfirm>
            <a-tooltip v-else>
              <template slot="title">该车间已关联机台，不可删除</template>
              <a-button type="link" disabled>删除</a-button>
            </a-tooltip>
          </div>
        </a-table>
      </template>
    </StandardTable>
    <WorkshopFormModal
      :visible="showModal"
      :opt="opt"
      :form="formData"
      @close="handleClose"
    />
  </div>
</template>
<script name="customer" setup>
import StandardTable from '@/components/table/StandardTable'
import { delWorkshop, getCustomerPageList } from '@/services'
import { ListTableConfig } from '@/utils/constant'

import WorkshopFormModal from './components/WorkshopFormModal'
import { useTable } from './composition'

const {
  tableRef,
  columns,
  deliveryColumns,
  invoiceColumns,
  tableData,
  pagination,
  opt,
  showModal,
  formData,
  getTableData
} = useTable()
const vm = getCurrentInstance().proxy
const onChange = pagination => {
  pagination.value.total = pagination.total
  pagination.value.current = pagination.current
  pagination.value.pageSize = pagination.pageSize
  getTableData()
}
const handleAdd = () => {
  opt.value = 'add'
  showModal.value = true
  console.log('add')
}

const handleEdit = record => {
  opt.value = 'edit'
  showModal.value = true
  formData.id = record.id
  formData.name = record.name
  formData.location = record.location
  formData.remark = record.remark
}
const initFormData = () => {
  formData.name = ''
  formData.location = ''
  formData.remark = ''
  formData.id = undefined
}
const handleClose = fresh => {
  showModal.value = false
  initFormData()
  if (fresh) {
    tableRef.value.reload()
  }
}
const handleDel = record => {
  delWorkshop(record.id).then(() => {
    vm.$message.success('车间删除成功')
    tableRef.value.reload()
  })
}
const router = useRouter()
// 跳转到机台列表界面，并过滤车间
const viewMachineList = record => {
  console.log('%c Line:90 🥥 record', 'color:#93c0a4', record)
  router.push('/machine/list')
}
</script>
<style lang="less" scoped>
.customer {
  &__button + &__button {
    margin-left: 16px;
  }
  &__button {
    &--red {
      color: var(--danger-color);
    }
  }
}
</style>
