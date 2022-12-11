# 描述组件

## 基础用法

支持 `customRender` 函数和 `scopedSlots` 插槽

:::demo 接受名为`value` 的插槽

```html
<template>
  <h-descriptions
    :options="options"
    :span="6"
    :gutter="[12,24]"
    style="margin-bottom:24px"
  >
    <template #customRenderSlot>this is custom Slot</template>
  </h-descriptions>

  <h-description-item label="Name" value="Socrates" />

  <h-description-item label="Mobile">
    <template #value>123-123-123</template>
  </h-description-item>
</template>

<script>
  export default {
    data() {
      return {
        options: [
          {
            label: 'Name',
            value: 'Socrates'
          },
          {
            label: 'Name',
            value: 'Socrates'
          },
          {
            label: 'Name',
            value: 'Socrates'
          },
          {
            label: 'Name',
            value: 'Socrates'
          },
          {
            label: 'Name',
            value: 'Socrates',
            customRender: text => text + '-' + text
          },
          {
            label: 'custom Slot',
            value: 'Socrates',
            scopedSlots: { customRender: 'customRenderSlot' }
          }
        ]
      }
    }
  }
</script>
```

:::

## 垂直排列

:::demo 接受名为`value` 的插槽

```html
<h-description-item vertical label="Name" value="Socrates" />

<h-description-item vertical label="Mobile" class="mt-4x">
  <template #value>123-123-123</template>
</h-description-item>
```

:::

## 设置链接样式

:::demo 通过 `isLink` 来设置成链接样式,`to`接受的类型和 `router-link` 完全相同

```html
<h-description-item label="Name" value="Socrates" isLink to="/descriptions" />

<h-description-item label="网址" value="百度" isLink to="http://www.baidu.com" />
```

:::

## Api

### Description

| 参数名  | 描述                                                                                                                                 | 类型     | 默认值 |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------ | -------- | ------ |
| options | 数据配置，类型如下                                                                                                                   | `String` | -      |
| span    | 占位格数，为 `0` 时相当于`display:none`                                                                                              | `Number` | -      |
| gutter  | 间隔，可以写成像素值或支持响应式的对象写法来设置水平间隔 `{ xs: 8, sm: 16, md: 24}`。或者使用数组形式同时设置 `[水平间距, 垂直间距]` | `number\|object\|array` | 0   |

### options

`options` 的类型入下

```ts
interface Option {
  label: string
  value: string | number
  span: number
  customRender: (value: Option['value'], option: Option) => string | number
  scopedSlots: { customRender: string }
}
type Options = Array<Option>
```

### DescriptionItem

| 参数名   | 描述                                       | 类型      | 默认值  |
| -------- | ------------------------------------------ | --------- | ------- |
| label    | 显示的标签                                 | `string`  | -       |
| value    | 显示的值                                   | `string   | number` |
| isLink   | 是否是链接样式                             | `boolean` | `false` |
| to       | 跳转的路径,类型同 `router-link` 的`to`属性 | `string   | object` |
| vertical | 是否垂直排列                               | `boolean` | `false` |
