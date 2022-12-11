import Vue from 'vue'

import HImagePreview from './preview'
import { getAttach, handleParams } from './utils'
const instanceMap = new Map()

export const showPreview = props => {
  const options = handleParams(props)
  const { attach } = options
  console.log(attach)
  const attachDom = getAttach(attach)
  if (!instanceMap.get(attachDom)) {
    instanceMap.set(attachDom, null)
  }

  const p = instanceMap.get(attachDom)
  if (!p) {
    const instance = new Vue({
      ...HImagePreview
    }).$mount()
    instance.open({ ...options, visible: true })
    instanceMap.set(attachDom, instance)
    attachDom.appendChild(instance.$el)
  } else {
    p.open({ ...options, visible: true })
  }
}

export const ImagePreviewPlugin = showPreview

ImagePreviewPlugin.install = Vue => {
  // 这样定义后，可以通过 this.$message 调用插件
  Vue.prototype.$imagePreview = ImagePreviewPlugin
}

export const doImagePreview = ImagePreviewPlugin

export default ImagePreviewPlugin
