<template>
  <div
    class="detail-footer"
    :class="{ 'is-show': show }"
    :style="{
      'padding-left': paddingLeft
    }"
  >
    <a-button v-if="showBack" class="mr-2x" type="link" @click="closeThisPage">
      返回
    </a-button>
    <slot></slot>
  </div>
</template>

<script>
import { typeOf } from '@/utils/util'
export default {
  name: 'HDetailFooter',
  props: { showBack: [Boolean, String] },
  inject: ['adminLayout', 'remove'],
  data() {
    return {
      show: false
    }
  },
  computed: {
    paddingLeft({ adminLayout }) {
      return adminLayout.sideMenuWidth || '256px'
    }
  },
  mounted() {
    if (!this.show) this.showFooter()
  },
  activated() {
    this.showFooter()
  },
  beforeDestroy() {
    this.show = false
  },
  deactivated() {
    this.show = false
  },
  methods: {
    showFooter() {
      this.show = false
      setTimeout(() => {
        this.show = true
      }, 300)
    },
    closeThisPage() {
      const { showBack } = this
      this.remove(
        this.$route.path,
        typeOf(showBack, 'String') ? showBack : null
      )
    }
  }
}
</script>
<style lang="less" scoped>
.detail-footer {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 44px;
  width: 100vw;
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(10px);
  box-shadow: 0px -2px 5px fade(@gray-11, 5%);
  border-top: 1px solid rgb(243, 242, 242);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 14;
  padding-left: 0px;
  transition: all 0.3s ease-in-out;
  opacity: 0;
  transform: translateY(44px);
  &.is-show {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
