<template>
  <div class="page-list">
    <TAdvanceTable
      ref="tableRef"
      row-key="id"
      :scroll="{ y: 'calc(100vh - 276px)' }"
      :columns="columns"
      :selected-rows="selectedRow"
      :load-data-request="getRoleStaffPageList"
      :transform-params="transformParams"
      v-bind="ListTableConfig"
      @selectedRowChange="onSelectChange"
    >
      <template #header>
        <a-button type="primary" size="small" @click="handleAdd">
          添加员工
        </a-button>
        <a-button
          class="ml-4x"
          size="small"
          :disabled="!selectedRowKeys.length"
          @click="handleDel(selectedRowKeys)"
        >
          批量移除
        </a-button>
      </template>
      <div slot="machineCount" slot-scope="{ text, record }">
        <a @click="viewMachineList(record)">{{ text ?? 0 }}</a>
      </div>
      <div slot="action" slot-scope="{ record }">
        <a class="workshop__button" @click="handleDel([record.id])">移除</a>
      </div>
    </TAdvanceTable>
    <StaffFormModal
      :visible="showModal"
      :role-id="roleId"
      :staff-list="staffList"
      @close="handleClose"
    />
  </div>
</template>
<script name="StaffTable" setup>
import { delRoleStaff, getRoleStaffPageList } from '@/services'
import { ListTableConfig } from '@/utils/constant'

import { useStaffTable } from '../composition'
import StaffFormModal from './StaffFormModal'
const props = defineProps({
  roleId: {
    type: Number
  }
})
const { roleId } = toRefs(props)
const {
  tableRef,
  columns,
  showModal,
  staffList,
  selectedRowKeys,
  getStaffList
} = useStaffTable(roleId)
const vm = getCurrentInstance().proxy
const selectedRow = ref([])
const transformParams = filter => {
  filter.roleId = roleId.value
  return filter
}
const onSelectChange = (keys, selectedRows) => {
  console.log('%c Line:62 🍭 selectedRows', 'color:#465975', keys)
  selectedRow.value = selectedRows
  selectedRowKeys.value = keys
}

const handleAdd = () => {
  showModal.value = true
  console.log('add')
}

const handleClose = fresh => {
  showModal.value = false
  if (fresh) {
    tableRef.value.reload()
    getStaffList(roleId.value)
  }
}
const handleDel = ids => {
  vm.$confirm({
    title: `确定移除所选员工?`,
    onOk() {
      delRoleStaff({
        roleId: roleId.value,
        userIds: ids
      }).then(() => {
        vm.$message.success('员工移除成功')
        tableRef.value.reload()
        selectedRow.value = []
        getStaffList(roleId.value)
      })
    }
  })
}
</script>
