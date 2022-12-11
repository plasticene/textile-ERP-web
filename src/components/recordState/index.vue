<template>
  <div class="record-state">
    <a-badge v-bind="$attrs" />
    <div class="process">{{ process }}</div>
  </div>
</template>

<script>
export default {
  name: 'RecordState',
  props: ['process'],
  data() {
    return {}
  },
  mounted() {}
}
</script>

<style lang="less" scoped>
.process {
  padding-left: 14px;
  opacity: 0.5;
  margin-top: 2px;
  font-size: 12px;
}
</style>
