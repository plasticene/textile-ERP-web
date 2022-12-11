<template>
  <div class="h-section-title" :class="{ 'flex-space-between': $slots.extra }">
    <div class="flex-align-center title">
      <span class="h-title-text pdr-1x">
        <slot>{{ title }}</slot>
      </span>
      <a-tooltip v-if="$slots.tips" v-bind="toolTip">
        <template slot="title"><slot name="tips"></slot></template>
        <slot name="toolTipTrigger">
          <a-icon
            v-bind="{ type: 'question-circle', ...toolTipIcon }"
            style="font-size: 16px; opacity: 0.4"
          />
        </slot>
      </a-tooltip>
    </div>
    <slot name="extra"></slot>
  </div>
</template>

<script>
export default {
  name: 'HSectionTitle',
  props: {
    title: String,
    toolTip: { type: Object, default: () => ({}) },
    toolTipIcon: { type: Object, default: () => ({}) }
  }
}
</script>

<style lang="less" scoped>
.h-section-title {
  position: relative;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  color: var(--color-text-1);
  .title {
    color: var(--color-text-1);

    > span {
      color: inherit;
    }
  }
  .title:before {
    content: '';
    display: block;
    width: 12px;
    height: 12px;
    border: 4px solid var(--primary-color);
    border-radius: 50%;
    margin-right: 4px;
    margin-bottom: 2px;
  }
}
</style>
