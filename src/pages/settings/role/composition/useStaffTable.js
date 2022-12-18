import { getNotRelatedStaffList } from '@/services'
function useStaffTable(roleId) {
  const tableRef = ref(null)
  const columns = ref([
    {
      title: '序号',
      key: 'index',
      customRender: (text, row, index) => {
        return index + 1
      },
      width: 80
    },
    {
      title: '员工姓名',
      dataIndex: 'name',
      key: 'name',
      width: 150
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      scopedSlots: { customRender: 'action' },
      width: 100
    }
  ])
  const showModal = ref(false)
  const staffList = ref([])
  const selectedRowKeys = ref([])
  watch(
    () => roleId.value,
    val => {
      console.log('%c Line:37 🥛 val', 'color:#e41a6a', val)
      if (!val) {
        return
      }
      tableRef.value?.reload()
      getNotRelatedStaffList({ roleId: val }).then(res => {
        staffList.value = res.data
      })
    },
    { immediate: true }
  )
  return { tableRef, columns, showModal, staffList, selectedRowKeys }
}

export { useStaffTable }
