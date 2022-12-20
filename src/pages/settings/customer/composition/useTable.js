import { getCustomerPageList } from '@/services'
function useTable() {
  const tableRef = ref(null)
  const pagination = ref({
    current: 1,
    pageSize: 10,
    total: 0
  })
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
      title: '客户姓名',
      dataIndex: 'name',
      key: 'name',
      width: 200
    },
    {
      title: '客户地址',
      dataIndex: 'address',
      key: 'address',
      // scopedSlots: { customRender: 'location' },
      width: 200
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      // scopedSlots: { customRender: 'remark' },
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
  const deliveryColumns = ref([
    {
      title: '发货抬头',
      dataIndex: 'title',
      key: 'title',
      width: 150
    },
    {
      title: '联系人',
      dataIndex: 'contactName',
      key: 'contactName',
      // scopedSlots: { customRender: 'contactName' },
      width: 150
    },
    {
      title: '联系电话',
      dataIndex: 'contactNumber',
      key: 'contactNumber',
      // scopedSlots: { customRender: 'contactNumber' },
      width: 150
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      // scopedSlots: { customRender: 'remark' },
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
  const invoiceColumns = ref([
    {
      title: '开票抬头',
      dataIndex: 'title',
      key: 'title',
      width: 150
    },
    {
      title: '税号',
      dataIndex: 'taxNo',
      key: 'taxNo',
      // scopedSlots: { customRender: 'location' },
      width: 150
    },
    {
      title: '开票地址电话',
      dataIndex: 'address',
      key: 'address',
      scopedSlots: { customRender: 'address' },
      width: 150
    },
    {
      title: '开户行及账号',
      dataIndex: 'bankAccount',
      key: 'bankAccount',
      scopedSlots: { customRender: 'bankAccount' },
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
  const tableData = ref([])
  const opt = ref('add')
  const showModal = ref(false)
  const showTitleModal = ref(false)
  const currentCusId = ref(null)
  const formData = reactive({
    name: '',
    address: '',
    remark: '',
    id: undefined
  })
  const titleForm = ref({})
  const getTableData = () => {
    getCustomerPageList({
      pageNo: pagination.value.current,
      pageSize: pagination.value.pageSize
    }).then(res => {
      tableData.value = res.data.list
      pagination.value.total = res.data.total
    })
  }
  getTableData()
  return {
    tableRef,
    pagination,
    columns,
    deliveryColumns,
    invoiceColumns,
    tableData,
    opt,
    showModal,
    showTitleModal,
    currentCusId,
    formData,
    titleForm,
    getTableData
  }
}

export { useTable }
