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
        <a class="customer__button" @click="addTitle(record)">新增抬头</a>
        <a
          class="customer__button customer__button--red"
          @click="handleDel(record)"
        >
          删除
        </a>
      </div>
      <template slot="expandedRowRender" slot-scope="{ record }">
        <a-table
          :columns="deliveryColumns"
          :data-source="record.shipTitles"
          :pagination="false"
        >
          <div slot="action" slot-scope="text, record">
            <a
              class="customer__button"
              @click="handleTitleEdit(record, 'delivery')"
            >
              编辑
            </a>
            <a
              class="customer__button customer__button--red"
              @click="handleTitleDel(record, 'delivery')"
            >
              删除
            </a>
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
            <a
              class="customer__button"
              @click="handleTitleEdit(record, 'invoice')"
            >
              编辑
            </a>
            <a
              class="customer__button customer__button--red"
              @click="handleTitleDel(record, 'invoice')"
            >
              删除
            </a>
          </div>
        </a-table>
      </template>
    </StandardTable>
    <CusFormModal
      :visible="showModal"
      :opt="opt"
      :form="formData"
      @close="handleClose"
    />
    <TitleFormModal
      :visible="showTitleModal"
      :opt="opt"
      :cus-id="currentCusId"
      :form="titleForm"
      @close="handleClose"
    />
  </div>
</template>
<script name="customer" setup>
import StandardTable from '@/components/table/StandardTable'
import { delCustomer, delDeliveryTitle, delInvoiceTitle } from '@/services'

import CusFormModal from './components/CusFormModal'
import TitleFormModal from './components/TitleFormModal'
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
  showTitleModal,
  currentCusId,
  formData,
  titleForm,
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
}

const handleEdit = record => {
  opt.value = 'edit'
  showModal.value = true
  formData.id = record.id
  formData.name = record.name
  formData.address = record.address
  formData.remark = record.remark
}
const initFormData = () => {
  formData.name = ''
  formData.address = ''
  formData.remark = ''
  formData.id = undefined
  titleForm.value = {}
}
const handleClose = fresh => {
  showModal.value = false
  showTitleModal.value = false
  initFormData()
  if (fresh) {
    getTableData()
  }
}
const handleDel = record => {
  vm.$confirm({
    title: '确定删除该客户吗？',
    content: '删除后，新建订单时将选不到该客户。',
    onOk() {
      delCustomer(record.id).then(() => {
        vm.$message.success('客户删除成功')
        getTableData()
      })
    },
    onCancel() {}
  })
}
const handleTitleDel = (record, type) => {
  vm.$confirm({
    title: '确定删除该抬头吗？',
    content: '删除后，新建订单时将选不到该抬头。',
    onOk() {
      type === 'invoice'
        ? delInvoiceTitle(record.id).then(() => {
            vm.$message.success('开票抬头删除成功')
            getTableData()
          })
        : delDeliveryTitle(record.id).then(() => {
            vm.$message.success('发货抬头删除成功')
            getTableData()
          })
    },
    onCancel() {}
  })
}
const addTitle = record => {
  opt.value = 'add'
  currentCusId.value = record.id
  showTitleModal.value = true
  titleForm.value = {}
}
const handleTitleEdit = (record, type) => {
  opt.value = 'edit'
  showTitleModal.value = true
  titleForm.value = record
  titleForm.value.titleType = type
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
