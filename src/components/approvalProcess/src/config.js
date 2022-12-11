import { radioConfig } from '@/utils/dict'
import { dateFormat } from '@/utils/filters'
export const columns = [
  {
    title: '节点名称',
    dataIndex: 'nodeName',
    width: 180
  },
  {
    title: '审批人',
    dataIndex: 'assignee',
    width: 100
  },
  {
    title: '审批意见',
    dataIndex: 'result',
    customRender: text => radioConfig[text].text,
    width: 100
  },
  {
    title: '审批时间',
    dataIndex: 'endDate',
    customRender: text => dateFormat(text, 'YYYY-MM-DD hh:mm'),
    width: 120
  },
  {
    title: '说明',
    dataIndex: 'opinion',
    width: 200
  }
]
