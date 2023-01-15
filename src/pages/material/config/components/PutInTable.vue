<template>
  <div class="mate-table">
    <TAdvanceTable
      ref="tableRef"
      row-key="id"
      :scroll="{ y: 'calc(100vh - 276px)' }"
      :columns="columnsPutIn"
      :load-data-request="getMaterialStockList"
      :transform-params="transformParams"
      v-bind="DetailListTableConfig"
    >
      <template #header>
        <a-button type="primary" @click="handleAdd">手动入库</a-button>
      </template>
      <div slot="taxRate" slot-scope="{ text }">
        <span>{{ text === 0 ? '否' : `是 (${taxRate})` }}</span>
      </div>
      <div slot="action" slot-scope="{ record }">
        <a class="workshop__button" @click="handleDel(record.id)">撤销</a>
      </div>
    </TAdvanceTable>
    <StaffFormModal
      :visible="showModal"
      :material-id="materialId"
      @close="handleClose"
    />
  </div>
</template>
<script name="PutInTable" setup>
import { delMaterial, getMaterialStockList } from '@/services'
import { DetailListTableConfig } from '@/utils/constant'

import { useTable } from '../composition'
import StaffFormModal from './StaffFormModal'
const props = defineProps({
  materialId: {
    type: Number
  }
})
const { materialId } = toRefs(props)
const { tableRef, columnsPutIn, showModal } = useTable(materialId)
const vm = getCurrentInstance().proxy
watch(
  () => materialId.value,
  () => {
    tableRef.value.reload()
  }
)
const transformParams = filter => {
  filter.materialId = materialId.value
  filter.type = 0
  return filter
}

const handleAdd = () => {
  showModal.value = true
  console.log('add')
}

const handleClose = fresh => {
  showModal.value = false
  if (fresh) {
    tableRef.value.reload()
  }
}
const handleDel = id => {
  vm.$confirm({
    title: `确定撤销所选入库记录?`,
    onOk() {
      delMaterial(id).then(() => {
        vm.$message.success('入库记录移除成功')
        tableRef.value.reload()
      })
    }
  })
}
</script>
<style lang="less" scoped>
.mate-table {
  height: 100%;
  overflow-y: auto;
}
</style>
