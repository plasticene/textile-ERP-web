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
      title: '员工姓名',
      dataIndex: 'name',
      key: 'name',
      scopedSlots: { customRender: 'name' },
      width: 100
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
      scopedSlots: { customRender: 'gender' },
      width: 100
    },
    {
      title: '手机号码',
      dataIndex: 'mobile',
      key: 'mobile',
      width: 100
    },
    {
      title: '联系地址',
      dataIndex: 'address',
      key: 'address',
      width: 200
    },
    {
      title: '在职状态',
      dataIndex: 'status',
      key: 'status',
      scopedSlots: { customRender: 'staffStatus' },
      width: 100
    },
    {
      title: '岗位',
      dataIndex: 'roleList',
      key: 'roleList',
      scopedSlots: { customRender: 'roleList' },
      width: 150
    },
    {
      title: '入职时间',
      dataIndex: 'entryTime',
      key: 'entryTime',
      // scopedSlots: { customRender: 'entryTime' },
      width: 160
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

  return { tableRef, columns, opt, showModal, formData }
}

export { useTable }
