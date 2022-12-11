<template functional>
  <div class="form-section-title">
    <slot>{{ props.title }}</slot>
  </div>
</template>

<script>
export default {
  name: 'SectionTitle',
  props: ['title']
}
</script>

<style lang="less" scoped>
.form-section-title {
  position: relative;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  color: var(--text-color-1);
  &:before {
    content: '';
    display: block;
    width: 12px;
    height: 12px;
    border: 4px solid #2f54eb;
    border-radius: 50%;
    margin-right: 4px;
    margin-bottom: 2px;
  }
}
</style>
