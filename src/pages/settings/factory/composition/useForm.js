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
    name: [{ required: true, message: '请输入代工厂名称', trigger: 'blur' }]
    // location: [{ required: true, message: '请输入车间位置', trigger: 'blur' }]
  })

  return { confirmLoading, formRef, rules, formData }
}

export { useForm }
