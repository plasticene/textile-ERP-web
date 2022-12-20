function useForm(form) {
  const confirmLoading = ref(false)
  const formRef = ref(null)
  const formData = reactive({
    name: '',
    address: '',
    remark: ''
  })
  watch(
    () => form.value.id,
    val => {
      formData.id = val
      formData.name = form.value.name
      formData.address = form.value.address
      formData.remark = form.value.remark
    },
    { immediate: true }
  )
  const rules = reactive({
    name: [{ required: true, message: '请输入客户姓名', trigger: 'blur' }],
    address: [{ required: true, message: '请输入客户地址', trigger: 'blur' }]
  })

  return { confirmLoading, formRef, rules, formData }
}

export { useForm }
