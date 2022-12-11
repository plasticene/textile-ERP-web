/**
 *
 * @typedef {Object} Option
 * @property {boolean} closeOnOverlay 是否在点击遮罩层时，触发预览关闭
 * @property {boolean} draggable 是否允许拖拽调整位置。
 *                               mode=modal 时，默认不允许拖拽；mode=modeless 时，默认允许拖拽
 * @property {Object} imageScale 图片缩放相关配置。
 *                               imageScale.max 缩放的最大比例；
 *                               imageScale.min 缩放的最小比例；
 *                               imageScale.step 缩放的步长速度。
 *                               TS 类型：ImageScale
 *                               interface ImageScale { max: number; min: number; step: number }
 * @property {Array} images 图片数组。
 *                          mainImage 表示主图，必传；
 *                          thumbnail 表示缩略图，如果不存在，则使用主图显示；
 *                          download 是否允许下载图片，默认允许下载。
 *                          示例: ['img_url_1', 'img_url_2']， [{ thumbnail: 'small_image_url', mainImage: 'big_image_url', download: false }]。
 *                          TS 类型：Array<string | ImageInfo>
 *                          interface ImageInfo { mainImage: string; thumbnail?: string; download?: boolean }。
 * @property {Number} index 当前预览图片所在的下标。支持语法糖 .sync
 * @property {Number} defaultIndex 当前预览图片所在的下标。非受控属性
 * @property {String} mode 模态预览（modal）和非模态预览（modeless)。可选项：modal/modeless
 * @property {Boolean} showOverlay	 是否显示遮罩层。mode=modal 时，默认显示；mode=modeless 时，默认不显示
 * @property {Boolean} title	 预览标题。
 * @property {Boolean} trigger	 触发图片预览的元素，可能是一个预览按钮，可能是一张缩略图，完全自定义。
 * @property {Boolean} viewerScale	 限制预览器缩放的最小宽度和最小高度，仅 mode=modeless 时有效。
 * @property {Number} zIndex	 层级，默认为 2000
 * @property {Number} onClose	 关闭时触发，事件参数包含触发关闭的来源：关闭按钮、遮罩层、ESC 键
 * @property {Number} onIndexChange	 预览图片切换时触发，context.prev 切换到上一张图片，context.next 切换到下一张图片
 */

/**
 * @description:
 * @param {Option} options
 * @return {Option}
 */
export const defineOptions = options => {
  return options
}

export default {
  /** 是否展示关闭按钮，值为 `true` 显示默认关闭按钮；值为 `false` 则不显示关闭按钮；也可以完全自定义关闭按钮 */
  closeBtn: {
    type: [Boolean, Function],
    default: true
  },
  /** 是否在点击遮罩层时，触发预览关闭 */
  closeOnOverlay: Boolean,
  /** 是否允许拖拽调整位置。`mode=modal` 时，默认不允许拖拽；`mode=modeless` 时，默认允许拖拽 */
  draggable: {
    type: Boolean,
    default: undefined
  },
  /**  图片缩放相关配置。`imageScale.max` 缩放的最大比例；`imageScale.min` 缩放的最小比例；`imageScale.step` 缩放的步长速度 */
  imageScale: {
    type: Object
  },
  /** 图片数组。`mainImage` 表示主图，必传；`thumbnail` 表示缩略图，如果不存在，则使用主图显示；`download` 是否允许下载图片，默认允许下载。示例: `['img_url_1', 'img_url_2']`，`[{ thumbnail: 'small_image_url', mainImage: 'big_image_url', download: false }]` */
  images: {
    type: Array,
    default: () => []
  },
  /** 当前预览图片所在的下标 */
  index: {
    type: Number,
    default: undefined
  },
  /** 当前预览图片所在的下标，非受控属性 */
  defaultIndex: {
    type: Number
  },
  /** 模态预览（modal）和非模态预览（modeless) */
  mode: {
    type: String,
    default: 'modal',
    validator(val) {
      if (!val) return true
      return ['modal', 'modeless'].includes(val)
    }
  },
  /** 切换预览图片的左图标，可自定义 */
  navigationArrow: {
    type: [Boolean, Function],
    default: true
  },
  /** 是否显示遮罩层。`mode=modal` 时，默认显示；`mode=modeless` 时，默认不显示 */
  showOverlay: {
    type: Boolean,
    default: undefined
  },
  /** 预览标题 */
  title: {
    type: [String, Function]
  },
  /** 触发图片预览的元素，可能是一个预览按钮，可能是一张缩略图，完全自定义 */
  trigger: {
    type: [String, Function]
  },
  /** 限制预览器缩放的最小宽度和最小高度，仅 `mode=modeless` 时有效 */
  viewerScale: {
    type: Object
  },
  /** 隐藏/显示预览 */
  visible: {
    type: Boolean,
    default: undefined
  },
  /** 隐藏/显示预览，非受控属性 */
  defaultVisible: Boolean,
  /** 层级，默认为 2000 */
  zIndex: {
    type: Number
  },
  /** 关闭时触发，事件参数包含触发关闭的来源：关闭按钮、遮罩层、ESC 键 */
  onClose: Function,
  /** 预览图片切换时触发，`context.prev` 切换到上一张图片，`context.next` 切换到下一张图片 */
  onIndexChange: Function
}
