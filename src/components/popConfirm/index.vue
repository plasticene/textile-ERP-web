<template>
  <a-popconfirm
    v-bind="$attrs"
    :title="title"
    ok-text="确定"
    cancel-text="取消"
    @confirm="$emit('confirm')"
  >
    <a-button
      v-bind="buttonProps"
      :type="buttonType"
      :loading="loading"
      :style="{ color: textColor }"
    >
      {{ loading ? (loadingText ? loadingText : text + '中...') : text }}
    </a-button>
  </a-popconfirm>
</template>

<script>
export default {
  name: 'HPopConfirm',
  props: {
    title: { type: String, default: '确定删除该项么？' },
    loading: { type: Boolean },
    text: { type: String, default: '删除' },
    loadingText: { type: String },
    buttonType: { type: String, default: 'link' },
    textColor: { type: String },
    buttonProps: { type: Object, default: () => ({}) }
  }
}
</script>
