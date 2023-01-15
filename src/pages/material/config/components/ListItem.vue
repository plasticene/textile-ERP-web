<template>
  <div class="list-item">
    <div class="list-item__main">
      <span class="list-item__name" :title="item.name">
        {{ item.name }}
      </span>
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
    <div class="list-item__sub">
      <span class="list-item__subItem" :title="item.brand">
        品牌：{{ item.brand }}
      </span>
      <span class="list-item__subItem" :title="item.batch">
        批号：{{ item.batch }}
      </span>
      <span class="list-item__subItem" :title="item.spec">
        规格：{{ item.spec }}
      </span>
      <span class="list-item__subItem" :title="item.type">
        类型：{{ item.type }}
      </span>
    </div>
  </div>
</template>
<script name="ListItem" setup>
import { Actions } from '@/utils/constant'
const props = defineProps({
  item: {
    type: Object,
    default: () => {}
  }
})
const { item } = toRefs(props)
const emit = defineEmits(['action'])
const handleAction = (key, item) => {
  console.log('%c Line:29 🥛 key, item', 'color:#ea7e5c', key, item)
  emit('action', key, item)
}
</script>
<style lang="less" scoped>
.list-item {
  width: 100%;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 12px;
  &__main {
    height: 28px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__name {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &__subItem {
    display: inline-block;
    width: calc(50% - 4px);
    margin-right: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: rgba(0, 0, 0, 0.45);
  }
}
</style>
