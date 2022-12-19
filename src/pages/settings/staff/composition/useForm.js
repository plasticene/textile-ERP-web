import moment from 'moment'
function useForm(form) {
  const formRef = ref(null)
  const formData = reactive({
    id: undefined,
    address: '',
    entryTime: '',
    gender: 0,
    mobile: '',
    name: '',
    password: '',
    remark: '',
    roleIds: [],
    status: 0
  })
  watch(
    () => form.value.id,
    val => {
      if (!val) {
        return
      }
      formData.id = val
      formData.name = form.value.name
      formData.password = form.value.password
      formData.remark = form.value.remark
      formData.address = form.value.address
      formData.entryTime = moment(form.value.entryTime)
      formData.gender = form.value.gender
      formData.mobile = form.value.mobile
      formData.status = form.value.status
      formData.roleIds = form.value.roleList?.map(e => e.id) ?? []
      formData.roleNames = form.value.roleList?.map(e => e.name) ?? []
      console.log('%c Line:29 🍡 formData', 'color:#33a5ff', formData)
    },
    { immediate: true }
  )
  const rules = reactive({
    name: [{ required: true, message: '请输入员工姓名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入员工姓名', trigger: 'blur' }],
    gender: [{ required: true, message: '请选择员工性别', trigger: 'change' }],
    mobile: [{ required: true, message: '请输入员工手机号', trigger: 'blur' }],
    roleIds: [{ required: true, message: '请选择岗位', trigger: 'change' }],
    status: [{ required: true, message: '请选择在职状态', trigger: 'change' }]
  })

  return { formRef, rules, formData }
}

export { useForm }
