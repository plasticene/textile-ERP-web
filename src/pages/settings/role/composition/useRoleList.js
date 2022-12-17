import { getRolePageList } from '@/services'
function useRoleList() {
  const name = ref('')
  const roleList = ref([])
  const opt = ref('add')
  const showModal = ref(false)
  const current = ref({})
  const formData = reactive({
    name: '',
    id: undefined
  })
  const getList = () => {
    getRolePageList(name.value).then(res => {
      roleList.value = res.data.list
      if (!current.value.id && roleList.value?.length) {
        current.value = roleList.value[0]
      }
    })
  }
  getList()
  return { name, roleList, opt, showModal, formData, current, getList }
}

export { useRoleList }
