<template>
  <div class="change-list">
    <HSectionTitle class="mt-6x">变更记录</HSectionTitle>
    <a-timeline class="mt-6x">
      <a-timeline-item v-for="i in data" :key="i.changeDate + '-' + i.id">
        <div
          class="mb-2x change-time"
          :class="{ 'flex-space-between': showBtn }"
        >
          <div>
            <a-icon type="calendar" style="color: var(--color-text-3)" />

            {{ i.changeDate }}
          </div>

          <div
            v-if="showBtn"
            class="ant-btn-link"
            style="font-size: 14px"
            @click="onClick(i)"
          >
            详情
          </div>
        </div>

        <div class="text-desc">{{ i.changeContent }}</div>
      </a-timeline-item>
    </a-timeline>
  </div>
</template>

<script name="HChangeList" setup>
defineProps({
  data: { type: Array, default: () => [] },
  showBtn: { type: Boolean, default: false }
})

const emits = defineEmits(['itemClick'])

const onClick = i => {
  emits('itemClick', i)
}
</script>

<style scoped>
.change-time {
  color: var(--color-text-2);
  font-size: 16px;
}
</style>
