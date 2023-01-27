<template>
  <div class="form">
    <a-modal
      :visible="visible"
      :title="opt === 'add' ? '添加机台' : '编辑机台'"
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
        <a-form-model-item label="机台名称" prop="machineSetId">
          <a-select
            v-model="formData.machineSetId"
            allow-clear
            placeholder="全部"
          >
            <a-select-option
              v-for="item in machineTypeList"
              :key="item.id"
              :value="item.id"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="机台编号" prop="serialNo">
          <a-input v-model="formData.serialNo" placeholder="请输入" />
        </a-form-model-item>
        <a-form-model-item label="所属车间" prop="workshopId">
          <a-select
            v-model="formData.workshopId"
            allow-clear
            placeholder="全部"
          >
            <a-select-option
              v-for="item in workshopList"
              :key="item.id"
              :value="item.id"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="机台规格" prop="needle">
          <div class="flex">
            <a-input v-model="formData.needle" suffix="针" />
            <a-input v-model="formData.size" class="ml-2x" suffix="寸" />
            <a-input v-model="formData.path" class="ml-2x" suffix="路" />
          </div>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>
<script name="FormModal" setup>
import { saveMachine, updateMachine } from '@/services'

import { useFilter } from '../composition'
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
const { workshopList, machineTypeList } = useFilter()

const emit = defineEmits(['close'])
const handleOk = () => {
  formRef.value.validate(valid => {
    if (valid) {
      const param = formData.value
      if (opt.value === 'add') {
        saveMachine(param).then(() => {
          handleCancel(true)
        })
      } else {
        updateMachine(param).then(() => {
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
