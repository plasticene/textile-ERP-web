# 图片预览查看

以指令的形式调用，推荐按需挂载指令。

## 使用

```js
const { previewMixin } = await import('lib/mixin')
export default {
  mixin: [previewMixin]
}
```

## 基础示例

:::demo

```html
<template>
  <img
    style=" width: 100px;height: 100px;"
    v-preview="true"
    src="https://raw.githubusercontent.com/vueComponent/ant-design-vue/master/components/vc-slick/assets/img/react-slick/abstract01.jpg"
  />
</template>
<script>
  // import { previewMixin } from '@/utils/mixin'
  export default {
    //  mixin:[previewMixin]
  }
</script>
```

:::
