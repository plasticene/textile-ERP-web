function useTitleForm(form) {
  const confirmLoading = ref(false)
  const formRef = ref(null)
  const formData = ref({})
  const titleType = ref('delivery')
  watch(
    () => form.value.id,
    val => {
      if (!val) {
        return
      }
      formData.value = form.value
      titleType.value = formData.value.titleType
      // formData.id = val
      // formData.name = form.value.name
      // formData.address = form.value.address
      // formData.remark = form.value.remark
    },
    { immediate: true }
  )
  const deliveryRules = reactive({
    title: [{ required: true, message: '请输入抬头', trigger: 'blur' }],
    contactName: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
    contactNumber: [
      { required: true, message: '请输入联系电话', trigger: 'blur' }
    ]
  })
  const invoiceRules = reactive({
    title: [{ required: true, message: '请输入抬头', trigger: 'blur' }],
    taxNo: [{ required: true, message: '请输入税号', trigger: 'blur' }],
    bank: [{ required: true, message: '请输入开户银行', trigger: 'blur' }],
    bankAccount: [
      { required: true, message: '请输入开户账号', trigger: 'blur' }
    ],
    phoneNumber: [{ required: true, message: '请输入电话', trigger: 'blur' }],
    address: [{ required: true, message: '请输入开票地址', trigger: 'blur' }]
  })

  return {
    confirmLoading,
    formRef,
    deliveryRules,
    invoiceRules,
    formData,
    titleType
  }
}

export { useTitleForm }
