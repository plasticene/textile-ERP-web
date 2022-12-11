<template>
  <a-card>
    <SectionTitle>{{ title }}</SectionTitle>
    <slot></slot>
  </a-card>
</template>

<script>
import SectionTitle from '@/components/sectionTitle/index.vue'
export default {
  name: 'HBaseCard',
  components: {
    SectionTitle
  },
  props: {
    title: String
  }
}
</script>
