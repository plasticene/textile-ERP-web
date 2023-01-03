<template>
  <div class="form">
    <a-modal
      :visible="visible"
      :title="opt === 'add' ? '新增代工厂' : '编辑代工厂'"
      :confirm-loading="confirmLoading"
      row-key="id"
      @ok="handleOk"
      @cancel="handleCancel(false)"
    >
      <a-form-model
        ref="formRef"
        :model="formData"
        :rules="rules"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 19 }"
      >
        <a-form-model-item label="代工厂名称" prop="name">
          <a-input v-model="formData.name" :max-length="50" />
        </a-form-model-item>
        <a-form-model-item label="联系人" prop="contactName">
          <a-input v-model="formData.contactName" :max-length="20" />
        </a-form-model-item>
        <a-form-model-item label="联系电话" prop="contactNumber">
          <a-input v-model="formData.contactNumber" :max-length="20" />
        </a-form-model-item>
        <a-form-model-item label="公司地址" prop="address">
          <a-input v-model="formData.address" :max-length="100" />
        </a-form-model-item>
        <a-form-model-item label="备注" prop="remark">
          <a-input v-model="formData.remark" type="textarea" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>
<script name="FactoryFormModal" setup>
import { saveFactory, updateFactory } from '@/services'

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
        contactName: formData.contactName,
        contactNumber: formData.contactNumber,
        address: formData.address,
        remark: formData.remark
      }
      if (opt.value === 'add') {
        saveFactory(param).then(() => {
          handleCancel(true)
        })
      } else {
        updateFactory(param).then(() => {
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
