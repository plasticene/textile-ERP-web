function useTable() {
  const tableRef = ref(null)
  const columnsPutIn = ref([
    // {
    //   title: '序号',
    //   key: 'index',
    //   customRender: (text, row, index) => {
    //     return index + 1
    //   },
    //   width: 80
    // },
    {
      title: '入库时间',
      dataIndex: 'name',
      key: 'name',
      width: 150
    },
    {
      title: '入库车间',
      dataIndex: 'workshopName',
      key: 'workshopName',
      // scopedSlots: { customRender: 'location' },
      width: 200
    },
    {
      title: '数量（卷）',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 100
    },
    {
      title: '重量（kg）',
      dataIndex: 'weight',
      key: 'weight',
      width: 100
    },
    {
      title: '单价（元）',
      dataIndex: 'price',
      key: 'price',
      width: 100
    },
    {
      title: '总价（元）',
      dataIndex: 'amount',
      key: 'amount',
      width: 100
    },
    // {
    //   title: '是否含税',
    //   dataIndex: 'taxRate',
    //   key: 'taxRate',
    //   scopedSlots: { customRender: 'taxRate' },
    //   width: 150
    // },
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
    location: '',
    remark: '',
    id: undefined
  })

  return { tableRef, columnsPutIn, opt, showModal, formData }
}

export { useTable }
