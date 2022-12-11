import { debounce } from 'lodash'
const getSectionDOMs = () => {
  return Array.from(document.querySelectorAll('.h-section-title'))
}

function useScroll({ emits }) {
  const currentIndex = ref(0)
  const anchor = ref([])
  const scrollView = ref(null)
  const spinning = ref(true)
  const lineTop = ref(6)

  const bindScroll = debounce(() => {
    if (!scrollView.value) {
      return undefined
    }
    const containerRect = scrollView.value.getBoundingClientRect()
    const sectionDOMs = getSectionDOMs()

    const index = sectionDOMs.findIndex(item => {
      const { top } = item.getBoundingClientRect()
      const offsetTop = top - containerRect.top + 10

      if (offsetTop >= 0 && offsetTop <= containerRect.height / 2) {
        return item
      }
      return false
    })
    currentIndex.value = index < 0 ? 0 : index

    nextTick(() => {
      emits('scroll', currentIndex.value)
    })
  }, 300)

  watch(currentIndex, () => {
    lineTop.value = currentIndex.value * 32 + 6
  })

  nextTick(() => {
    setTimeout(() => {
      scrollView.value = document.querySelector('.hccwp-page.page-container')
      scrollView.value &&
        scrollView.value.addEventListener('scroll', bindScroll)
    }, 450)
    setTimeout(() => {
      render()
    }, 600)
  })

  onUnmounted(() => {
    scrollView.value &&
      scrollView.value.removeEventListener('scroll', bindScroll)
  })

  function render() {
    const sectionDOMs = getSectionDOMs()
    anchor.value = sectionDOMs.map((el, index) => {
      const text = el.querySelector('.h-title-text').innerText
      return {
        text,
        id: `${text}-${index}`,
        el
      }
    })
    spinning.value = false
  }

  return {
    currentIndex,
    anchor,
    scrollView,
    spinning,
    lineTop,
    render,
    bindScroll
  }
}

export default useScroll
