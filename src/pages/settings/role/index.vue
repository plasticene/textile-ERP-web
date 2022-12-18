<template>
  <div class="role page-list">
    <div class="role__side">
      <RoleList ref="roleListRef" />
    </div>
    <div class="role__content">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="功能权限">
          <MenuList :role-id="current?.id" />
        </a-tab-pane>
        <a-tab-pane key="2" tab="关联员工">
          <StaffTable :role-id="current?.id" />
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script name="role" setup>
// import { getWorkshopPageList } from '@/services'

import MenuList from './components/MenuList'
import RoleList from './components/RoleList'
import StaffTable from './components/StaffTable'
const roleListRef = ref(null)
const current = computed(() => {
  return roleListRef.value?.current
})
</script>
<style lang="less" scoped>
.role {
  display: flex;
  &__side {
    width: 200px;
    height: 100%;
    margin-right: 24px;
  }
  &__content {
    flex: 1;
  }
}
</style>
