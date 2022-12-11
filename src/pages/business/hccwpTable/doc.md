# Table 组件

基于`StandardTable` 封装的`table`组件，简化了使用方法，代价就是减少了可定制化的情况。
主要是减少了翻页相关的方法。如果项目中对 `table` 操作不多的地方可以使用这个组件。

## 基本使用

只需要传递请求的方法，状态颜色配置 既可以渲染如下表格。

:::demo

```html
<template>
  <h-hccwp-table
    :columns="columns"
    :loadDataRequest="loadDataRequest"
    :filter="filter"
    :stsColor="stsColor"
    :scroll="scroll"
    @change="handleChange"
  />
</template>

<script>
  // 模拟数据
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name'
    },
    {
      title: '年龄',
      dataIndex: 'age'
    },
    {
      title: '地址',
      dataIndex: 'address'
    },
    {
      title: '状态',
      dataIndex: 'stsName',
      scopedSlots: { customRender: 'status' }
    }
  ]
  const request = () => {
    const records = []

    for (let i = 0; i < 100; i++) {
      const element = records[i]

      records.push({
        key: '12' + i,
        name: '小红-' + i,
        age: '12',
        address: '五常街道溪沁街10号',
        sts: (i + 1) % 2 ? '1' : '2',
        processInstanceName: (i + 1) % 2 ? '' : '大大' + i,
        stsName: '成功'
      })
    }
    return new Promise((resolve, reject) => {
      console.log('refresh')
      resolve({
        data: {
          content: {
            total: 100,
            records
          }
        }
      })
    })
  }

  // 模拟数据 -- end --
  export default {
    data() {
      return {
        columns: columns,
        loadDataRequest: request,
        filter: {},
        stsColor: {
          1: 'green',
          2: '#000'
        },
        scroll: { x: false }
      }
    },
    methods: {
      handleChange() {}
    }
  }
</script>
```

:::

## 高级表格

只需要传递请求的方法，状态颜色配置 既可以渲染如下表格。
:::demo

```html
<template>
  <div>
    <div style="margin-bottom:8px;height:32px;display:flex;align-items:center">
      <span>是否显示更多</span>
      <a-switch v-model="showMore" />
      <a-inputNumber
        v-show="showMore"
        :min="0"
        v-model="foldSize"
      />
    </div>

    <div>
      <span>是否隐藏查询条件</span>
      <a-switch v-model="showFilter"/>
    </div>

    <hccwp-advance-table
      rowKey="id"
      :columns="columns"
      :loadDataRequest="loadDataRequest"
      :stsColor="stsColor"
      :scroll="scroll"
      :filterProps="{foldSize:foldSize}"
      :collapseFilter="showFilter"

      @change="handleChange"
    >
      <template #header>
        <a-button type="primary" icon="plus">新增</a-button>
      </template>

      <template #filterBar>
        <a-input v-decorator="['test']" />
        <a-input v-decorator="['test2']" />
        <a-input v-decorator="['test3']" />
        <a-input v-decorator="['test4']" />
        <a-input v-decorator="['test5']" />
      </template>
    </hccwp-advance-table>
  </div>
</template>

<script>
  // 模拟数据
  const columns = [
       {
      title: 'key',
      dataIndex: 'key'
    },
     {
      title: 'id',
      dataIndex: 'id'
    },
    {
      title: '姓名',
      dataIndex: 'name'
    },
    {
      title: '年龄',
      dataIndex: 'age',
      visible: false
    },
    {
      title: '地址',
      dataIndex: 'address'
    },
     {
      title: 'processInstanceName',
      dataIndex: 'processInstanceName'
    },
    {
      title: '状态',
      dataIndex: 'stsName',
      scopedSlots: { customRender: 'status' }
    }
  ]
  const request = (...args) => {
    console.log('doc:advance-table', args)
    const records = []

    for (let i = 0; i < 100; i++) {
      const element = records[i]

      records.push({
        key: '12' + i,
        id:'12'+i,
        name: '小明-' + i,
        age: '12',
        address: '五常街道溪沁街10号',
        sts: (i + 1) % 2 ? '1' : '2',
        processInstanceName: (i + 1) % 2 ? '' : '大大' + i,
        stsName: '成功'
      })
    }
    return new Promise((resolve, reject) => {
      console.log('refresh')
     setTimeout(() => {
       resolve({
        data: {
          content: {
            total: 100,
            records
          }
        }
      })
     }, 10000);
    })
  }

  // 模拟数据 -- end --
  export default {
    data() {
      return {
        columns: columns,
        loadDataRequest: request,
        filter: {},
        stsColor: {
          1: 'green',
          2: '#000'
        },
        scroll: { x: 900 },
        showMore: true,
        foldSize: 3,
        showFilter: true,
        selectedRows:[]
      }
    },
    watch: {
      showMore(newVal) {
        if (!newVal) {
          this.foldSize = 0
        } else {
          this.foldSize = 3
        }
      },
      foldSize(newVal) {
        if (!newVal) {
          this.showMore = false
        }
      }
    },
    methods: {
      handleChange() {}
    }
  }
</script>
```

:::

## API

基本参数和 antd v 的 `table` 保持对齐

### HccwpTable

| 参数名          | 描述                                                 | 类型          | 默认值 |
| --------------- | ---------------------------------------------------- | ------------- | ------ |
| loadDataRequest | 用户请求数据的方法                                   | `()=>Promise` | -      |
| stsColor        | 状态颜色配置                                         | `Object`      | -      |
| filter          | 额外的请求参数，`filter`改变的时候，将会重新进行请求 | `Object`      | -      |

### AdvanceTable Props

| 参数名  | 描述                           | 类型            | 默认值 |
| ------- | ------------------------------ | --------------- | ------ |
| title   | 表格标题                       | `string / slot` | -      |
| columns | 表格列配置，参考 `Column 配置` | `array`         | -      |

#### Event

| 参数名  | 描述                     | 回调                   |
| ------- | ------------------------ | ---------------------- |
| refresh | 表头刷新图标点击时触发   | `Function(conditions)` |
| reset   | 列配置重置按钮点击时触发 | `Function(conditions)` |

#### Columns 额外配置

| 参数名  | 描述         | 类型      | 默认值 |
| ------- | ------------ | --------- | ------ |
| visible | 是否显示该列 | `Boolean` | true   |
