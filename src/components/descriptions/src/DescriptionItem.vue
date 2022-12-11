<template>
  <div class="label-value" :class="{ flex: !vertical }">
    <div class="label">
      {{ label }}
      <span v-if="!vertical" class="pdr-2x">:</span>
    </div>

    <div class="value" :class="{ 'is-link': isLink }" @click="handleClick">
      <slot name="value">
        {{ value }}
      </slot>
    </div>
  </div>
</template>

<script>
const urlRegex =
  /^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?$/
export default {
  name: 'DescriptionItem',
  props: {
    label: String,
    value: [String, Number],
    isLink: Boolean,
    to: [String, Object],
    url: String,
    vertical: { type: Boolean }
  },
  methods: {
    handleClick() {
      const { to } = this
      if (!to) return
      if (typeof to === 'string' && urlRegex.test(to)) {
        window.open(to, '_blank')
      } else {
        this.$router.push(to)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.label-value {
  line-height: 1.6;

  .label {
    // opacity: ;
    color: var(--color-neutral-6);
    flex-shrink: 0;
    padding-right: 4px;
  }

  &.flex {
    display: flex;
    .value {
      padding-top: 0;
      flex-grow: 1;
    }
  }
  .value {
    font-size: 14px;
    word-break: break-word;
    white-space: pre-line;
    line-height: 1.5;
    padding-top: 4px;
    color: var(--color-neutral-9);
    font-weight: 500;
    &.is-link {
      color: var(--primary-color);
      cursor: pointer;
      text-decoration: underline;
    }
  }
}
</style>
