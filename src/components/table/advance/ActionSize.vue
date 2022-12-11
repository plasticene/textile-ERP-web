<template>
  <div ref="root" class="action-size">
    <a-dropdown
      v-model="visible"
      placement="bottomCenter"
      :trigger="['click']"
      :get-popup-container="() => $refs.root"
    >
      <a-tooltip title="密度">
        <div class="action-wrap" :class="{ 'is-active': visible }">
          <a-icon class="action" type="column-height" />
        </div>
      </a-tooltip>
      <a-menu slot="overlay" :selected-keys="[value]" @click="onClick">
        <a-menu-item key="default">默认</a-menu-item>
        <a-menu-item key="middle">中等</a-menu-item>
        <a-menu-item key="small">紧密</a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
export default {
  name: 'ActionSize',
  props: ['value'],
  inject: ['table'],
  data() {
    return {
      visible: false
    }
  },
  methods: {
    onClick({ key }) {
      this.$emit('input', key)
    }
  }
}
</script>
<style lang="less" scoped>
.action-size {
  display: inline-block;
}
</style>
