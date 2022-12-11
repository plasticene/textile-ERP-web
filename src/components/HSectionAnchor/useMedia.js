function useMedia() {
  const reactiveSize = ref('default')

  const reduceMotionQuery = matchMedia('(min-width: 1366px)')
  reduceMotionQuery.addEventListener('change', mediaChange)

  function mediaChange() {
    if (reduceMotionQuery.matches) {
      // emits('update:size', 'default')
      reactiveSize.value = 'default'
    } else {
      // emits('update:size', 'small')
      reactiveSize.value = 'small'
    }
  }

  mediaChange()
  return { reactiveSize }
}

export default useMedia
