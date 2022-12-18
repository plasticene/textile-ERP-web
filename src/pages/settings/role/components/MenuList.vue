<template>
  <div class="menu-list">
    <a-tree
      v-if="menuList.length"
      v-model="checkedKeys"
      checkable
      default-expand-all
      :tree-data="menuList"
      :replace-fields="{
        children: 'nodeList',
        title: 'name',
        key: 'id'
      }"
      @check="onchecked"
    />
  </div>
</template>
<script name="MenuList" setup>
import { saveRoleMenu } from '@/services'

import { useMenuList } from '../composition'
const props = defineProps({
  roleId: {
    type: Number
  }
})
const { roleId } = toRefs(props)
const { checkedKeys, menuList } = useMenuList(roleId)
// const vm = getCurrentInstance().proxy

const onchecked = checkedKeys => {
  console.log('%c Line:31 🍫 checkedKeys', 'color:#42b983', checkedKeys)
  saveRoleMenu({
    menuIds: checkedKeys,
    roleId: roleId.value
  })
}
</script>
<style lang="less" scoped>
.menu-list {
  height: 100%;
  margin-left: 24px;
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
