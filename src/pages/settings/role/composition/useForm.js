function useForm() {
  const formRef = ref(null)
  const confirmLoading = ref(false)
  const formData = reactive({
    name: '',
    userIds: []
  })
  const rules = reactive({
    userIds: [
      { required: true, message: '请选择需要关联的员工', trigger: 'change' }
    ]
  })
  return { formRef, rules, formData, confirmLoading }
}

export { useForm }
