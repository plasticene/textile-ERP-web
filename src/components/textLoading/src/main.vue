<template>
  <div class="text-loading-wrap">
    <transition name="fade">
      <div v-if="loading" class="text-loading">
        <i class="dash"></i>
      </div>

      <div v-else class="text-loading-body">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'TextLoading',
  props: { loading: Boolean },
  data() {
    return {}
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
.text-loading {
  padding-left: 4px;
  &:before,
  &:after,
  .dash {
    display: inline-block;
    content: '';
    width: 3px;
    height: 3px;
    background-color: #000;
    margin-right: 4px;
    animation: textLoading 0.6s ease infinite;
    animation-direction: alternate;
  }
  &:before {
    animation-delay: 0s;
  }
  &:after {
    animation-delay: 0.6s;
  }
  .dash {
    animation-delay: 0.3s;
  }
}

@keyframes textLoading {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.fade-enter-active {
  animation: textLoading 0.5s reverse;
}
.fade-leave-active {
  animation: textLoading 0.5s;
}
</style>
