function useForm(form) {
  const confirmLoading = ref(false)
  const formRef = ref(null)
  const formData = reactive({
    name: '',
    contactName: '',
    contactNumber: '',
    address: '',
    remark: '',
    id: undefined
  })
  watch(
    () => form.value.id,
    val => {
      formData.id = val
      formData.name = form.value.name
      formData.contactName = form.value.contactName
      formData.contactNumber = form.value.contactNumber
      formData.address = form.value.address
      formData.remark = form.value.remark
    },
    { immediate: true }
  )
  const rules = reactive({
    name: [{ required: true, message: '请输入供应商名称', trigger: 'blur' }],
    contactName: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
    contactNumber: [
      { required: true, message: '请输入联系电话', trigger: 'blur' }
    ],
    address: [{ required: true, message: '请输入公司地址', trigger: 'blur' }]
  })

  return { confirmLoading, formRef, rules, formData }
}

export { useForm }
