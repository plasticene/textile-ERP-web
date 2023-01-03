function useTable() {
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
      title: '代工厂名称',
      dataIndex: 'name',
      key: 'name',
      width: 150
    },
    {
      title: '联系人',
      dataIndex: 'contactName',
      key: 'contactName',
      width: 100
    },
    {
      title: '联系电话',
      dataIndex: 'contactNumber',
      key: 'contactNumber',
      width: 100
    },
    {
      title: '公司地址',
      dataIndex: 'address',
      key: 'address',
      width: 150
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
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
  const formData = reactive({
    name: '',
    contactName: '',
    contactNumber: '',
    address: '',
    remark: '',
    id: undefined
  })

  return { tableRef, columns, opt, showModal, formData }
}

export { useTable }
