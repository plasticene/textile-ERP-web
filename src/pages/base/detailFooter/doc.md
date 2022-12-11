# 详情页操作栏

详情页底部的操作栏，默认包含返回按钮

## 基础用法

:::demo 提供了一个默认插槽

```html
<template>
  <div>
    <div>请查看页面底部</div>
    <a-button type="primary" @click="onClick">{{ text }}</a-button>
    <div style="margin-top:20px">
      也可以手动设置返回的地址
      <br />
      设置为 '/base-components/descriptions'
    </div>

    <a-button type="primary" @click="setPath">设置</a-button>
    <h-detail-footer :showBack="showBack">
      <a-button>提交</a-button>
    </h-detail-footer>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        showBack: true,
        text: '隐藏'
      }
    },
    methods: {
      onClick() {
        const { showBack } = this
        this.showBack = !showBack
        this.text = showBack ? '显示' : '隐藏'
      },
      setPath() {
        this.showBack = '/base-components/descriptions'
      }
    }
  }
</script>
```

:::

## Api

### DetailFooter

| 参数名   | 描述                       | 类型     | 默认值  |
| -------- | -------------------------- | -------- | ------- |
| showBack | 是否需要返回返回的链接地址 | `Boolean\|String` |- |

### Slot

| 插槽名  | 说明     |
| ------- | -------- |
| default | 默认插槽 |
