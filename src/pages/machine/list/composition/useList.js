import { getMachineList } from '@/services'
function useList() {
  const opt = ref('add')
  const showModal = ref(false)
  const list = ref([])
  const getListData = params => {
    console.log('%c Line:7 🌭 params', 'color:#ed9ec7', params)
    getMachineList(params).then(res => {
      list.value = res.data.list
      console.log('%c Line:10 🍧 value', 'color:#33a5ff', list.value)
    })
  }
  getListData()
  return { opt, showModal, list, getListData }
}

export { useList }
