<template functional>
  <div
    class="flex-center icon-wrap"
    :class="[data.class, data.staticClass]"
    :style="data.staticStyle"
    v-bind="attrs"
    v-on="listeners"
  >
    <slot></slot>
  </div>
</template>

<style lang="less" scoped>
.icon-wrap {
  cursor: pointer;
  // width: 24px;
  // height: 24px;
  padding: 5px;
  border-radius: var(--border-radius-base);
  transition: all 0.3s ease;
  position: relative;
  z-index: 9;
  &:hover {
    background: var(--color-fill-2);
  }
  &:active {
    background: var(--color-fill-4);
  }
  &.is-active {
    background: var(--color-fill-3);
  }

  &.is-disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
