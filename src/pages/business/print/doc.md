# HTML 打印

业务中需要遇到文档打印的情况，在协同平台大多数情况都是交给后端的同学去完成的。
个别情况由于表格较复杂的情况下，会将内容打印的交由前端同学。

## 打印流程

整个打印流程分成三部分：

1. 获取/生成需要打印表格的 `HTML` ；
2. 根据接口信息，将表格和数据绑定；对于审批历史信息较为复杂，绑定的时候需要注意一下；
3. 最后调用组件即可。

### 打印表格的 HTML

如果交付过来的表格是 `word` 文档，这边有个快捷导出的 tips:

> 用 `word` 软件打开表格，执行另存为操作，选择 `.htm` 格式,导出的就是一个 `html` 文档。用浏览器打开之后，选择需要制作的表格，右键复制`html`即可快速获取到表格的`DOM`结构。

由 `word` 生成的表格可能存在标签嵌套过多的情况，可以酌情去清理一下。

### 打印

打印操作依靠[vue-html2pdf](https://github.com/kempsteven/vue-html2pdf)插件。

> 更多的配置查看：[vue-html2pdf](https://github.com/kempsteven/vue-html2pdf) ，[jsPDF](https://rawgit.com/MrRio/jsPDF/master/docs/jsPDF.html)

大概流程：获取 `html` ，调用 `html2canvas` 生成图片，然后通过 `jsPdf` 生成 `pdf` 文件。
对组件进行了相应的封装和配置，通过打印按钮打开弹窗预览，然后在弹窗中点击打印执行打印操作。

封装后的调用如下：

```html
<HHtmlPrint
  ref="htmlPrint"
  title="管理人员职务调整 / 岗位推荐申请表"
  :file-name="data.adjustUserName + '职务调整(岗位推荐)申请表'"
>
  <template #extra>
    <!-- 此处是一些额外的，不会包含在打印内容中的 -->
    <!-- 该例子中，此处是审批流程节点，可选择流程节点，生成相应的流程 -->
    <HTaskNode :tasks="data.taskList" :nodes.sync="taskChunks" />
  </template>
  <!-- 具体需要打印的DOM -->
  <PrintPaper :record="data" :tasks="taskChunks" />
</HHtmlPrint>
```

```js
const data = ref({})
const htmlPrint = ref(null)
// 对流程节点做了一些额外的处理
const taskChunks = ref([])

const onPrint = async record => {
  const closeMessage = message.loading('获取数据中...', 0)

  const res = await getDetail({ id: record.id })

  data.value = res.data.content

  closeMessage()

  setTimeout(() => {
    // 打开打印弹窗
    htmlPrint.value.open()
  }, 100)
}
```

:::demo

```html
<template>
  <a-button @click="onClick">打印</a-button>
  <h-html-print
    ref="htmlPrint"
    title="管理人员职务调整 / 岗位推荐申请表"
    :file-name="'职务调整(岗位推荐)申请表'"
  >
    <!-- 具体需要打印的DOM -->
    <div>打印内容</div>
  </h-html-print>
</template>

<script>
  export default {
    methods: {
      onClick() {
        setTimeout(() => {
          // 打开打印弹窗
          this.$refs.htmlPrint.open()
        }, 100)
      }
    }
  }
</script>
```

:::

## Feature

- 增加了弹窗预览
- 增加了进度通知
- 预设了一些配置

## 其他说明

因为存在审批流程历史，审批存在退回发起人的情况，管理专员在打印存档的时候，可能只需要正确流程，但也需要退回发起人的单独的一份。
故而增加了一个 `HTaskNode` 组件，生成可选择的节点，通过点击节点，获取从该节点到开始节点的所有节点。
具体案例可查看 管理人员试用期评价模块 `hccwp-biz/src/pages/management/position/probation/index.vue`

## API

| 参数名           | 描述                                                                 | 类型      | 默认值     |
| ---------------- | -------------------------------------------------------------------- | --------- | ---------- |
| title            | 弹窗的标题                                                           | `String`  | `PDF` 打印 |
| visible(v-model) | 控制弹窗的显示                                                       | `Boolean` | -          |
| fileName         | 下载的 pdf 文件名称                                                  | `String`  | `PDF`      |
| message          | 生成过程中的提示信息                                                 | `String`  | -          |
| orientation      | pdf 纸张的方向， "portrait" or "landscape" (or shortcuts "p" or "l") | `String`  | `p`        |
| format           | pdf 纸张类型                                                         | `String`  | `a4`       |
| contentWidth     | 弹窗内容宽度                                                         | `Boolean` | `672`      |

## Methods

| name          | 描述                |
| ------------- | ------------------- |
| `generatePdf` | 主要生成 pdf 的方法 |
| `open`        | 打开弹窗的方法      |

## HTaskNode API

默认选中流程最后一个节点

| 参数名         | 描述                   | 类型     | 默认值 |
| -------------- | ---------------------- | -------- | ------ |
| tasks          | 流程审批节点列表       | `Array`  | `[]`   |
| value(v-model) | 选中的审批节点         | `String` | -      |
| nodes(.sync)   | 从开始节点到选中的节点 | `Array`  | `[]`   |
