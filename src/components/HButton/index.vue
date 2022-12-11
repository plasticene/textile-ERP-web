<template>
  <div class="h-button" :class="{ 'h-btn-icon-wrap': iconOnly, block: block }">
    <a-tooltip v-if="iconOnly" placement="top">
      <template slot="title">
        <slot></slot>
      </template>
      <a-button v-bind="{ ...btnProps, type: 'link' }" v-on="$listeners" />
    </a-tooltip>
    <a-button v-else v-bind="btnProps" v-on="$listeners">
      <slot></slot>
    </a-button>
  </div>
</template>
<script name="HButton" setup>
import buttonTypes from 'ant-design-vue/es/button/buttonTypes'
import { omit } from 'lodash'
const props = defineProps({ ...buttonTypes(), iconOnly: Boolean })
const btnProps = computed(() => {
  return omit(props, ['iconOnly'])
})
</script>
<style lang="less" scoped>
.h-button {
  display: inline-block;
  &.block {
    display: block;
  }
}

.h-btn-icon-wrap {
  --icon-color: var(--color-text-2);
  cursor: pointer;
  // width: 24px;
  // height: 24px;
  // padding: 5px;
  border-radius: var(--border-radius-base);
  transition: all 0.3s ease;
  position: relative;
  z-index: 9;
  &:hover {
    --icon-color: var(--color-text-1);
    background: var(--color-fill-2);
  }
  &:active {
    --icon-color: var(--color-text-1);
    background: var(--color-fill-3);
  }

  &.is-disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  :deep(.ant-btn-icon-only) {
    width: 24px;
    height: 24px;
    font-size: inherit;
  }
}
</style>
