<template>
  <component :is="componentName" class="h-text">
    <slot></slot>
  </component>
</template>
<script name="HText" setup>
const componentName = computed(() => {
  return 'span'
})
</script>
<style lang="less" scoped>
.h-text {
}
</style>
