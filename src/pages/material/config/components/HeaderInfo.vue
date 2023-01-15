<template>
  <div class="list-item">
    <div class="list-item__main">
      <span class="list-item__name" :title="item.name">
        {{ item.name }}
      </span>
    </div>
    <div class="list-item__sub">
      <span class="list-item__subItem" :title="item.brand">
        品牌：{{ item.brand }}
      </span>
      <span class="list-item__subItem" :title="item.batch">
        批号：{{ item.batch }}
      </span>
      <span class="list-item__subItem" :title="item.batch">
        总数量（箱）：{{ item.batch }}
      </span>
      <span class="list-item__subItem" :title="item.batch">
        平均单价（元）：{{ item.batch }}（不含税）
      </span>
      <span class="list-item__subItem" :title="item.batch">
        总价（元）：{{ item.batch }}
      </span>
      <span class="list-item__subItem" :title="item.spec">
        规格：{{ item.spec }}
      </span>
      <span class="list-item__subItem" :title="item.type">
        类型：{{ item.type }}
      </span>
      <span class="list-item__subItem" :title="item.type">
        总重量（kg）：{{ item.type }}
      </span>
      <span class="list-item__subItem" :title="item.type">
        车间1：{{ item.type }}
      </span>
      <span class="list-item__subItem" :title="item.type">
        车间2：{{ item.type }}
      </span>
    </div>
  </div>
</template>
<script name="HeaderInfo" setup>
const props = defineProps({
  item: {
    type: Object,
    default: () => {}
  }
})
const { item } = toRefs(props)
</script>
<style lang="less" scoped>
.list-item {
  width: 100%;
  padding: 0px 8px;
  cursor: pointer;
  font-size: 12px;
  &__main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }
  &__name {
    font-size: 16px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: rgba(0, 0, 0, 0.85);
  }
  &__subItem {
    display: inline-block;
    width: calc(20% - 4px);
    margin-right: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: rgba(0, 0, 0, 0.45);
  }
}
</style>
