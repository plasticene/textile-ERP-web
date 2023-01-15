<template>
  <div class="material page-list">
    <div class="material__side">
      <MaterialList ref="leftListRef" />
    </div>
    <div v-if="current?.id" class="material__content">
      <HeaderInfo :item="current" />
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="入库记录">
          <PutInTable :material-id="current.id" />
        </a-tab-pane>
        <a-tab-pane key="2" tab="出库记录">
          <PutInTable :material-id="current.id" />
        </a-tab-pane>
        <a-tab-pane key="3" tab="库存修正记录">
          <PutInTable :material-id="current.id" />
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script name="material" setup>
import HeaderInfo from './components/HeaderInfo'
import MaterialList from './components/MaterialList'
import PutInTable from './components/PutInTable'
const leftListRef = ref(null)
const current = computed(() => {
  console.log(
    '%c Line:29 🍩 leftListRef.value?.current',
    'color:#f5ce50',
    leftListRef.value?.current
  )
  return leftListRef.value?.current
})
</script>
<style lang="less" scoped>
.material {
  display: flex;
  &__side {
    width: 200px;
    height: 100%;
    margin-right: 24px;
  }
  &__content {
    width: calc(100% - 224px);
    :deep(.ant-tabs) {
      height: calc(100% - 77px);
    }
    :deep(.ant-tabs-content) {
      height: calc(100% - 44px);
    }
  }
}
</style>
