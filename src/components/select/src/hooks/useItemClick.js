import { CREATE } from './'

function useItemClick({
  isMulti,
  state,
  setState,
  createOptions,
  searchValue,
  isTags
}) {
  const selectRef = ref(null)
  const onClick = item => {
    if (isMulti.value) {
      const currentValue = state.value ? state.value : []
      if (currentValue.some(i => i === item.value)) {
        // 取消选中
        setState(
          currentValue.filter(i => i !== item.value),
          item
        )
      } else {
        // 多选添加
        setState([...currentValue, item.value], item)
      }
    } else {
      // 重新设置选中
      setState(item.value, item)
    }
    if (
      item[CREATE] == CREATE &&
      !createOptions.value.find(i => i.value == item.value)
    ) {
      createOptions.value.push(item)
    }

    if (searchValue.value) {
      searchValue.value = ''
    }

    if (isTags.value) {
      setTimeout(() => {
        // set empty
        // ant-select-search__field
        selectRef.value.$el.querySelector('.ant-select-search__field').value =
          ''
      }, 100)
    }
  }

  return { selectRef, onClick }
}

export { useItemClick }
