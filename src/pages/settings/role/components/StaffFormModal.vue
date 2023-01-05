<template>
  <div class="form">
    <a-modal
      :visible="visible"
      title="添加员工"
      row-key="id"
      @ok="handleOk"
      @cancel="handleCancel(false)"
    >
      <a-form-model
        ref="formRef"
        :model="formData"
        :rules="rules"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 20 }"
      >
        <a-form-model-item label="选择员工" prop="userIds">
          <a-select
            v-model="formData.userIds"
            mode="multiple"
            option-filter-prop="children"
            style="width: 200px"
            :filter-option="filterOption"
          >
            <a-select-option v-for="item in staffList" :key="item.id">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>
<script name="StaffFormModal" setup>
import { addRoleStaff } from '@/services'

import { useForm } from '../composition'
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  roleId: {
    type: Number
  },
  staffList: {
    type: Array,
    default: () => []
  }
})
const { visible, staffList, roleId } = toRefs(props)
const { formRef, rules, formData } = useForm()

const emit = defineEmits(['close'])
const filterOption = (input, option) => {
  return (
    option.componentOptions.children[0].text
      .toLowerCase()
      .indexOf(input.toLowerCase()) >= 0
  )
}
const handleOk = () => {
  formRef.value.validate(valid => {
    if (valid) {
      const param = {
        roleId: roleId.value,
        userIds: formData.userIds
      }
      addRoleStaff(param).then(() => {
        handleCancel(true)
      })
    } else {
      return false
    }
  })
}
const handleCancel = fresh => {
  formRef.value.resetFields()
  emit('close', fresh)
}
</script>
