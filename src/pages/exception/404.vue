<template>
  <exception-page
    home-route="/dashboard/workplace"
    :style="`min-height: ${minHeight}`"
    type="404"
  />
</template>

<script>
import { mapState } from 'vuex'

import ExceptionPage from '@/components/exception/ExceptionPage'
export default {
  name: 'Exp404',
  components: { ExceptionPage },
  computed: {
    ...mapState('setting', ['pageMinHeight']),
    minHeight() {
      return this.pageMinHeight ? this.pageMinHeight + 'px' : '100vh'
    }
  }
}
</script>

<style scoped lang="less"></style>
