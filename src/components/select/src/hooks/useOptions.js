import isFunction from 'lodash/isFunction'

export const CREATE = Symbol('create')

function useOptions(props, isTags) {
  const createOptions = ref([])
  const searchValue = ref('')

  const isTagsOptions = computed(() => {
    return [...props.options, ...createOptions.value]
  })

  const computedOptions = computed(() => {
    return isTags.value ? isTagsOptions.value : props.options
  })

  const searchedOptions = computed(() => {
    if (!searchValue.value) {
      return computedOptions.value
    }
    const options = isTagsOptions.value.filter(op => {
      if (isFunction(props.filterOption)) {
        return props.filterOption(op)
      }
      return String(op.value).includes(String(searchValue.value))
    })

    if (isTags.value && options.length === 0) {
      const item = [
        {
          label: searchValue.value,
          value: searchValue.value,
          [CREATE]: CREATE
        }
      ]
      return item
    }

    return options
  })

  const selectOptions = computed(() => {
    return searchValue.value ? searchedOptions.value : computedOptions.value
  })
  return { selectOptions, searchValue, createOptions }
}

export { useOptions }
