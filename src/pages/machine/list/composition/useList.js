import { getMachineList } from '@/services'
function useList() {
  const opt = ref('add')
  const type = ref('')
  const showModal = ref(false)
  const formData = ref({})
  const list = ref([])
  const getListData = params => {
    console.log('%c Line:7 🌭 params', 'color:#ed9ec7', params)
    getMachineList(params).then(res => {
      list.value = res.data.list
    })
  }
  getListData()
  return { opt, type, showModal, list, getListData, formData }
}

export { useList }
