import Big from 'big.js'

export function useDrag(initTransform) {
  const transform = ref(initTransform)

  const mouseDownHandler = e => {
    const { pageX: startX, pageY: startY } = e
    const { translateX, translateY } = transform.value
    const mouseMoveHandler = e => {
      const { pageX, pageY } = e
      transform.value = {
        translateX: translateX + pageX - startX,
        translateY: translateY + pageY - startY
      }
    }
    const mouseUpHandler = () => {
      document.removeEventListener('mousemove', mouseMoveHandler)
      document.removeEventListener('mouseup', mouseUpHandler)
    }

    document.addEventListener('mousemove', mouseMoveHandler)
    document.addEventListener('mouseup', mouseUpHandler)
  }

  const resetTransform = () => {
    transform.value = { ...initTransform }
  }

  return { transform, mouseDownHandler, resetTransform }
}

export function useMirror() {
  const mirror = ref(1)
  const onMirror = () => {
    mirror.value *= -1
  }
  const resetMirror = () => {
    mirror.value = 1
  }

  return { mirror, onMirror, resetMirror }
}

export function useScale(imageScale = { max: 2, min: 0.5, step: 0.1 }) {
  const { max, min, step } = imageScale
  const scale = ref(1)
  const x = new Big(step)
  const y = new Big(-step)

  const onZoomIn = () => {
    setScale(x.plus(scale.value).toNumber())
  }
  const onZoomOut = () => {
    setScale(y.plus(scale.value).toNumber())
  }
  const resetScale = () => {
    scale.value = 1
  }

  const setScale = newScale => {
    let value = newScale
    if (newScale < min) {
      value = min
    }
    if (newScale > max) {
      value = max
    }
    scale.value = value
  }

  return {
    scale,
    onZoomIn,
    onZoomOut,
    resetScale
  }
}

export function useRotate() {
  const rotate = ref(0)
  const ROTATE_DEG = 90

  const onRotate = () => {
    rotate.value += ROTATE_DEG
  }
  const resetRotate = () => {
    rotate.value = 0
  }

  return { rotate, onRotate, resetRotate }
}
