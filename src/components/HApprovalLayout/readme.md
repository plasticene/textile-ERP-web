# HApprovalLayout

审批页面公共布局,包含审批和已办

## 依赖

### props

```js
const props = defineProps({
  // 页面 loading
  spinning: Boolean,
  // 审批按钮 loading
  btnLoading: Boolean
})
```

### inject

依赖于`src/pages/workbench/approval.vue`页面中的 `provide`

为了保持获取的数据是最新的，故而 `provide` 了一个 `function`

```js


{
  provide() {
    return {
      getApprovalInfo: () => {
        return {
          // 页面模式 approval ｜ view
          pageMode: this.pageMode,
          // 流程 id
          processInstanceId: this.processInstanceId,
          // 节点名称
          nodeName: this.nodeName
        }
      }
    }
  }
}

```

## 获取 流程审批

- `approval` 模式下：通过 `getTasksInfo` 接口获取
- `view` 模式下: 通过 `getHistoryTasks` 接口获取

为了一致性，两个接口获取后的抛出的结果用了一样的结构，只不过 `view` 模式下的 `task` 和 `variables` 是空对象。

1. 暴露了 `tasks` 对象,父组件可以通过 `ref` 去获取:

   ```js
   defineExpose({ tasks })
   ```

2. 也可以通过事件 `tasks-loaded` 获取:

`tasks` 结构:

```js

{ historyTasks: [], task: {}, variables: {} }

```
