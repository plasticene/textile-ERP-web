# 文字加载中

用于部分文字需要单独请求接口的情况，特别在于人名等。

## 基础用法

:::demo

```html
<template>
  <h-page-view :spinning="loading">
    <template #title>dd</template>
    <template #extra>other</template>
    <a-button @click="handleClick">loading</a-button>
  </h-page-view>
</template>

<script>
  export default {
    data() {
      return {
        loading: true
      }
    },
    mounted() {
      this.setNotLoading()
    },
    methods: {
      handleClick() {
        this.loading = true
        this.setNotLoading()
      },
      setNotLoading() {
        setTimeout(() => {
          this.loading = false
        }, 1500)
      }
    }
  }
</script>
```

:::

## 内容区域不使用 card

当 title 插槽不存在的时候， 默认不展示 header

:::demo

```html
<template>
  <h-page-view :useACard="false">
    <template #[slotName]>dd</template>
    <a-button @click="handleSlot">showSlot</a-button>
  </h-page-view>
</template>

<script>
  export default {
    data() {
      return {
        slotName: 'title'
      }
    },
    methods: {
      handleSlot() {
        this.slotName = this.slotName == 'title' ? 'default' : 'title'
      }
    }
  }
</script>
```

:::

## Api

### TextLoading

| 参数名  | 描述             | 类型      | 默认值 |
| ------- | ---------------- | --------- | ------ |
| loading | 是否展示 loading | `Boolean` | -      |
