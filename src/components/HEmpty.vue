<template>
  <div class="flex-col h-empty flex-center">
    <svg-icon name="hc-empty" :size="240" />

    <div style="margin-top: -16px; text-align: center"><slot></slot></div>
  </div>
</template>

<script name="HEmpty" setup></script>

<style lang="less" scoped>
.h-empty {
  margin-top: -24px;
}
</style>
