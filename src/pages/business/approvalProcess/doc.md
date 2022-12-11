# 审批流程

用于展示审批所在流程

## 基本使用

:::demo

```html
<template>
  <approval-process title="审批历史" :dataSource="dataSource" />
</template>

<script>
  export default {
    data() {
      return {
        dataSource: [
          {
            nodeName: '节点名称',
            assignee: '某某人',
            result: '1',
            endDate: '2021-12-21 21:21:21',
            opinion: '说明'
          }
        ]
      }
    }
  }
</script>
```

:::

## 审批节点形式

:::demo

```html
<template>
  <approve-node-line title="审批历史" :dataSource="dataSource" />
</template>

<script>
  export default {
    data() {
      return {
        dataSource: [
          {
            nodeName: '节点名称',
            assignee: '某某人',
            result: '1',
            endDate: '2021-12-21 21:21:21',
            opinion: '说明'
          },
          {
            nodeName: '节点名称2',
            assignee: '某某人',
            result: '1',
            endDate: '2021-12-21 21:21:21',
            opinion: '说明'
          },
          {
            nodeName: '节点名称2',
            assignee: '某某人、某某人',
            result: '',
            endDate: '',
          }
        ]
      }
    }
  }
</script>
```

:::

## API

### ApprovalFormProps

| 参数名     | 描述               | 类型     | 默认值 |
| ---------- | ------------------ | -------- | ------ |
| title      | 用于描述审批的标题 | `String` | -      |
| dataSource | 审批流程数据       | `Array`  | -      |

### dataSource

```js
const dataSource = [
  {
    // 节点名称
    nodeName: '节点名称',
    // 审批人
    assignee: '某某人',
    // 审批意见
    // 1: '通过' ,
    // 2: '不通过' ,
    // 3: '退回到发起人' ,
    // 4: '重新提交' ,
    // 5: '撤销'
    result: '1',
    // 审批时间
    endDate: '2021-12-21 21:21:21',
    // 说明
    opinion: '说明'
  }
]
```
