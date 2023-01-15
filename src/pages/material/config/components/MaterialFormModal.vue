<template>
  <div class="form">
    <a-modal
      :visible="visible"
      :title="opt === 'add' ? '新增岗位' : '编辑岗位'"
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
<script name="MaterialFormModal" setup>
import { saveMaterial, updateMaterial } from '@/services'

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
const { confirmLoading, formRef, rules, formData } = useForm()

const emit = defineEmits(['close'])

watch(
  () => form.value.id,
  val => {
    if (!val) {
      return
    }
    formData.name = form.value.name
  },
  {
    immediate: true
  }
)
const handleOk = () => {
  formRef.value.validate(valid => {
    if (valid) {
      const param = {
        id: form.value.id,
        name: formData.name
      }
      if (opt.value === 'add') {
        saveMaterial(param).then(() => {
          handleCancel(true)
        })
      } else {
        updateMaterial(param).then(() => {
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
