<template>
  <component
    :is="tag"
    class="h-section mb-4x"
    :class="{ 'is-section-close': !stateVisible }"
    :bordered="false"
  >
    <div
      class="flex-space-between h-section-title-wrap"
      :class="{ foldable: foldable }"
      @click="onClick"
    >
      <div v-if="!$slots.title" class="flex-align-center h-section-title-w">
        <HSectionTitle>
          {{ title }}
          <template #tips><slot name="tips"></slot></template>
        </HSectionTitle>
        <a-icon v-if="foldable" type="down" class="h-section-arrow op-5" />
      </div>

      <slot v-else name="title" :visible="stateVisible"></slot>
      <div v-if="$slots.extra" class="h-section-title-w">
        <slot name="extra"></slot>
      </div>
    </div>

    <transition name="h-slide">
      <div v-show="stateVisible" ref="content" class="h-section-content">
        <slot></slot>
      </div>
    </transition>
  </component>
</template>

<script name="HSection" setup>
import { isUndefined } from 'lodash'

const props = defineProps({
  tag: { type: String, default: 'div' },
  title: String,
  visible: { type: [Boolean, undefined], default: undefined },
  defaultVisible: { type: Boolean, default: true },
  foldable: { type: Boolean, default: true }
})

const emits = defineEmits(['update:visible'])
const stateVisible = ref(props.defaultVisible)
// max-height 实现的动画，
// 先看使用情况，如果可以就不更换方案
// 如果不行就用 js 来执行动画
const content = ref(null)
const height = ref(0)
const onClick = () => {
  if (!props.foldable) {
    return
  }
  if (content.value.offsetHeight > 0) {
    height.value = content.value.offsetHeight
  }
  if (isUndefined(props.visible)) {
    // 非受控组件
    stateVisible.value = !stateVisible.value
  } else {
    // 受控组件
    emits('update:visible', !props.visible)
  }
}

watchEffect(() => {
  if (!isUndefined(props.visible)) {
    stateVisible.value = props.visible
  }
})
</script>

<style lang="less" scoped>
.h-section {
  .h-section-title {
    margin-bottom: 0;
  }
  .h-section-content {
    margin-top: 12px;
    transition: all 0.3s ease;
  }
  &.is-section-close {
    .h-section-arrow {
      transform: rotate(0deg);
    }
  }
  .h-section-title-wrap {
    position: relative;
    z-index: 1;

    .h-section-title-w {
      position: relative;
      z-index: 2;
    }
    &.foldable {
      cursor: pointer;
    }

    &.foldable:after {
      content: '';
      display: block;
      background-color: var(--color-fill-2);
      height: calc(100% + 8px);
      width: calc(100% + 16px);
      position: absolute;
      top: -5px;
      left: -8px;
      z-index: 0;
      opacity: 0;
      transition: all 0.3s ease;
      border-radius: var(--border-radius-base);
    }

    &:hover {
      &:after {
        opacity: 1;
      }
    }
  }

  .h-section-arrow {
    transform: rotate(180deg);
    transition: all 0.3s ease;
    margin-left: 4px;
  }
}

.h-slide-enter, .h-slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  max-height: 0;
}
.h-slide-enter-to,
.h-slide-leave {
  opacity: 1;
  max-height: 1200px;
}
</style>
