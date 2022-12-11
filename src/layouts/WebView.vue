<template>
  <iframe class="web-view" :src="src"></iframe>
</template>

<script>
export default {
  name: 'webView',
  data() {
    return {
      src: ''
    }
  },
  mounted() {
    const { target } = this.$route.query
    if (target) {
      this.src = target
    }
  }
}
</script>
<style lang="less" scoped>
.web-view {
  width: 100%;
  height: 100%;
  border: 0px solid transparent;
  padding: 0 !important;
  display: block;
}
</style>
