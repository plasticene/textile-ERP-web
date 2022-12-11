/**
 * @template T
 * @typedef {import('vue').Ref<T>} Ref
 */
const usePageTitle = (title, option = {}) => {
  const { prefix = '' } = option
  /**
   * @type {Ref<string>} 页面标题
   */
  const pageTitle = isRef(title) ? title : ref(title)
  const vm = getCurrentInstance().proxy

  const route = useRoute()

  onMounted(() => {
    pageTitle.value &&
      vm.$setPageTitle(route.fullPath, prefix + pageTitle.value)
  })

  watch(pageTitle, () => {
    pageTitle.value &&
      vm.$setPageTitle(route.fullPath, prefix + pageTitle.value)
  })

  return { pageTitle }
}

export { usePageTitle }
