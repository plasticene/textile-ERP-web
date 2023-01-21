<template>
  <div class="machine-list page-list">
    <FilterItems @change="getListData" />
    <span class="machine-list__summary">
      总数：100台 未开机：2台 运行中：98台 停机：0台 开机率：98%
    </span>
    <div class="flex mt-6x">
      <a-button class="machine-list__btn" type="primary" @click="handleAdd">
        添加机台
      </a-button>
      <a-button class="machine-list__btn" @click="handleAdd">批量换布</a-button>
      <a-button class="machine-list__btn" @click="handleAdd">批量编辑</a-button>
      <a-button class="machine-list__btn" @click="handleAdd">
        批量添加机台
      </a-button>
    </div>
    <div class="machine-list__content">
      <div v-for="item in list" :key="item.id" class="machine-list__card">
        <ItemCard v-model="item.checked" :info="item" />
      </div>
      <div v-for="e in new Array(10)" :key="e" class="machine-list__card"></div>
    </div>
    <!-- <FactoryFormModal
      :visible="showModal"
      :opt="opt"
      :form="formData"
      @close="handleClose"
    /> -->
  </div>
</template>
<script name="machine-list" setup>
// import { delFactory } from '@/services'

// import FactoryFormModal from './components/FactoryFormModal'
import FilterItems from './components/FilterItems'
import ItemCard from './components/ItemCard'
import { useList } from './composition'

const { opt, showModal, list, getListData } = useList()
console.log('%c Line:39 🥚 list', 'color:#6ec1c2', list)
// const vm = getCurrentInstance().proxy
const handleAdd = () => {
  opt.value = 'add'
  showModal.value = true
  console.log('add')
}

// const handleEdit = record => {
//   opt.value = 'edit'
//   showModal.value = true
//   formData.id = record.id
//   formData.name = record.name
//   formData.contactName = record.contactName
//   formData.contactNumber = record.contactNumber
//   formData.address = record.address
//   formData.remark = record.remark
// }
// const initFormData = () => {
//   formData.name = ''
//   formData.contactName = ''
//   formData.contactNumber = ''
//   formData.address = ''
//   formData.remark = ''
//   formData.id = undefined
// }
// const handleClose = fresh => {
//   showModal.value = false
//   initFormData()
//   if (fresh) {
//     tableRef.value.reload()
//   }
// }
// const handleDel = record => {
//   vm.$confirm({
//     title: '确定删除该代工厂吗？',
//     content: '删除后，该代工厂将不会在原料的入库订单中被选择。',
//     onOk() {
//       delFactory(record.id).then(() => {
//         vm.$message.success('代工厂删除成功')
//         tableRef.value.reload()
//       })
//     },
//     onCancel() {}
//   })
// }
</script>
<style lang="less" scoped>
.machine-list {
  &__summary {
    color: rgba(250, 53, 53, 0.65);
  }
  &__btn + &__btn {
    margin-left: 16px;
  }
  &__content {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -6px;
  }
  &__card {
    flex: 1;
    max-width: 320px;
    min-width: 240px;
    margin: 12px 6px 0 6px;
  }
}
</style>
