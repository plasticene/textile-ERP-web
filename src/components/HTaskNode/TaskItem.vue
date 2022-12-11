<template>
  <div
    class="h-task-item"
    :class="{ 'is-disabled': disabled, 'is-selected': selected }"
    @click="onClick(task)"
  >
    <div class="h-task-item-tail">
      <div class="h-task-item-dot-wrap">
        <i class="h-task-item-dot"></i>
      </div>
      <div v-if="!last" class="h-task-item-line"></div>
    </div>

    <div class="h-task-item-content">
      <div class="">
        <div
          v-if="!disabled"
          class="h-task-item-tag"
          size="small"
          :style="`color:${radioConfig[task.result].color}`"
        >
          {{ task.resultDesc }}
          <i
            class="h-task-item-tag-bg"
            :style="`background:${radioConfig[task.result].color}`"
          ></i>
        </div>
        {{ transformNodeName(task.nodeName) }}
      </div>

      <div v-if="task.opinion" class="h-task-item-desc">
        <HTextTooltip :size="10" :text="task.opinion" />
      </div>
    </div>
  </div>
</template>

<script name="HTaskItem" setup>
import { radioConfig } from '@/utils/dict'

const props = defineProps({
  task: { type: Object, default: () => ({}) },
  disabled: Boolean,
  selected: Boolean,
  last: Boolean
})
const emit = defineEmits(['itemClick'])

const transformNodeName = name => {
  return name.replace(/[0-9]/, '')
}

const onClick = task => {
  if (props.disabled) {
    return
  }
  emit('itemClick', task)
}
</script>

<style lang="less" scoped src="./task-item.less"></style>
