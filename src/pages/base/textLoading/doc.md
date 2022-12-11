# 文字加载中

用于部分文字需要单独请求接口的情况，特别在于人名等。

## 基础用法

:::demo

```html
<template>
  <h-text-loading :loading="loading">value</h-text-loading>
</template>

<script>
  export default {
    data() {
      return {
        loading: true
      }
    }
  }
</script>
```

:::

## Api

### TextLoading

| 参数名  | 描述             | 类型     | 默认值 |
| ------- | ---------------- | -------- | ------ |
| loading | 是否展示 loading | `Boolean` | -      |
