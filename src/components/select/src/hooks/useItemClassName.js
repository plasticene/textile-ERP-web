const itemClassPrefix = 'ant-select-dropdown-menu'
function useItemClassName(isMulti, state) {
  const getSelected = computed(() => {
    return isMulti.value
      ? item => (state.value || []).includes(item.value)
      : item => state.value === item.value
  })

  const getItemClassName = item => {
    return {
      'h-virtual-item': true,
      [`${itemClassPrefix}-item`]: true,
      [`${itemClassPrefix}-item-selected`]: getSelected.value(item)
    }
  }

  return { getItemClassName }
}
export { useItemClassName }
