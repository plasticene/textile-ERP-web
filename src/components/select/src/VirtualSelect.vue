<template>
  <a-select
    ref="selectRef"
    class="h-select-virtual"
    v-bind="{ ...$attrs, ...$props }"
    show-search
    allow-clear
    :filter-option="false"
    :value="state"
    :options="selectOptions"
    v-on="selectListeners"
    @search="onSearch"
    @change="onChange"
  >
    <template #dropdownRender>
      <div @mousedown="Noop">
        <RecycleScroller
          v-if="selectOptions.length > 0"
          v-slot="{ item }"
          key-field="value"
          style="max-height: 200px"
          class="scroller"
          v-bind="scrollerProps"
          :items="selectOptions"
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

<script setup name="VirtualSelect">
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

import { Empty } from 'ant-design-vue'
import { isArray, isUndefined } from 'lodash'
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
  defaultSearchValue: String,
  customSearch: Boolean,
  fieldNames: {
    type: Object,
    default: () => ({ label: 'label', value: 'value' })
  },
  scrollerProps: {
    type: Object,
    default: () => ({})
  }
})
const { value } = toRefs(props)
const emits = defineEmits(['change', 'input', 'search', ''])
const { scrollerListeners, selectListeners } = useSelectInit()
// const selectRef = ref(null)

const { isTags, isMulti, Noop } = useMode(props)

const [state, setState] = useVModel({
  value: value,
  defaultValue: isMulti.value ? [] : ''
})
const { searchValue, selectOptions, createOptions } = useOptions(props, isTags)

const { getItemClassName } = useItemClassName(isMulti, state)

const onSearch = val => {
  console.log('on-search', val)
  if (!props.customSearch) {
    searchValue.value = val
  }
  if (val) {
    emits('search', val)
  }
}

const onChange = value => {
  console.log('onChange', value)
  if (isUndefined(value) || (isArray(value) && value.length == 0)) {
    // 删除操作 // 多选删除操作
    setState(value)
    return
  }
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
