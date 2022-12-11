function useMode(props) {
  const isTags = computed(() => {
    return props.mode === 'tags'
  })
  const isMultiple = computed(() => {
    return props.mode === 'multiple'
  })

  const isMulti = computed(() => {
    return isTags.value || isMultiple.value
  })

  const Noop = computed(() => {
    return isMulti.value ? e => e.preventDefault() : () => {}
  })
  return { isTags, isMultiple, isMulti, Noop }
}

export { useMode }
