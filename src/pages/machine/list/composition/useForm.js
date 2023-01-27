function useForm(form) {
  const confirmLoading = ref(false)
  const formRef = ref(null)
  const formData = ref({})
  watch(
    () => form.value.id,
    val => {
      if (!val) {
        return
      }
      // formData.id = val
      // formData.name = form.value.name
      // formData.contactName = form.value.contactName
      // formData.contactNumber = form.value.contactNumber
      // formData.address = form.value.address
      // formData.remark = form.value.remark
      formData.value = form.value
    },
    { immediate: true }
  )
  const validateSpecification = (rule, value, callback) => {
    if (
      !formData.value.needle ||
      !formData.value.size ||
      !formData.value.path
    ) {
      callback(new Error('请输入正确的机台规格'))
    } else {
      callback()
    }
  }
  const rules = reactive({
    machineSetId: [
      { required: true, message: '请选择机台类型名称', trigger: 'change' }
    ],
    serialNo: [{ required: true, message: '请输入机台编号', trigger: 'blur' }],
    workshopId: [
      { required: true, message: '请选择所属车间', trigger: 'change' }
    ],
    needle: [
      {
        required: true,
        validator: validateSpecification,
        message: '请输入正确的机台规格',
        trigger: 'blur'
      }
    ]
  })

  return { confirmLoading, formRef, rules, formData }
}

export { useForm }
