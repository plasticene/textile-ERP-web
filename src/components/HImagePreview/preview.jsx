import './style/preview.less'

import { Icon } from 'ant-design-vue'
import { merge } from 'lodash'

import useVModel from '@/hooks/useVModel'

import HImageViewerBody from './base/ImageViewerBody'
import HImageViewerUtils from './base/ImageViewerUtils'
import HTransition from './base/Transition'
import { classNamePrefix, EVENT_CODE } from './constant'
import { useMirror, useRotate, useScale } from './hooks'
import propType from './propsType'
import { formatImages } from './utils'

/**
 * 定义vue Ref类型
 * @template T
 * @typedef {import('vue').Ref<T>} Ref
 */
/**
 * ImageInfo
 * @typedef {Object} ImageInfo
 * @property {string} mainImage 主要渲染的image
 * @property {string} [thumbnail] 缩略图
 * @property {boolean} [download] 是否可以下载
 * @property {string} [fileName] 文件名称
 */

export default defineComponent({
  name: 'HImagePreview',
  props: { ...propType },
  model: {
    prop: 'visible',
    event: 'change'
  },
  setup(props, { emit, expose, slots }) {
    const { visible } = toRefs(props)
    const [visibleValue, setVisibleValue] = useVModel({
      value: visible,
      defaultValue: props.defaultVisible,
      propName: 'visible'
    })

    const optionsValue = ref({
      images: []
    })

    const mergeProps = computed(() => {
      return merge(props, optionsValue.value)
    })

    /**  @type {Ref<ImageInfo>[]} ImageInfo[]  */
    const imagesList = computed(() => formatImages(mergeProps.value.images))

    /**  @type {Ref<ImageInfo>} currentImage */
    const currentImage = computed(
      () => imagesList.value[0] ?? { mainImage: '' }
    )

    const { mirror, onMirror, resetMirror } = useMirror()
    const { scale, onZoomIn, onZoomOut, resetScale } = useScale(
      props.imageScale
    )
    const { rotate, onRotate, resetRotate } = useRotate()

    const onRest = () => {
      resetMirror()
      resetScale()
      resetRotate()
    }

    // console.log('render')

    const open = options => {
      // emit('visible')
      // console.log(options)
      optionsValue.value = options
      setVisibleValue(true)
    }

    const onCloseHandle = ctx => {
      setVisibleValue(false)
      props.onClose?.(ctx)
      emit('close', ctx)
    }

    const closeBtnAction = e => {
      onCloseHandle({ e, trigger: 'close-btn' })
    }
    const clickOverlayHandler = e => {
      if (props.closeOnOverlay) {
        onCloseHandle({ e, trigger: 'overlay' })
      }
    }

    const keydownHandler = e => {
      switch (e.code) {
        //  case EVENT_CODE.left:
        //    prevImage()
        //    break
        //  case EVENT_CODE.right:
        //    nextImage()
        //    break
        case EVENT_CODE.up:
          onZoomIn()
          break
        case EVENT_CODE.down:
          onZoomOut()
          break
        case EVENT_CODE.esc:
          onCloseHandle({ e, trigger: 'esc' })
          break
        default:
          break
      }
    }

    const onWheel = e => {
      e.preventDefault()
      const { deltaY, ctrlKey } = e
      // mac触摸板双指缩放时ctrlKey=true，deltaY>0为缩小  <0为放大
      if (ctrlKey) {
        return deltaY > 0 ? onZoomOut() : onZoomIn()
      }
      deltaY > 0 ? onZoomIn() : onZoomOut()
    }

    watch(
      () => visibleValue.value,
      val => {
        if (val) {
          window.addEventListener('keydown', keydownHandler)
          return
        }
        window.removeEventListener('keydown', keydownHandler)
      }
    )

    expose({ open, onZoomIn, onZoomOut, onMirror, onRest, onRotate })

    const renderTitle = () => {
      const { title } = mergeProps.value
      if (typeof title === 'function') {
        return title()
      }
      if (typeof title === 'string') {
        return title
      }
      if (slots.title) {
        return slots.title()
      }
    }
    return () => (
      <HTransition visible={visibleValue.value}>
        <div class={`${classNamePrefix}`} onWheel={onWheel}>
          <div class={`${classNamePrefix}-close`} onClick={closeBtnAction}>
            <Icon type="close" style={{ color: '#fff', fontSize: '16px' }} />
          </div>
          {(mergeProps.value.title || currentImage.value.fileName) && (
            <div class={`${classNamePrefix}-title`}>
              {mergeProps.value.title
                ? renderTitle()
                : currentImage.value.fileName}
            </div>
          )}
          <HImageViewerBody
            image={currentImage.value.mainImage}
            scale={scale.value}
            rotate={rotate.value}
            mirror={mirror.value}
          />
          <HImageViewerUtils
            zoomInHandler={onZoomIn}
            zoomOutHandler={onZoomOut}
            mirrorHandler={onMirror}
            resetHandler={onRest}
            rotateHandler={onRotate}
            scale={scale}
            currentImage={currentImage}
          />
          <div class={'h-mask'} onClick={clickOverlayHandler}></div>
        </div>
      </HTransition>
    )
  }
})
