import { SvgIcon } from '@/plugins/svg-icon-plugin'

import { classNamePrefix } from '../constant'
import { useDrag } from '../hooks'

export default defineComponent({
  name: 'HImageViewerBody',
  props: {
    image: { type: String },
    rotate: Number,
    scale: Number,
    mirror: Number
  },

  setup(props) {
    const error = ref(false)
    const loaded = ref(false)
    const { transform, mouseDownHandler } = useDrag({
      translateX: 0,
      translateY: 0
    })
    const imgStyle = computed(() => ({
      // transform: 'rotate(0deg) scale(0.5)',
      // display: 'block'
      transform: `rotate(${props.rotate}deg) scale(${props.scale})`,
      display: loaded.value ? 'block' : 'none'
    }))

    const boxStyle = computed(() => {
      const { translateX, translateY } = transform.value
      return {
        transform: `translate(${translateX}px, ${translateY}px) scale(${
          props.mirror || 1
        }, 1)`
      }
    })

    const resetStatus = () => {
      error.value = false
      loaded.value = false
    }

    watch(
      () => props.src,
      () => {
        resetStatus()
      }
    )

    return () => (
      <div class={`${classNamePrefix}-body`}>
        <div class={`${classNamePrefix}-box`} style={boxStyle.value}>
          {error.value && (
            <div class={`${classNamePrefix}-img-error`}>
              {/* 脱离文档流 */}
              <div class={`${classNamePrefix}-error-content`}>
                {/* <ImageErrorIcon size="4em" /> */}
                <SvgIcon
                  name="img-error"
                  size="4em"
                  color="var(--color-text-2)"
                />
                <div class={`${classNamePrefix}-error-text mt-3x`}>
                  图片加载失败，可尝试重新加载
                </div>
              </div>
            </div>
          )}
          {!error.value && (
            <img
              src={props.image}
              alt="image"
              class={`${classNamePrefix}-image`}
              draggable={false}
              style={imgStyle.value}
              onError={() => (error.value = true)}
              onLoad={() => (loaded.value = true)}
              onMousedown={event => {
                event.stopPropagation()
                mouseDownHandler(event)
              }}
            />
          )}
        </div>
      </div>
    )
  }
})
