# Vue Antd Admin

[Ant Design Pro](https://github.com/ant-design/ant-design-pro) 的 Vue 实现版本
开箱即用的中后台前端/设计解决方案

- 预览地址：<http://10.80.18.59:81/webcomponent>

## TODO

- [x] 添加 StaffSelect 组件/ **缺少档发**
- [x] 添加图片预览的指令 / **缺少文档**
- [x] 通用搜索筛选器 / **缺少文档**
- [x] BaseCard / **缺少文档**

## 组件设计规划

### 表单组件

为了优化展示，更好的输入体验，对部分表单组件进行单独设计

- [ ] **手机号输入组件**
  对输入的手机号进行格式化渲染，使用 `xxx xxxx xxxx` 来优化用户的阅读体验
- [x] **身份证/银行卡输入框**
  优化渲染，使用身份证 `xxx xxx xxxx xxxx xxxx`  渲染，银行卡 `xxxx xxxx xxxx xxxx xxx` 渲染
- [ ] **金额渲染组件**
  统一渲染格式为`0,000.00`

### formModelItem

`label` 加一个 `tips`,垂直排列的时候放在label 右侧

横向排列的时候，放在 label 的左侧，绝对定位
// 或者放在 输入框的下面？

## 使用

### node 版本

`node` 版本不高于16

- 推荐版本可查看 `.nvmrc`
- 推荐使用 `nvm` node版本管理工具

自动设置版本可查看 [nvm(Deeper Shell Integration)](https://github.com/nvm-sh/nvm#deeper-shell-integration)

> 推荐使用 `pnpm` 包管理器

### pnpm

```bash
pnpm install
pnpm serve
```

### or npm

```
npm install
npm run serve
```

### 自动更新版本号

release-it 的配置

<https://github.com/release-it/release-it/blob/master/config/release-it.json>

更多信息参考 [使用文档](https://iczer.gitee.io/vue-antd-admin-docs)

## TODO 一些问题

### staff-select 组件

- 考虑虚拟列表，增加分页查询。
  - 目的：减少请求时间，目前查询的时候请求时间过长，页面会有卡顿的情况。
  - 请求回来的数据过多的时候，下拉弹出也有卡顿

### advance table 组件

- 表头列过多的时候，列展示的设置popover弹出会闪动，因为在屏幕高度不够的情况下，popover过长的时候将为出现位移。 参考属性：placement-bottomRight

#### filterBar 组件

高级表格中的filterBar响应式个数占位不合理,

- 宽屏下希望个数增加
