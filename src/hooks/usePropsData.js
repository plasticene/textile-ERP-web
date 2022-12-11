function usePropsData() {
  const vm = getCurrentInstance().proxy
  if (!vm) {
    throw new Error('hooks must be in setup')
  }
  return computed(() => {
    return vm.$options.propsData
  })
}
export { usePropsData }
