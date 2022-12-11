<template>
  <div class="homePre-wrapper">
    <HomeLayout ref="homelayout" :layout="layout" :section-tree="sectionTree" />
  </div>
</template>

<script>
import HomeLayout from './HomeLayout'
export default {
  name: 'HomePreview',
  components: { HomeLayout },
  props: {
    layout: {
      type: Array,
      default: () => {
        return []
      }
    },
    sectionTree: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {}
  },
  computed: {},
  created() {},
  methods: {}
}
</script>

<style>
.homePre-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}
</style>
