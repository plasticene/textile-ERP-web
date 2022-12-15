function useDutyForm(dutyForm) {
  const confirmLoading = ref(false)
  const formRef = ref(null)
  const formData = reactive({
    dutyName: '',
    dutyDesc: ''
  })
  watch(
    () => dutyForm.value.id,
    val => {
      formData.id = val
      formData.dutyName = dutyForm.value.dutyName
      formData.dutyDesc = dutyForm.value.dutyDesc
    },
    { immediate: true }
  )
  const rules = reactive({
    dutyName: [{ required: true, message: '请输入职责名称', trigger: 'blur' }],
    dutyDesc: [{ required: true, message: '请输入职责描述', trigger: 'blur' }]
  })

  return { confirmLoading, formRef, rules, formData }
}

export { useDutyForm }
