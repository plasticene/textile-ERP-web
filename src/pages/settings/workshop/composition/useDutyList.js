import { getDeptDutyPageList } from '@/services'
function useDutyList() {
  const tableRef = ref(null)
  const columns = ref([
    {
      title: '序号',
      key: 'index',
      scopedSlots: { customRender: 'index' },
      width: 80
    },
    {
      title: '车间名称',
      dataIndex: 'name',
      key: 'name',
      width: 220
    },
    {
      title: '车间位置',
      dataIndex: 'location',
      key: 'location',
      scopedSlots: { customRender: 'location' },
      width: 300
    },
    {
      title: '机台数量',
      dataIndex: 'machineCount',
      key: 'machineCount',
      scopedSlots: { customRender: 'machineCount' },
      width: 80
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      scopedSlots: { customRender: 'remark' },
      width: 200
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      scopedSlots: { customRender: 'action' },
      width: 150
    }
  ])
  const opt = ref('add')
  const showModal = ref(false)
  const dutyForm = reactive({
    dutyName: '',
    dutyDesc: '',
    id: undefined
  })

  return { tableRef, columns, opt, showModal, dutyForm }
}

export { useDutyList }
