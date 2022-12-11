<script lang="jsx">
export default {
  functional: true,
  props: {
    title: String
  },

  render: function (h, context) {
    const className = context.data.class
    const staticClass = context.data.staticClass

    console.log()
    // h(
    //   'div',
    //   {
    //     ...context.data,
    //     class: `title ${className ? className : ''} ${
    //       staticClass ? staticClass : ''
    //     }`
    //   },
    //   context.children
    // )
    return (
      <div class={`page-view-title ${className} ${staticClass}`}>
        {context.scopedSlots['title-prefix']?.()}
        <div class="title">{context.props.title}</div>
        {context.scopedSlots['title-affix']?.()}
      </div>
    )
  }
}
</script>
<style lang="less" scoped>
.page-view-title {
  .title {
    font-size: 24px;
    color: var(--color-text-1);
    font-weight: 500;
  }
  .title-affix {
    font-size: 13px;
  }
}
</style>
