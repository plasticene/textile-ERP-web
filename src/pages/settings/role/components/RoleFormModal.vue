<template>
  <div class="form">
    <a-modal
      :visible="visible"
      :title="opt === 'add' ? '新增岗位' : '修改岗位'"
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
        <a-form-model-item label="岗位名称" prop="name">
          <a-input v-model="formData.name" :max-length="20" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>
<script name="RoleFormModal" setup>
import { saveRole, updateRole } from '@/services'

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
        name: formData.name
      }
      if (opt.value === 'add') {
        saveRole(param).then(() => {
          handleCancel(true)
        })
      } else {
        updateRole(param).then(() => {
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
