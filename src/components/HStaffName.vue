<template function>
  <span class="h-staff-name">
    <span>{{ name || '-' }}</span>
    <span v-if="staffNo" class="tag-info">{{ staffNo }}</span>
  </span>
</template>

<script name="HStaffName" setup>
defineProps({
  name: { type: String, required: true },
  staffNo: String
})
</script>

<style lang="less" scoped>
.h-staff-name {
}
</style>
