<template>
  <div class="form">
    <a-modal
      :visible="visible"
      :title="
        opt === 'add'
          ? '新增员工'
          : opt === 'edit'
          ? '编辑员工'
          : '查看员工详情'
      "
      row-key="id"
      @cancel="handleCancel(false)"
    >
      <template slot="footer">
        <a-button @click="handleCancel">
          {{ opt === 'view' ? '关闭' : '取消' }}
        </a-button>
        <a-button v-if="opt !== 'view'" type="primary" @click="handleOk">
          确定
        </a-button>
      </template>
      <a-form-model
        ref="formRef"
        :model="formData"
        :rules="opt === 'view' ? undefined : rules"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 20 }"
      >
        <a-form-model-item label="员工姓名" prop="name">
          <a-input
            v-if="opt !== 'view'"
            v-model="formData.name"
            :max-length="20"
          />
          <span v-else>{{ formData.name }}</span>
        </a-form-model-item>
        <a-form-model-item label="密码" prop="password">
          <a-input
            v-if="opt !== 'view'"
            v-model="formData.password"
            :max-length="20"
          />
          <span v-else>{{ formData.password }}</span>
        </a-form-model-item>
        <a-form-model-item label="性别" prop="gender">
          <a-radio-group
            v-if="opt !== 'view'"
            v-model="formData.gender"
            :options="GENDER"
          />
          <span v-else>
            {{ GENDER.find(e => e.value === formData.gender)?.lable }}
          </span>
        </a-form-model-item>
        <a-form-model-item label="手机号码" prop="mobile">
          <a-input
            v-if="opt !== 'view'"
            v-model="formData.mobile"
            :max-length="11"
          />
          <span v-else>{{ formData.mobile }}</span>
        </a-form-model-item>
        <a-form-model-item label="联系地址" prop="address">
          <a-input
            v-if="opt !== 'view'"
            v-model="formData.address"
            :max-length="100"
          />
          <span v-else>{{ formData.address }}</span>
        </a-form-model-item>
        <a-form-model-item label="在职状态" prop="status">
          <a-select
            v-if="opt !== 'view'"
            v-model="formData.status"
            :options="STAFF_STATUS"
          />
          <span v-else>
            {{ STAFF_STATUS.find(e => e.value === formData.status)?.label }}
          </span>
        </a-form-model-item>
        <a-form-model-item label="岗位" prop="roleIds">
          <a-select
            v-if="opt !== 'view'"
            v-model="formData.roleIds"
            mode="multiple"
            style="width: 100%"
          >
            <a-select-option v-for="item in roleList" :key="item.id">
              {{ item.name }}
            </a-select-option>
          </a-select>
          <span v-else>{{ formData.roleNames.join(',') }}</span>
        </a-form-model-item>
        <a-form-model-item label="入职时间" prop="entryTime">
          <a-date-picker v-if="opt !== 'view'" v-model="formData.entryTime" />
          <span v-else>
            {{ formData.entryTime.format('yyyy-MM-DD hh:mm:ss') }}
          </span>
        </a-form-model-item>
        <a-form-model-item label="备注" prop="remark">
          <a-input
            v-if="opt !== 'view'"
            v-model="formData.remark"
            type="textarea"
          />
          <span v-else>{{ formData.remark }}</span>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>
<script name="StaffFormModal" setup>
import { useRoleList } from '@/pages/settings/role//composition'
import { saveStaff, updateStaff } from '@/services'
import { GENDER, STAFF_STATUS } from '@/utils/constant'

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
const { formRef, rules, formData } = useForm(form)
const { roleList } = useRoleList()

const emit = defineEmits(['close'])
const handleOk = () => {
  formRef.value.validate(valid => {
    if (valid) {
      const param = {
        ...formData,
        entryTime: formData.entryTime.format('yyyy-MM-DD hh:mm:ss')
      }
      if (opt.value === 'add') {
        saveStaff(param).then(() => {
          handleCancel(true)
        })
      } else {
        updateStaff(param).then(() => {
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
