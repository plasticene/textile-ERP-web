<template>
  <div class="item-card">
    <div class="item-card__main">
      <a-checkbox
        v-model="state"
        class="item-card__name"
        :title="info.machineSetName"
      >
        {{ info.machineSetName }}
        <a-tag>{{ info.serialNo }}</a-tag>
      </a-checkbox>
      <!-- <span class="item-card__name" :title="info.name">
        {{ info.name }}
      </span> -->
      <a-dropdown>
        <a-icon type="more" />
        <a-menu slot="overlay">
          <a-menu-item v-for="ele in Actions" :key="ele.key">
            <a href="javascript:;" @click="handleAction(ele.key, item)">
              {{ ele.label }}
            </a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
    <div class="item-card__sub">
      <span class="item-card__subItem" :title="info.workshopName">
        所属车间：{{ info.workshopName }}
      </span>
      <span
        class="item-card__subItem"
        :title="`${info.needle}针  ${info.size}寸  ${info.path}路`"
      >
        机台规格：{{ info.needle }}针 {{ info.size }}寸 {{ info.path }}路
      </span>
      <span class="item-card__subItem" :title="info.spec">
        所需原料：{{ info.spec }}
      </span>
      <span class="item-card__subItem" :title="info.productName">
        生成成品：{{ info.productName }}
      </span>
    </div>
  </div>
</template>
<script name="ItemCard" setup>
import useVModel from '@/hooks/useVModel'
const Actions = [
  {
    label: '换布',
    key: 'change'
  },
  {
    label: '编辑',
    key: 'edit'
  },
  {
    label: '删除',
    key: 'delete'
  }
]
const props = defineProps({
  value: {
    type: Boolean,
    default: false
  },
  info: {
    type: Object,
    default: () => {}
  }
})
const { value, info } = toRefs(props)
// eslint-disable-next-line
const [state, setState] = useVModel({ value, defaultValue: '' })
const emit = defineEmits(['action'])
const handleAction = (key, item) => {
  console.log('%c Line:29 🥛 key, item', 'color:#ea7e5c', key, item)
  emit('action', key, item)
}
</script>
<style lang="less" scoped>
.item-card {
  width: 100%;
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 2px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  &__main {
    height: 28px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }
  &__name {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &__subItem {
    display: inline-block;
    width: 100%;
    margin-right: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: rgba(0, 0, 0, 0.45);
  }
}
</style>
