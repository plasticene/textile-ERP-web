<template>
  <div class="depDuty page-list">
    <TAdvanceTable
      ref="tableRef"
      row-key="id"
      :scroll="{ y: 'calc(100vh - 320px)' }"
      :columns="columns"
      :load-data-request="getWorkshopPageList"
      v-bind="ListTableConfig"
    >
      <template #header>
        <a-button type="primary" icon="plus" @click="handleAdd">新增</a-button>
      </template>
      <template #filterBar>
        <a-input v-decorator="['duty']" placeholder="请输入职责" />
      </template>
      <div slot="deptList" slot-scope="{ text }">
        <a-tag
          v-for="item in text"
          :key="item.id"
          color="blue"
          no-border
          class="mb-1x"
        >
          {{ item.name }}
        </a-tag>
      </div>
      <div slot="action" slot-scope="{ record }">
        <a class="depDuty__button" @click="handleEdit(record)">修改</a>
        <a-popconfirm
          :title="`确定删除 ${record.duty} 职责？`"
          ok-text="确定"
          cancel-text="取消"
          @confirm="handleDel(record)"
        >
          <a class="depDuty__button depDuty__button--red">删除</a>
        </a-popconfirm>
      </div>
    </TAdvanceTable>
    <DutyFormModal
      :visible="showModal"
      :opt="opt"
      :duty-form="dutyForm"
      @close="handleClose"
    />
  </div>
</template>
<script name="DepDuty" setup>
import { deleteDeptDuty, getWorkshopPageList } from '@/services'
import { ListTableConfig } from '@/utils/constant'

import DutyFormModal from './components/DutyFormModal'
import { useDutyList } from './composition'

const { tableRef, columns, opt, showModal, dutyForm } = useDutyList()
const handleAdd = () => {
  opt.value = 'add'
  showModal.value = true
  console.log('add')
}

const handleEdit = record => {
  opt.value = 'edit'
  showModal.value = true
  dutyForm.id = record.id
  dutyForm.dutyName = record.duty
  dutyForm.dutyDesc = record.memo
}
const initFormData = () => {
  dutyForm.dutyName = ''
  dutyForm.dutyDesc = ''
  dutyForm.id = undefined
}
const handleClose = fresh => {
  showModal.value = false
  initFormData()
  if (fresh) {
    tableRef.value.reload()
  }
}
const handleDel = record => {
  deleteDeptDuty({ id: record.id })
  tableRef.value.reload()
}
</script>
<style lang="less" scoped>
.depDuty {
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
