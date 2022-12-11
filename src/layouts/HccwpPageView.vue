<template>
  <div class="hccwp-page">
    <div v-if="$slots.banner" class="banner"><slot name="banner"></slot></div>
    <div v-if="hasHead" class="pdb-4x pdt-4x pdl-6x pdr-6x">
      <div class="flex-space-between" :class="extraClassName">
        <div class="title">
          <slot name="title"></slot>
        </div>

        <slot name="extra"></slot>
      </div>
    </div>
    <div class="page-bg" :class="{ 'no-head': !hasHead && !hasBg }">
      <a-spin :spinning="spinning" style="height: 100%">
        <components :is="pageWrap" class="card">
          <slot></slot>
        </components>
      </a-spin>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HccwpPageView',
  props: {
    useACard: { type: Boolean, default: true },
    extraClassName: { type: String },
    spinning: { type: Boolean, default: false },
    hasBg: Boolean
  },
  computed: {
    hasHead({ $slots }) {
      const { title, extra } = $slots
      return title || extra
    },
    pageWrap({ hasHead, useACard }) {
      return hasHead && useACard ? 'a-card' : 'div'
    }
  },
  mounted() {
    console.log()
  }
}
</script>

<style lang="less" scoped>
@gutter: 24px;
.bg {
  background-color: #f5f7f9;
}
.hccwp-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 !important;
  .page-bg {
    .bg;
    // margin: 0 -@gutter;
    padding: @gutter;
    flex-grow: 2;
  }
  .page-bg.no-head {
    background-color: #fff;
    // padding-top: 0;
  }
}

.title {
  font-size: 18px;
}

.banner {
  // margin: -24px -24px 24px;
}
.flex {
  display: flex;
}
.flex-space-between {
  .flex;
  justify-content: space-between;
}
</style>
