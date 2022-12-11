# 文字输入

## 银行卡输入

对银行卡使用 `xxxx xxxx xxxx xxxx xxx` 的格式渲染
:::demo

```html
<template>
  <!-- 全选删除，要删除三次才能全部删除 -->
  <h-input-bank-number
    v-model="value1"
    @change="handleChange"
    @pressEnter="handleEnter"
  />
  <h-input-bank-number
    style="margin-top:12px"
    default-value="6217001210024455220"
  />
  <h-input-bank-number style="margin-top:12px" separator="-" />
</template>

<script>
  export default {
    data() {
      return {
        value1: ''
      }
    },
    watch: {
      value1(val) {
        console.log('watcher', val)
      }
    },
    methods: {
      handleChange({ value, bankInfo }) {
        console.log('onChange', value, bankInfo)
      },
      handleEnter(e) {
        console.log('onChange', e)
      }
    }
  }
</script>
```

:::

#### InputBankNumber API

| 参数名         | 描述         | 类型     | 默认值 |
| -------------- | ------------ | -------- | ------ |
| separator      | 自定义分割线 | `String` | `" "`  |
| value(v-model) | 输入的值     | `String` | -      |
| defaultValue   | 默认值       | `String` | -      |

## 版本号输入

限制版本号的格式为 `Vxx.xx.xx...xx` 的格式，长度限制为 50。不限制版本号的前缀，可通过 prop 自定义。

#### 默认用法

:::demo

```html
<template>
  <HVersionInput style="width: 200px;" v-model="version" />
</template>

<script>
  export default {
    data() {
      return {
        version: 'V1.0'
      }
    }
  }
</script>
```

:::

#### 自定义版本号前缀

:::demo

```html
<template>
  <HVersionInput style="width: 200px;" prefix="Version" v-model="version" />
</template>

<script>
  export default {
    data() {
      return {
        version: ''
      }
    }
  }
</script>
```

:::

#### 传入旧版本号，例如旧版本号为 V1.0，若输入的新版号小于 V1.0 则会给出错误提示

:::demo

```html
<template>
  <HVersionInput
    style="width: 200px;"
    v-model="version"
    :oldVersion="oldVersion"
  />
</template>

<script>
  export default {
    data() {
      return {
        version: '',
        oldVersion: 'V1.0'
      }
    }
  }
</script>
```

:::

#### VersionInput API

| 参数名           | 描述                                                                  | 类型     | 默认值 |
| ---------------- | --------------------------------------------------------------------- | -------- | ------ |
| version(v-model) | 输入的值                                                              | `String` | -      |
| prefix           | 版本号前缀                                                            | `String` | `'V'`  |
| oldVersion       | 用于对比的旧版本号，设置了 oldVersion 后，输入的值必须大于 oldVersion | `String` | -      |
