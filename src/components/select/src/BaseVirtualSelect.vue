<template>
  <a-select
    ref="selectRef"
    v-bind="{ ...$attrs, ...omit(props, ['options', 'value']) }"
    class="h-select-virtual"
    :options="options"
    :value="state"
    @search="onSearch"
    @change="onChange"
    v-on="selectListeners"
  >
    <template #dropdownRender>
      <div @mousedown="Noop">
        <RecycleScroller
          v-if="options.length > 0"
          v-slot="{ item }"
          style="max-height: 200px"
          class="scroller"
          v-bind="options"
          key-field="value"
          :items="options"
          :item-size="32"
          v-on="scrollerListeners"
        >
          <div :class="getItemClassName(item)" @click.stop="onItemClick(item)">
            {{ item.label }}
            <a-icon
              v-if="isMulti"
              type="check"
              class="ant-select-selected-icon"
            />
          </div>
        </RecycleScroller>

        <a-empty v-else :image="Empty.PRESENTED_IMAGE_SIMPLE" />
      </div>
    </template>
  </a-select>
</template>

<script setup name="BaseVirtualSelect">
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

import { Empty } from 'ant-design-vue'
import { omit } from 'lodash'
import { RecycleScroller } from 'vue-virtual-scroller'

import { useVModel } from '@/hooks'

import {
  useItemClassName,
  useItemClick,
  useMode,
  useOptions,
  useSelectInit
} from './hooks'
import propsType from './props'
const props = defineProps({
  ...propsType,
  fieldNames: {
    type: Object,
    default: () => ({ label: 'label', value: 'value' })
  },
  scrollerProps: {
    type: Object,
    default: () => ({})
  }
})
const emits = defineEmits(['change', 'input', 'search', ''])
const { value } = toRefs(props)
const { isTags, isMulti, Noop } = useMode(props)

const { scrollerListeners, selectListeners } = useSelectInit()

const [state, setState] = useVModel({
  value: value,
  defaultValue: isMulti.value ? [] : ''
})
const { getItemClassName } = useItemClassName(isMulti, state)
const { searchValue, createOptions } = useOptions(props, isTags)

const onSearch = val => {
  if (val) {
    emits('search', val)
  }
}

const onChange = value => {
  console.log('onChange', value)
  setState(value)
}

const { selectRef, onClick } = useItemClick({
  isMulti,
  isTags,
  state,
  setState,
  createOptions,
  searchValue
})

const onItemClick = item => {
  onClick(item)
}
</script>
<style lang="less" scoped>
.vue-recycle-scroller.direction-vertical:not(.page-mode) {
  overflow-y: auto;
  overflow-y: overlay;
}
</style>
