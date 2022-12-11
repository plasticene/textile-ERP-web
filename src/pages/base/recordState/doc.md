# 状态

带有审批人的状态组件

## 基础用法

:::demo

```html
<template>
  <div>
    <h-record-state :text="text" :color="color" />
    <h-record-state :text="text" :color="color" :process="process" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        text: '审批中',
        color: 'rgb(24,144,255)',
        process: '小明'
      }
    }
  }
</script>
```

:::

## Api

### RecordState

| 参数名  | 描述           | 类型     | 默认值 |
| ------- | -------------- | -------- | ------ |
| text    | 状态名         | `String` | -      |
| color   | 状态点的颜色   | `String` | -      |
| process | 审批流程中的人 | `String` | -      |
