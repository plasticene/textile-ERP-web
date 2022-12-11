import { isString } from 'lodash'

import { DEFAULT_Z_INDEX } from './constant'
export const getAttach = (node, triggerNode) => {
  const attachNode = typeof node === 'function' ? node(triggerNode) : node
  if (!attachNode) {
    return document.body
  }
  if (isString(attachNode)) {
    return document.querySelector(attachNode)
  }
  if (attachNode instanceof HTMLElement) {
    return attachNode
  }
  return document.body
}

const defaultImagePreviewOptions = {
  attach: 'body',
  zIndex: DEFAULT_Z_INDEX,
  placement: 'top'
}

export function handleParams(params = {}) {
  const options = {
    ...defaultImagePreviewOptions,
    ...params
  }

  return options
}

const isImageInfo = image => typeof image !== 'string'

export const formatImages = images => {
  if (!Array.isArray(images)) return []
  return images.map(item => {
    if (isImageInfo(item)) {
      return {
        download: true,
        thumbnail: item.mainImage,
        ...item
      }
    }
    return {
      mainImage: item,
      thumbnail: item,
      download: true
    }
  })
}

export const downloadFile = function (imgSrc, fileName) {
  const image = new Image()
  const name = fileName
    ? fileName
    : imgSrc?.split?.('/').pop() || Math.random().toString(32).slice(2)

  image.setAttribute('crossOrigin', 'anonymous')

  image.onload = () => {
    const canvas = document.createElement('canvas')
    canvas.width = image.width
    canvas.height = image.height

    const context = canvas.getContext('2d')
    context.drawImage(image, 0, 0, image.width, image.height)
    canvas.toBlob(blob => {
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.download = name
      a.href = url
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    })
  }
  image.src = imgSrc
}
