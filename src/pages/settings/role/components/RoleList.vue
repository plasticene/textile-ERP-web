<template>
  <div class="role-list">
    <div class="role-list__header">
      <a-input
        v-model="name"
        placeholder="输入关键字搜索"
        class="mr-2x"
        @change="search"
      />
      <a-tooltip>
        <template slot="title">新增岗位</template>
        <a-icon type="plus" @click="handleAction('add')" />
      </a-tooltip>
    </div>
    <div class="role-list__list">
      <div
        v-for="item in roleList"
        :key="item.id"
        class="role-list__item"
        :class="current.id === item.id ? 'role-list__item--selected' : ''"
        @click="handleSelect(item)"
      >
        <span class="role-list__name" :title="item.name">
          {{ item.name }}
        </span>
        <a-dropdown>
          <a-icon type="more" />
          <a-menu slot="overlay">
            <a-menu-item v-for="ele in Actions" :key="ele.key">
              <a href="javascript:;" @click="handleAction(ele.key, item)">
                {{ ele.label }}
              </a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </div>
    <RoleFormModal
      :visible="showModal"
      :opt="opt"
      :form="formData"
      @close="handleClose"
    />
  </div>
</template>
<script name="RoleList" setup>
import { delRole } from '@/services'
import { Actions } from '@/utils/constant'

import { useRoleList } from '../composition'
import RoleFormModal from './RoleFormModal'
const { roleList, name, opt, showModal, formData, current, getList } =
  useRoleList()
const vm = getCurrentInstance().proxy
const emit = defineEmits(['change'])

const search = () => {
  getList()
}

const handleAction = (action, record) => {
  switch (action) {
    case 'add':
      opt.value = 'add'
      showModal.value = true
      break
    case 'edit':
      opt.value = 'edit'
      showModal.value = true
      formData.id = record.id
      formData.name = record.name
      break
    case 'delete':
      vm.$confirm({
        title: `确定删除 ${record.name} ?`,
        content: '删除后，该岗位将不可用。',
        onOk() {
          delRole(record.id).then(() => {
            vm.$message.success('岗位删除成功')
            search()
          })
        }
      })
      break
    default:
      break
  }
}

const handleSelect = item => {
  current.value = item
  emit('change', item.id)
}
const initFormData = () => {
  formData.name = ''
  formData.id = undefined
}
const handleClose = fresh => {
  showModal.value = false
  initFormData()
  if (fresh) {
    search()
  }
}
defineExpose({ current })
</script>
<style lang="less" scoped>
.role-list {
  margin: -22px 0 -22px -22px;
  height: calc(100% + 44px);
  border-right: 1px solid var(--color-border-1);
  &__header {
    display: flex;
    align-items: center;
    padding-right: 8px;
    :deep(.ant-input) {
      border: none;
    }
  }
  &__list {
    height: calc(100% - 32px);
    overflow-y: auto;
  }
  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 28px;
    padding: 4px 8px;
    cursor: pointer;
    &--selected {
      color: var(--primary-color);
      background: var(--primary-1);
    }
  }
  &__name {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
