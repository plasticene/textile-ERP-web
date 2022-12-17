import { getRolePageList } from '@/services'
function useMenuList(roleId) {
  const name = ref('')
  const roleList = ref([])
  const opt = ref('add')
  const showModal = ref(false)
  const current = ref({})
  const formData = reactive({
    name: '',
    id: undefined
  })
  watch(
    () => roleId.value,
    val => {
      console.log('%c Line:14 🥓 val', 'color:#e41a6a', val)
    },
    { immediate: true }
  )
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

export { useMenuList }
