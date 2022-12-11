<template>
  <div ref="tooltipWrap" class="text-tooltip">
    <a-tooltip v-if="showTooltip">
      <template slot="title">{{ text }}</template>

      <span>{{ render }}</span>
    </a-tooltip>

    <span v-else>{{ render }}</span>
  </div>
</template>

<script name="TextTooltip" setup>
const props = defineProps({
  text: { type: String, default: '' },
  size: { type: Number, default: 10 },
  clampStyle: { type: String, default: 'default' },
  auto: Boolean
})
const tooltipWrap = ref(null)

const render = ref('')
const showTooltip = ref(false)

watch(
  () => [props.text],
  () => {
    nextTick(() => {
      setTimeout(() => {
        cutPropsText()
      }, 200)
    })
  },
  { immediate: true }
)

function cutPropsText() {
  const { text, size, auto } = props
  if (!tooltipWrap.value) {
    return
  }
  if (!text) {
    setRender('-', false)
    return
  }
  if (!auto) {
    const isLarge = text.length >= size
    if (isLarge) {
      if (props.clampStyle === 'mac') {
        const place = size / 2 - 2
        var subStr1 = text.substring(0, size - place)
        var subStr2 = text.substring(text.length - place)
        setRender(`${subStr1}...${subStr2}`, true)
        return
      }
      setRender(`${text.slice(0, size)}...`, true)
    } else {
      setRender(text, false)
    }
    return
  }

  // console.log({ d: tooltipWrap.value })
  const width = tooltipWrap.value.offsetWidth

  const fontSize = getComputedStyle(tooltipWrap.value, null)['fontSize']
  // console.log('fontSize', fontSize, width)
  const textLength = width / parseFloat(fontSize)
  if (text.length > textLength) {
    // 超出 截取字符串
    const cutTextSize = (textLength - 1.5) / 2

    const startText = text.substring(0, cutTextSize + 1)
    const endText = text.substring(text.length - cutTextSize, text.length)

    setRender(`${startText} ... ${endText}`, true)
  } else {
    // 未超出
    setRender(text, false)
  }
}

function setRender(value, show) {
  render.value = value
  showTooltip.value = show
}
</script>

<style scoped lang="less">
.text-tooltip {
  // display: inline-block;
}
</style>
