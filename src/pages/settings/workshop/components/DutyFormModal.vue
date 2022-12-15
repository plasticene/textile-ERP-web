<template>
  <div class="dutyForm">
    <a-modal
      :visible="visible"
      :title="opt === 'add' ? '新增职责' : '修改职责'"
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
        <a-form-model-item label="职责名称" prop="dutyName">
          <a-input v-model="formData.dutyName" :max-length="20" />
        </a-form-model-item>
        <a-form-model-item label="职责描述" prop="dutyDesc">
          <a-input type="textarea" v-model="formData.dutyDesc" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>
<script name="DutyForm" setup>
import { useDutyForm } from '../composition'
import { insertDeptDuty, updateDeptDuty } from '@/services'
const props = defineProps({
  opt: {
    type: String,
    default: 'add'
  },
  visible: {
    type: Boolean,
    default: false
  },
  dutyForm: {
    type: Object
  }
})
const { opt, visible, dutyForm } = toRefs(props)
const { confirmLoading, formRef, rules, formData } = useDutyForm(dutyForm)

watch(
  () => dutyForm.value.id,
  val => {
    formData.id = val
    formData.dutyName = dutyForm.value.dutyName
    formData.dutyDesc = dutyForm.value.dutyDesc
  },
  { immediate: true }
)
const emit = defineEmits(['close'])
const handleOk = () => {
  formRef.value.validate(valid => {
    if (valid) {
      const param = {
        id: formData.id,
        duty: formData.dutyName,
        memo: formData.dutyDesc
      }
      if (opt.value === 'add') {
        insertDeptDuty(param).then(() => {
          handleCancel(true)
        })
      } else {
        updateDeptDuty(param).then(() => {
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
<style lang="less" scoped>
.depDuty {
}
</style>
