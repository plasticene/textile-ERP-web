<template>
  <div class="form">
    <a-modal
      :visible="visible"
      :title="opt === 'add' ? '新增车间' : '修改车间'"
      :confirm-loading="confirmLoading"
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
        <a-form-model-item label="车间名称" prop="name">
          <a-input v-model="formData.name" :max-length="20" />
        </a-form-model-item>
        <a-form-model-item label="车间位置" prop="location">
          <a-input v-model="formData.location" :max-length="20" />
        </a-form-model-item>
        <a-form-model-item label="备注" prop="remark">
          <a-input v-model="formData.remark" type="textarea" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>
<script name="WorkshopFormModal" setup>
import { saveWorkshop, updateWorkshop } from '@/services'

import { useForm } from '../composition'
const props = defineProps({
  opt: {
    type: String,
    default: 'add'
  },
  visible: {
    type: Boolean,
    default: false
  },
  form: {
    type: Object
  }
})
const { opt, visible, form } = toRefs(props)
const { confirmLoading, formRef, rules, formData } = useForm(form)

const emit = defineEmits(['close'])
const handleOk = () => {
  formRef.value.validate(valid => {
    if (valid) {
      const param = {
        id: formData.id,
        name: formData.name,
        location: formData.location,
        remark: formData.remark
      }
      if (opt.value === 'add') {
        saveWorkshop(param).then(() => {
          handleCancel(true)
        })
      } else {
        updateWorkshop(param).then(() => {
          handleCancel(true)
        })
      }
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
