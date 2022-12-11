<template>
  <a-select
    class="h-select"
    v-bind="{ ...$attrs, ...$props }"
    show-search
    :filter-option="false"
    :value="state"
    @popupScroll="onPopupScroll"
    @search="onSearch"
    @change="onChange"
  >
    <template #dropdownRender="menu">
      <div>
        <v-nodes :nodes="menu" />
      </div>
      <div style="text-align: center">
        <a-spin v-if="loading" />
      </div>
    </template>
    <a-select-option
      v-for="item in items"
      :key="item.value"
      :value="item.value"
    >
      {{ item.label }}
    </a-select-option>
  </a-select>
</template>

<script name="HSelect" setup>
import { Select } from 'ant-design-vue'
import { isUndefined } from 'lodash'
const props = defineProps({
  ...Select.props,
  defaultSearchValue: String,
  loadData: { type: Function, default: () => Promise.resolve() },
  fieldNames: {
    type: Object,
    default: () => ({ label: 'label', value: 'value' })
  }
})

const VNodes = {
  functional: true,
  render: (h, ctx) => ctx.props.nodes
}

const emit = defineEmits(['input'])

const state = ref(undefined)
const loading = ref(false)
const isFinished = ref(false)
const items = ref([])
const itemLength = ref(0)
const page = ref(1)
const total = ref(0)
const searchValue = ref('')

// 初始化加载
requestData()

const onSearch = value => {
  console.log(value)
  searchValue.value = value
  stateReset()
  requestData()
}

const onChange = v => {
  if (isUndefined(props.value)) {
    state.value = v
  } else {
    emit('input', v)
  }
}

const onPopupScroll = async e => {
  if (loading.value) return
  if (isFinished.value) return
  const { scrollTop, offsetHeight, scrollHeight } = e.target
  const resetHeight = scrollHeight - offsetHeight - scrollTop
  if (resetHeight <= 20) {
    page.value = page.value + 1
    requestData()
    return
  }
}

function stateReset() {
  items.value = []
  page.value = 1
  total.value = 1
  isFinished.value = false
}

async function requestData() {
  loading.value = true
  // doRequest
  const res = await props.loadData({
    data: {},
    page: { page: page.value, pageSize: 20 }
  })

  items.value.push(
    ...get(res, 'data.content.records', [])
      .filter(r => r.id > 0)
      .map(i => ({
        label: i[props.fieldNames.label],
        value: i[props.fieldNames.value]
      }))
  )

  console.log(items.value)
  itemLength.value = itemLength.value + 20
  page.value = get(res, 'data.content.current', 1)
  total.value = get(res, 'data.content.total', 0)

  if (itemLength.value >= total.value) {
    isFinished.value = true
  }
  loading.value = false
}

watchEffect(() => {
  if (!isUndefined(props.value) && props.value) {
    state.value = props.value
  }
})
</script>

<style lang="less" scoped>
.h-select {
}
</style>
