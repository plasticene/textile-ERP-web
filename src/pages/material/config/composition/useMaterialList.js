import { getMaterialList } from '@/services'
function useMaterialList() {
  const name = ref('')
  const list = ref([])
  const opt = ref('add')
  const showModal = ref(false)
  const current = ref({})
  const formData = reactive({
    name: '',
    id: undefined
  })
  const getList = () => {
    getMaterialList(name.value).then(res => {
      list.value = res.data
      if (!current.value.id && list.value?.length) {
        current.value = list.value[0]
      }
    })
  }
  getList()
  return { name, list, opt, showModal, formData, current, getList }
}

export { useMaterialList }
