# 搜索查询栏

多个查询条件会被折叠

## 使用

```js
const FilterComponent = await import('lib/FilterComponent')
// 或者 在 vue 组件中
export default {
  components: {
    FilterComponent: () => import('lib/FilterComponent')
  }
}
```

### 基础示例

通过`v-decorator`绑定值。点击查询，控制台会输出对应的值

**`v-decorator` 指令的参数格式 ：** `v-decorator="[id, options]"`

[相关文档](<https://www.antdv.com/components/form-cn/#this.form.getFieldDecorator(id,-options)-%E5%92%8C-v-decorator=%22[id,-options]%22>)

:::demo

```html
<template>
  <div>
    <FilterComponent @submit="handleSubmit">
      <a-input v-decorator="['input']" />
      <a-input v-decorator="['input']" />
      <a-input v-decorator="['input']" />
      <a-input v-decorator="['input']" />
    </FilterComponent>

    <FilterComponent @submit="handleSubmit">
      <a-input v-decorator="['input']" />
      <a-input v-decorator="['input']" />
    </FilterComponent>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        input: ''
      }
    },
    methods: {
      handleSubmit(value) {
        console.log(value)
      }
    }
  }
</script>
```

:::

## API

| 参数名   | 描述                                     | 类型     | 默认值 |
| -------- | ---------------------------------------- | -------- | ------ |
| foldSize | 折叠的限制，超过这个数的查询条件将被收起 | `Number` | 3      |

### EVENT

| 事件名 | 描述     | 回调参数           |
| ------ | -------- | ------------------ |
| submit | 查询事件 | `(value:formData)` |
