import { Space } from 'ant-design-vue'
import Big from 'big.js'

import { HButton } from '@/components'

import { classNamePrefix } from '../constant'
import { downloadFile } from '../utils'

export default defineComponent({
  name: 'HImageViewerUtils',
  props: {
    scale: Number,
    rotateHandler: Function,
    zoomInHandler: Function,
    zoomOutHandler: Function,
    mirrorHandler: Function,
    resetHandler: Function,
    currentImage: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  setup(props) {
    const b = new Big(100)
    const scale = computed(() => {
      return b.times(props.scale).toNumber()
    })
    return () => (
      <div class={`${classNamePrefix}-utils`}>
        <Space class={`${classNamePrefix}-utils-content`}>
          <HButton
            icon-only
            icon="mirror"
            tooltip={{ mouseEnterDelay: 0.5 }}
            size={32}
            onClick={props.mirrorHandler}
          >
            镜像
          </HButton>
          <HButton
            icon-only
            icon="retweet"
            tooltip={{ mouseEnterDelay: 0.5 }}
            size={32}
            onClick={props.rotateHandler}
          >
            旋转
          </HButton>
          <HButton
            icon-only
            icon="zoom-out"
            tooltip={{ mouseEnterDelay: 0.5 }}
            size={32}
            onClick={props.zoomOutHandler}
          >
            缩小
          </HButton>
          <div class={'pdl-2x pdr-2x scale-viewer'}>{scale.value}%</div>
          <HButton
            icon-only
            icon="zoom-in"
            tooltip={{ mouseEnterDelay: 0.5 }}
            size={32}
            onClick={props.zoomInHandler}
          >
            放大
          </HButton>
          <HButton
            icon-only
            icon="border"
            tooltip={{ mouseEnterDelay: 0.5 }}
            size={32}
            onClick={props.resetHandler}
          >
            原始大小
          </HButton>
          <HButton
            icon-only
            icon="download"
            tooltip={{ mouseEnterDelay: 0.5 }}
            size={32}
            onClick={() =>
              downloadFile(
                props.currentImage.mainImage,
                props.currentImage.fileName
              )
            }
          >
            下载
          </HButton>
        </Space>
      </div>
    )
  }
})
