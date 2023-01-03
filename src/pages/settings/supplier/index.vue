<template>
  <div class="supplier page-list">
    <TAdvanceTable
      ref="tableRef"
      row-key="id"
      :scroll="{ y: 'calc(100vh - 276px)' }"
      :columns="columns"
      :load-data-request="getSupplierPageList"
      v-bind="ListTableConfig"
    >
      <template #header>
        <a-button type="primary" size="small" @click="handleAdd">
          新增供应商
        </a-button>
      </template>
      <!-- <template #filterBar>
        <a-input v-decorator="['name']" placeholder="请输入职责" />
      </template> -->
      <div slot="machineCount" slot-scope="{ text, record }">
        <a @click="viewMachineList(record)">{{ text ?? 0 }}</a>
      </div>
      <div slot="action" slot-scope="{ record }">
        <a class="supplier__button" @click="handleEdit(record)">编辑</a>
        <!-- <a-popconfirm
          v-if="!record.machineCount"
          :title="`确定删除 ${record.name} 供应商？`"
          ok-text="确定"
          cancel-text="取消"
          @confirm="handleDel(record)"
        > -->
        <a
          class="supplier__button supplier__button--red"
          @click="handleDel(record)"
        >
          删除
        </a>
        <!-- </a-popconfirm>
        <a-tooltip v-else>
          <template slot="title">该车间已关联机台，不可删除</template>
          <a-button type="link" disabled>删除</a-button>
        </a-tooltip> -->
      </div>
    </TAdvanceTable>
    <SupplierFormModal
      :visible="showModal"
      :opt="opt"
      :form="formData"
      @close="handleClose"
    />
  </div>
</template>
<script name="supplier" setup>
import { delSupplier, getSupplierPageList } from '@/services'
import { ListTableConfig } from '@/utils/constant'

import SupplierFormModal from './components/SupplierFormModal'
import { useTable } from './composition'

const { tableRef, columns, opt, showModal, formData } = useTable()
const vm = getCurrentInstance().proxy
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
  formData.contactName = record.contactName
  formData.contactNumber = record.contactNumber
  formData.address = record.address
  formData.remark = record.remark
}
const initFormData = () => {
  formData.name = ''
  formData.contactName = ''
  formData.contactNumber = ''
  formData.address = ''
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
  vm.$confirm({
    title: '确定删除该供应商吗？',
    content: '删除后，该供应商将不会在原料的进货订单中被选择。',
    onOk() {
      delSupplier(record.id).then(() => {
        vm.$message.success('供应商删除成功')
        tableRef.value.reload()
      })
    },
    onCancel() {}
  })
}
</script>
<style lang="less" scoped>
.supplier {
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
