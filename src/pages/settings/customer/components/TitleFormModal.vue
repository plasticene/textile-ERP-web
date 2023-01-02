<template>
  <div class="form">
    <a-modal
      :visible="visible"
      :title="opt === 'add' ? '新增抬头' : '编辑抬头'"
      :confirm-loading="confirmLoading"
      row-key="id"
      @ok="handleOk"
      @cancel="handleCancel(false)"
    >
      <a-form-model :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
        <a-form-model-item label="抬头类型">
          <a-radio-group v-model="titleType">
            <a-radio value="delivery">发货抬头</a-radio>
            <a-radio value="invoice">开票抬头</a-radio>
          </a-radio-group>
        </a-form-model-item>
      </a-form-model>
      <a-form-model
        v-if="titleType === 'delivery'"
        ref="formRef"
        :model="formData"
        :rules="deliveryRules"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 20 }"
      >
        <a-form-model-item label="抬头" prop="title">
          <a-input v-model="formData.title" :max-length="20" />
        </a-form-model-item>
        <a-form-model-item label="联系人" prop="contactName">
          <a-input v-model="formData.contactName" :max-length="20" />
        </a-form-model-item>
        <a-form-model-item label="联系电话" prop="contactNumber">
          <a-input v-model="formData.contactNumber" :max-length="20" />
        </a-form-model-item>
        <a-form-model-item label="备注" prop="remark">
          <a-input v-model="formData.remark" type="textarea" />
        </a-form-model-item>
      </a-form-model>
      <a-form-model
        v-if="titleType === 'invoice'"
        ref="formRef"
        :model="formData"
        :rules="invoiceRules"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 20 }"
      >
        <a-form-model-item label="抬头" prop="title">
          <a-input v-model="formData.title" :max-length="20" />
        </a-form-model-item>
        <a-form-model-item label="税号" prop="taxNo">
          <a-input v-model="formData.taxNo" :max-length="20" />
        </a-form-model-item>
        <a-form-model-item label="开票地址" prop="address">
          <a-input v-model="formData.address" :max-length="20" />
        </a-form-model-item>
        <a-form-model-item label="电话" prop="phoneNumber">
          <a-input v-model="formData.phoneNumber" :max-length="20" />
        </a-form-model-item>
        <a-form-model-item label="开户银行" prop="bank">
          <a-input v-model="formData.bank" :max-length="20" />
        </a-form-model-item>
        <a-form-model-item label="开户账号" prop="bankAccount">
          <a-input v-model="formData.bankAccount" :max-length="20" />
        </a-form-model-item>
        <!-- <a-form-model-item label="备注" prop="remark">
          <a-input v-model="formData.remark" type="textarea" />
        </a-form-model-item> -->
      </a-form-model>
    </a-modal>
  </div>
</template>
<script name="TitleFormModal" setup>
import {
  saveDeliveryTitle,
  saveInvoiceTitle,
  updateDeliveryTitle,
  updateInvoiceTitle
} from '@/services'

import { useTitleForm } from '../composition'
const props = defineProps({
  opt: {
    type: String,
    default: 'add'
  },
  cusId: {
    type: Number
  },
  visible: {
    type: Boolean,
    default: false
  },
  form: {
    type: Object
  }
})
const { opt, visible, form, cusId } = toRefs(props)
const {
  confirmLoading,
  formRef,
  deliveryRules,
  invoiceRules,
  formData,
  titleType
} = useTitleForm(form, opt)

const emit = defineEmits(['close'])
const handleOk = () => {
  if (titleType.value === 'delivery') {
    deliverySubmit()
  } else {
    invoiceSubmit()
  }
}
const deliverySubmit = () => {
  formRef.value.validate(valid => {
    if (valid) {
      const param = {
        customerId: cusId.value,
        id: formData.value.id,
        title: formData.value.title,
        contactName: formData.value.contactName,
        contactNumber: formData.value.contactNumber,
        remark: formData.value.remark
      }
      if (opt.value === 'add') {
        saveDeliveryTitle(param).then(() => {
          handleCancel(true)
        })
      } else {
        updateDeliveryTitle(param).then(() => {
          handleCancel(true)
        })
      }
    } else {
      return false
    }
  })
}
const invoiceSubmit = () => {
  formRef.value.validate(valid => {
    if (valid) {
      const param = {
        customerId: cusId.value,
        id: formData.value.id,
        title: formData.value.title,
        taxNo: formData.value.taxNo,
        address: formData.value.address,
        phoneNumber: formData.value.phoneNumber,
        bank: formData.value.bank,
        bankAccount: formData.value.bankAccount,
        remark: formData.value.remark
      }
      if (opt.value === 'add') {
        saveInvoiceTitle(param).then(() => {
          handleCancel(true)
        })
      } else {
        updateInvoiceTitle(param).then(() => {
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
