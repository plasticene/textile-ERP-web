# 添加copy 按钮

给组件/文本添加一个带有 copy 的按钮

## 基本使用

::: demo

```html
<template>
 <h-with-copy-btn value="点击按钮复制文本">
    点击按钮复制文本
 </h-with-copy-btn>
</template>
```

:::

## 结合组件

::: demo

```html
<template>
 <h-with-copy-btn :value="select">
    <a-select style="width:200px" v-model="select">
      <a-select-option value="测试文本1" >测试文本1</a-select-option>
      <a-select-option value="测试文本2" >测试文本2</a-select-option>
    </a-select>
 </h-with-copy-btn>
</template>
<script>
export default {
  data(){
    return{
      select:''
    }
  }
}
</script>
```

:::
