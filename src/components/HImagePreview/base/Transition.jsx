export default defineComponent({
  name: 'HTransition',
  props: {
    visible: Boolean
  },
  setup(props, { slots }) {
    return () => (
      <transition duration={300} name={`zoom__vue`}>
        {props.visible && slots.default?.()}
      </transition>
    )
  }
})
