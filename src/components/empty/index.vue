<template>
  <div class="empty-wrapper">
    <img class="empty-wrapper__icon" src="@/assets/img/empty.svg" alt="" />
    <span class="text text-center">
      {{ text }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'Empty',
  props: {
    text: {
      type: String,
      default: '暂无数据'
    }
  },
  data() {
    return {}
  },

  mounted() {}
}
</script>

<style lang="less" scoped>
.empty-wrapper {
  height: 100%;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &__icon {
    width: 64px;
    height: 64px;
  }
}
</style>
