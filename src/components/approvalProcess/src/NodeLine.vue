<template>
  <a-timeline class="approval-node-line">
    <a-timeline-item
      v-for="item in list"
      :key="item.name"
      :color="item.state.color"
      :class="{ 'is-disabled': !item.endDate }"
    >
      <div class="flex">
        <div
          v-if="item.state.text"
          class="mr-2x tag"
          :style="`color:${item.state.color}`"
        >
          <span>{{ item.state.text }}</span>
          <div
            class="tag-bg"
            :style="`background-color:${item.state.color}`"
          ></div>
        </div>
        <span class="node-name">{{ item.nodeName }}</span>
      </div>
      <a-space class="flex mt-2">
        <span v-if="item.assignee">{{ item.assignee }}</span>
        <img v-if="item.sign" class="sign-img" :src="item.sign" />
        <template v-if="item.endDate">
          <span class="opacity-40">·</span>
          <span class="opacity-40">
            {{ item.endDate }}
          </span>
        </template>
      </a-space>
      <div v-if="item.opinion" class="desc">{{ item.opinion }}</div>
    </a-timeline-item>
  </a-timeline>
</template>

<script setup name="HApproveNodeLine">
import { radioConfig } from '@/utils/dict.js'

const props = defineProps({
  dataSource: {
    type: Array
  }
})
const getResult = item => {
  const result = radioConfig[item.result]
  return result
    ? result
    : {
        color: 'var(--color-fill-4,#C9CDD4)'
      }
}
const list = computed(() => {
  return props.dataSource
    ? props.dataSource.map(item => {
        return {
          ...item,
          state: {
            ...getResult(item)
          }
        }
      })
    : []
})
</script>

<style lang="less" scoped>
.approval-node-line {
  padding-top: 8px;
}
.is-disabled {
  opacity: 0.4;
}
.flex {
  display: flex;
  color: var(--color-text-2, #4e5969);
}

.node-name {
}

.sign-img {
  width: 80px;
}
.opacity-40 {
  opacity: 0.4;
}
.desc {
  padding: 6px 8px;
  background-color: var(--color-fill-2, rgba(247, 248, 250, 1));
  font-size: 13px;
  color: var(--color-text-3, #86909c);
  margin-top: 8px;
  border-radius: 4px;
}

.mt-2 {
  margin-top: 4px;
}
.tag {
  font-size: 12px;
  padding: 1px 4px 0;
  border-radius: 2px;
  // color: var(--color-white);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  &-bg {
    background-color: #fff;
    position: absolute;
    height: 100%;
    width: 100%;
    opacity: 0.1;
    top: 0;
    left: 0;
  }
}
</style>
