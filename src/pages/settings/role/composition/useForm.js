function useForm(form) {
  const formRef = ref(null)
  const formData = reactive({
    name: '',
    userIds: []
  })
  const rules = reactive({
    userIds: [
      { required: true, message: '请选择需要关联的员工', trigger: 'change' }
    ]
  })
  watch(
    () => form.value.id,
    val => {
      if (!val) {
        return
      }
      formData.name = form.value.name
    },
    {
      immediate: true
    }
  )
  return { formRef, rules, formData }
}

export { useForm }
