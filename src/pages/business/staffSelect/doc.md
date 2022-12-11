# 员工搜索

基于 `antdv` 的 `select` 二次封装,接口继承自`a-select`

## 使用

```js
const { StaffSelect } = await import('lib/select')
export default {
  components: {
    StaffSelect
  }
}
```

## 基础示例

:::demo

```html
<template>
  <StaffSelect :request="request" :value="value" @change="handleChange" />
</template>

<script>
  // mock request data start
  const mockData = []
  for (let i = 0; i < 10; i++) {
    mockData.push({
      deptId: '部门id',
      phone: '13312341234',
      email: 'test@test.com',
      id: 123 + (i + 1),
      viewname: '123' + (i + 1),
      name: 'test' + (i + 1)
    })
  }

  const request = (url, method, query) => {
    return new Promise(resolve => {
      const { viewName } = query
      resolve({
        data: {
          content: mockData.filter(data => {
            return (
              (data.name + '/' + data.viewname).includes(viewName) ||
              viewName.includes(data.name) ||
              viewName.includes(data.viewname)
            )
          })
        }
      })
    })
  }
  // mock request data end
  export default {
    data() {
      return {
        request,
        value: ''
      }
    },
    methods: {
      handleChange(values) {
        console.log(values)
      }
    }
  }
</script>
```

:::

## API

## PROPS

| 参数名         | 描述                        | 类型                      | 默认值             |
| -------------- | --------------------------- | ------------------------- | ------------------ |
| placeholder    | `select` 的 `placeholder`   | `String`                  | `请输入姓名或工号` |
| width          | 选择器的宽度                | `String`                  | `200px`            |
| multi          | 是否多选                    | `Boolean`                 | `false`            |
| form           | 对应的表单对象              | `Object`                  | -                  |
| keyword        | 对应表单对象里面的 `key` 值 | `String`                  | -                  |
| result         | 回显或者默认值              | `Array`                   | -                  |
| value(v-model) | 选中的值                    | `[Array, Number, String]` | -                  |
| request        | 选择器 ajax 请求的实体      | `Function`                | -                  |
| method         | 选择器请求方法的类型        | `String`                  | `get`              |
| url            | 请求的 `URL` 地址           | `String`                  | `/user/getUser`    |
| showArrow      | 是否显示箭头                | `Boolean`                 | -                  |

如果是多选，回调的将会是数组，单选则是字符串或者数字

### EVENT

| 事件名 | 描述             | 回调参数           |
| ------ | ---------------- | ------------------ |
| change | value 改变的回调 | `(value:[array|string｜number],valueObj)` |
