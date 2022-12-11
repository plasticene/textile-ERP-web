# 审批组件

基本是用于待办里面的审批/复核等

## Feature

- 如果选项较为不固定，那么考虑给他增加一个参数用于自定义选项的生成
  届时看遇到这样子的使用情况多不多

## 基本使用

:::demo `hasTurnBack` 参数提供了一个退回发起人的选项

```html
<template>
  <approval-form
    title="审批"
    hasTurnBack
    :loading="loading"
    @submit="handleSubmit"
    @cancel="handleCancel"
  />
</template>

<script>
  export default {
    data() {
      return { loading: false }
    },
    methods: {
      handleSubmit(values) {
        console.log(values)
        this.loading = true
        setTimeout(() => {
          this.loading = false
        }, 1000)
      },
      handleCancel() {
        console.log('cancel')
      }
    }
  }
</script>
```

:::

## 用于打回的情况

应用情况较少

:::demo 提供了一个默认插槽

```html
<template>
  <approval-form title="打回后的操作" :isReturn="true" />
</template>
```

:::

## API

### ApprovalFormProps

| 参数名      | 描述                      | 类型      | 默认值 |
| ----------- | ------------------------- | --------- | ------ |
| title       | 用于描述审批的标题        | `String`  | -      |
| hasTurnBack | 添加一个打回的选项        | `Boolean` | -      |
| isReturn    | 是一个打回后操作          | `Boolean` | -      |
| loading     | 提交按钮的 `loading` 状态 | `Boolean` | -      |

### Event

| 事件   | 描述               | 回调参数         |
| ------ | ------------------ | ---------------- |
| submit | 点击提交按钮的回调 | `(values)=>void` |
| cancel | 点击取消按钮的回调 | `()=>void`       |
