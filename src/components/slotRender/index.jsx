export default {
  name: 'SlotRender',
  props: ['slotNode'],
  render() {
    return <div>{this.slotNode}</div>
  }
}
