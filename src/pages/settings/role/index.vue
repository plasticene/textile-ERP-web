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
        <a-tab-pane key="2" tab="关联员工">Content of Tab Pane 2</a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script name="role" setup>
// import { getWorkshopPageList } from '@/services'

import MenuList from './components/MenuList'
import RoleList from './components/RoleList'
// import { useTable } from './composition'

// const { tableRef, columns,  } = useTable()
const roleListRef = ref(null)
const current = computed(() => {
  return roleListRef.value?.current
})
// const router = useRouter()
// // 跳转到机台列表界面，并过滤车间
// const handleChange = record => {
//   console.log('%c Line:90 🥥 record', 'color:#93c0a4', record)
//   router.push('/machine/list')
// }
</script>
<style lang="less" scoped>
.role {
  display: flex;
  &__side {
    width: 200px;
    height: 100%;
  }
  &__content {
    flex: 1;
  }
}
</style>
