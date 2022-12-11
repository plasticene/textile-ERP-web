# 敏感操作二次确认

对于敏感操作需要进行二次确认

## 基础用法

:::demo

```html
<template>
  <div>
    <h-pop-confirm
      title="确定删除么？"
      text="删除"
      loadingText="删除中..."
      :loading="loading"
      @confirm="handleDel"
    />
    <h-pop-confirm
      buttonType="primary"
      title="确定删除么？"
      text="删除"
      loadingText="删除中..."
      :loading="loading"
      @confirm="handleDel"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loading: false
      }
    },
    methods: {
      handleDel() {
        this.loading = true
        setTimeout(() => {
          this.loading = false
        }, 1500)
      }
    }
  }
</script>
```

:::

## Api

### PopConfirm

| 参数名      | 描述                         | 类型      | 默认值           |
| ----------- | ---------------------------- | --------- | ---------------- |
| loading     | 是否展示 loading             | `Boolean` | -                |
| title       | `confirm` 的标题             | `String`  | 确定删除该项么？ |
| text        | 按钮的文字                   | `String`  | 删除             |
| loadingText | `loading` 状态的时候按钮文字 | `String`  | 删除中...        |
| buttonType  | `a-button` 的 `type` 值      | `String`  | link             |
