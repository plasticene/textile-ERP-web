# 基础信息

将 `BaseCard` 和 `Descriptions` 做了封装，props 继承自这两个组件

## 使用

```js
const { BaseCardInfo } = await import('lib/card')
```

## 基础使用

:::demo

```html
<template>
  <BaseCardInfo title="title" :options="options">
    <template #customRenderSlot="{record}">this is custom Slot,label:{{record.label}}</template>
  </BaseCardInfo>
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
