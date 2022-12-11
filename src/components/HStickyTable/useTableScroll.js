const useTableScroll = props => {
  const scrollRef = ref(null)
  const tableRef = ref(null)
  const tableBodyDOM = ref(null)

  const showScrollBar = ref(false)
  const scrollWidth = ref(false)

  const scrollControl = ref('table-body-scroll')
  nextTick(() => {
    if (!tableRef.value) {
      return
    }

    tableBodyDOM.value = tableRef.value.$el.querySelector('.ant-table-body')
    toggleShowScrollBar()
    tableBodyDOM.value.addEventListener('scroll', onTBodyScroll, false)

    window.addEventListener('resize', toggleShowScrollBar)
  })

  onBeforeUnmount(() => {
    tableBodyDOM.value &&
      tableBodyDOM.value.removeEventListener('scroll', onTBodyScroll, false)
  })

  watch(scrollRef, scrollDOM => {
    if (!scrollDOM) return
    const antTableDOM = tableRef.value.$el.querySelector('.ant-table')

    antTableDOM.insertAdjacentElement('afterend', scrollDOM.parentNode)
  })
  watch(
    () => props.dataSource,
    dataSource => {
      if (dataSource.length === 0) {
        return
      }
      nextTick(() => {
        if (!tableBodyDOM.value) {
          return
        }
        toggleShowScrollBar()
      })
    },
    {
      immediate: true
    }
  )

  function toggleShowScrollBar() {
    const { clientWidth } = tableBodyDOM.value
    scrollWidth.value = tableBodyDOM.value.scrollWidth
    if (tableBodyDOM.value.scrollWidth === clientWidth) {
      showScrollBar.value = false
    } else {
      showScrollBar.value = true
    }
  }
  function onScrollMouseover() {
    scrollControl.value = 'custom-scroll-bar'
  }

  function onScrollMouseleave() {
    scrollControl.value = 'table-body-scroll'
  }
  function onCustomScroll(e) {
    if (!tableBodyDOM.value) return
    if (scrollControl.value == 'table-body-scroll') return

    tableBodyDOM.value.scrollLeft = e.target.scrollLeft
  }
  function onTBodyScroll(e) {
    if (!scrollRef.value) return
    if (scrollControl.value == 'custom-scroll-bar') return

    scrollRef.value.scrollLeft = e.target.scrollLeft
  }

  return {
    scrollRef,
    tableRef,
    showScrollBar,
    scrollWidth,
    onCustomScroll,
    onScrollMouseover,
    onScrollMouseleave
  }
}

export { useTableScroll }
