<template>
  <div class="workshop page-list">
    <TAdvanceTable
      ref="tableRef"
      row-key="id"
      :scroll="{ y: 'calc(100vh - 276px)' }"
      :columns="columns"
      :load-data-request="getWorkshopPageList"
      v-bind="ListTableConfig"
    >
      <template #header>
        <a-button type="primary" @click="handleAdd">新增车间</a-button>
      </template>
      <!-- <template #filterBar>
        <a-input v-decorator="['name']" placeholder="请输入职责" />
      </template> -->
      <div slot="machineCount" slot-scope="{ text, record }">
        <a @click="viewMachineList(record)">{{ text ?? 0 }}</a>
      </div>
      <div slot="action" slot-scope="{ record }">
        <a class="workshop__button" @click="handleEdit(record)">编辑</a>
        <a-popconfirm
          v-if="!record.machineCount"
          :title="`确定删除 ${record.name} 车间？`"
          ok-text="确定"
          cancel-text="取消"
          @confirm="handleDel(record)"
        >
          <a class="workshop__button workshop__button--red">删除</a>
        </a-popconfirm>
        <a-tooltip v-else>
          <template slot="title">该车间已关联机台，不可删除</template>
          <a-button type="link" disabled>删除</a-button>
        </a-tooltip>
      </div>
    </TAdvanceTable>
    <WorkshopFormModal
      :visible="showModal"
      :opt="opt"
      :form="formData"
      @close="handleClose"
    />
  </div>
</template>
<script name="workshop" setup>
import { delWorkshop, getWorkshopPageList } from '@/services'
import { ListTableConfig } from '@/utils/constant'

import WorkshopFormModal from './components/WorkshopFormModal'
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
.workshop {
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
