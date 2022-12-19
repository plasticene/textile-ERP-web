<template>
  <div class="staff page-list">
    <TAdvanceTable
      ref="tableRef"
      row-key="id"
      :scroll="{ y: 'calc(100vh - 276px)' }"
      :columns="columns"
      :load-data-request="getStaffPageList"
      :transform-params="transformParams"
      v-bind="ListTableConfig"
    >
      <template #header>
        <a-button type="primary" size="small" @click="handleAdd">
          新增员工
        </a-button>
        <div class="staff__filter">
          <a-select
            v-model="filterForm.status"
            size="small"
            class="mr-4x"
            style="width: 120px"
            :options="STAFF_STATUS"
            @change="handleSearch"
          />
          <a-select
            v-model="filterForm.roleId"
            size="small"
            class="mr-4x"
            style="width: 120px"
            placeholder="岗位"
            allow-clear
            @change="handleSearch"
          >
            <a-select-option v-for="item in roleList" :key="item.id">
              {{ item.name }}
            </a-select-option>
          </a-select>
          <a-input
            v-model="filterForm.keyword"
            size="small"
            style="width: 200px"
            placeholder="员工姓名/手机号码"
            @change="handleSearch"
          >
            <a-icon slot="suffix" type="search" />
          </a-input>
        </div>
      </template>
      <div slot="gender" slot-scope="{ text }">
        <span>{{ GENDER.find(e => e.value === text)?.label }}</span>
      </div>
      <div slot="staffStatus" slot-scope="{ text }">
        <span>{{ STAFF_STATUS.find(e => e.value === text)?.label }}</span>
      </div>
      <div slot="roleList" slot-scope="{ record }">
        <span>{{ record.roleList.map(e => e.name).join(',') }}</span>
      </div>
      <div slot="name" slot-scope="{ text, record }">
        <a @click="handleEdit(record, 'view')">{{ text ?? 0 }}</a>
      </div>
      <div slot="action" slot-scope="{ record }">
        <a class="staff__button" @click="handleEdit(record)">编辑</a>
        <a class="staff__button staff__button--red" @click="handleDel(record)">
          删除
        </a>
        <!-- <a-tooltip v-else>
          <template slot="title">系统管理员，不可删除</template>
          <a-button type="link" disabled>删除</a-button>
        </a-tooltip> -->
      </div>
    </TAdvanceTable>
    <StaffFormModal
      :visible="showModal"
      :opt="opt"
      :form="formData"
      @close="handleClose"
    />
  </div>
</template>
<script name="staff" setup>
import { useRoleList } from '@/pages/settings/role//composition'
import { delStaff, getStaffPageList } from '@/services'
import { GENDER, ListTableConfig, STAFF_STATUS } from '@/utils/constant'

import StaffFormModal from './components/StaffFormModal'
import { useTable } from './composition'

const { tableRef, columns, opt, showModal, formData } = useTable()
const { roleList } = useRoleList()
const vm = getCurrentInstance().proxy
const filterForm = ref({
  status: 0,
  keyword: '',
  roleId: null
})
const transformParams = filter => {
  filter.status = filterForm.value.status
  filter.keyword = filterForm.value.keyword
  filter.roleId = filterForm.value.roleId
  return filter
}
const handleSearch = () => {
  tableRef.value.reload()
}
const handleAdd = () => {
  opt.value = 'add'
  showModal.value = true
  console.log('add')
}

const handleEdit = (record, type) => {
  opt.value = type ?? 'edit'
  showModal.value = true
  formData.id = record.id
  formData.name = record.name
  formData.password = record.password
  formData.remark = record.remark
  formData.address = record.address
  formData.entryTime = record.entryTime
  formData.gender = record.gender
  formData.mobile = record.mobile
  formData.status = record.status
  formData.roleList = record.roleList
}
const initFormData = () => {
  formData.id = undefined
  formData.address = ''
  formData.entryTime = ''
  formData.gender = 0
  formData.mobile = ''
  formData.name = ''
  formData.password = ''
  formData.remark = ''
  formData.roleIds = []
  formData.status = 0
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
    title: `确定删除该员工吗？`,
    content: `删除后，该员工将不能登录该系统，使用功能。`,
    onOk() {
      delStaff(record.id).then(() => {
        vm.$message.success('员工删除成功')
        tableRef.value.reload()
      })
    }
  })
}
</script>
<style lang="less" scoped>
.staff {
  &__filter {
    display: inline-block;
    position: absolute;
    right: 0;
  }
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
