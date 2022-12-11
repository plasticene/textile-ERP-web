<template>
  <div class="h-section-anchor flex" :class="reactiveSize">
    <div class="content">
      <slot></slot>
    </div>

    <a-affix
      v-if="showAnchor && isRender"
      :offset-top="20"
      :target="() => scrollView"
    >
      <a-spin size="small" :spinning="spinning">
        <div class="h-anchor">
          <i class="h-anchor-line">
            <i :style="{ top: lineTop + 'px' }"></i>
          </i>
          <div
            v-for="(item, index) in anchor"
            :key="item.id"
            class="h-anchor-item"
            :class="{ 'is-active': index === currentIndex }"
            @click="onClick(item, index)"
          >
            <a-tooltip v-if="reactiveSize === 'small'" placement="left">
              <div class="h-anchor-point-item__content">
                <i class="point"></i>
              </div>
              <template #title>
                <div>{{ item.text }}</div>
              </template>
            </a-tooltip>
            <div v-else class="h-anchor-item__content">{{ item.text }}</div>
          </div>
        </div>
      </a-spin>
    </a-affix>
  </div>
</template>

<script name="HSectionAnchor" setup>
import useMedia from './useMedia'
import useScroll from './useScroll'
const props = defineProps({
  manual: Boolean
  // size: {
  //   type: String
  //   // default: 'small'
  // }
})
const emits = defineEmits(['click', 'scroll'])
const {
  currentIndex,
  anchor,
  scrollView,
  spinning,
  render,
  bindScroll,
  lineTop
} = useScroll({
  emits
})

const { reactiveSize } = useMedia()

const showAnchor = ref(false)
const isRender = computed(() => {
  return !props.manual
})

const onClick = (item, index) => {
  scrollIntoView(item.el)

  currentIndex.value = index

  emits('click', index)
}

onMounted(() => {
  bindScroll()
  showAnchor.value = true
})
onActivated(() => {
  showAnchor.value = true
})

onDeactivated(() => {
  showAnchor.value = false
})

const scrollTo = params => {
  const index = params === 'last' ? anchor.value.length - 1 : params

  const item = anchor.value[index]
  if (item) {
    scrollIntoView(item.el)
  }
}

const scrollIntoView = el => {
  el.scrollIntoView({
    behavior: 'smooth'
  })
}

watch(() => props.size, render)
defineExpose({ scrollTo, rerender: render })
</script>

<style lang="less" scoped src="./index.less"></style>
