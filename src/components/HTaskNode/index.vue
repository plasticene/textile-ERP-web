<template>
  <div class="h-task-node task-layout">
    <div class="h-task-title">
      <HSectionTitle>审批流程</HSectionTitle>
    </div>
    <div class="h-task-content">
      <TaskItem
        v-for="(task, index) in tasks"
        :key="task.taskId"
        :task="task"
        :selected="selectValue === task.taskId"
        :disabled="task.nodeName == '开始'"
        :last="index === tasks.length - 1"
        @itemClick="onItemClick($event, index)"
      />
    </div>
  </div>
</template>

<script name="HTaskNode" setup>
import { last, slice, takeRightWhile } from 'lodash'

import HSectionTitle from '@/components/sectionTitle/HSectionTitle.vue'
import useVModel from '@/hooks/useVModel'

import TaskItem from './TaskItem.vue'
const props = defineProps({
  tasks: { type: Array, default: () => [] },
  value: String,
  nodes: { type: Array, default: () => [] }
})

const emit = defineEmits(['itemClick'])
const { value, nodes, tasks } = toRefs(props)
const [selectValue, setSelectValue] = useVModel({ value, defaultValue: '' })
const [nodesValue, setNodesValue] = useVModel({
  value: nodes,
  defaultValue: [],
  eventName: 'update:nodes',
  propName: 'nodes'
})
const onItemClick = task => {
  setSelectValue(task.taskId)
  emit('itemClick', task, nodesValue.value)
}

function setNodes(taskId) {
  const index = props.tasks.findIndex(t => t.taskId === taskId)
  if (index < 0) {
    return []
  }

  const taskChunk = takeRightWhile(slice(props.tasks, 0, index + 1), t => {
    return t.nodeName !== '开始'
  })
  setNodesValue(taskChunk)
  return taskChunk
}

watch(
  tasks,
  newTasks => {
    const lastTask = last(newTasks)
    if (lastTask) {
      setSelectValue(lastTask.taskId)
    }
  },
  { immediate: true }
)

watch(
  selectValue,
  newSelect => {
    setNodes(newSelect)
  },
  { immediate: true }
)
</script>

<style lang="less" scoped>
.h-task-node {
  padding: 12px;
  border-radius: 3px;
}
</style>
