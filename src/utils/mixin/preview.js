import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'

import PhotoSwipe from 'photoswipe/dist/photoswipe'
import PhotoSwipeUI from 'photoswipe/dist/photoswipe-ui-default'
import createPreviewDirective from 'vue-photoswipe-directive'

const previewObject = createPreviewDirective(
  {
    shareEl: false, // 隐藏分享按钮
    history: false, // 禁用 history 模式
    clickToCloseNonZoomable: false, // 禁止图像小于视口大小时，鼠标点击图像会关闭图库
    bgOpacity: 0.8, // 背景透明度
    allowPanToNext: false, // 禁止图片放大时滑动到上/下一页,
    maxSpreadZoom: 2
  },
  PhotoSwipe,
  PhotoSwipeUI
)

export default {
  directives: {
    preview: {
      ...previewObject,
      // 复写指令，添加条件判断
      inserted(el, binding) {
        binding.value && previewObject.inserted(el, binding)
      }
    }
  }
}
