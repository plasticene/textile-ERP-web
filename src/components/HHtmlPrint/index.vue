<template>
  <a-modal
    class="html-print"
    :visible="visibleValue"
    centered
    :width="computedWidth + 60"
    :title="title"
    ok-text="打印"
    @ok="generatePdf"
    @cancel="onCloseHandle"
  >
    <slot name="extra"></slot>
    <VueHtml2pdf
      ref="html2Pdf"
      :show-layout="true"
      :float-layout="false"
      :enable-download="true"
      :preview-modal="false"
      :paginate-elements-by-height="1160"
      :pdf-quality="2"
      pdf-format="a4"
      pdf-orientation="portrait"
      :pdf-content-width="computedWidth + 'px'"
      :filename="fileName"
      :manual-pagination="true"
      :html-to-pdf-options="{
        filename: fileName + '.pdf',
        margin: [10, 15],
        html2canvas: {
          scale: 3,
          useCORS: true
        },
        jsPDF: {
          orientation,
          format,
          unit: 'mm'
        }
      }"
      @progress="onProgress($event)"
      @hasDownloaded="hasDownloaded($event)"
    >
      <section slot="pdf-content" class="content">
        <!-- PDF Content Here -->
        <slot></slot>
      </section>
    </VueHtml2pdf>
  </a-modal>
</template>

<script name="HHtmlPrint" setup>
import VueHtml2pdf from 'vue-html2pdf'

import useVModel from '@/hooks/useVModel'

import { paper } from './const'
import useProgress from './useProgress'
const props = defineProps({
  title: { type: String, default: 'PDF打印' },
  visible: Boolean,
  fileName: { type: String, default: 'PDF' },
  message: { type: String },
  // Possible values are "portrait" or "landscape" (or shortcuts "p" or "l").
  orientation: { type: String, default: 'p' },
  /**
   * The format of the first page. Can be:
   * a0 - a10
   * b0 - b10
   * c0 - c10
   * dl
   * letter
   * government-letter
   * legal
   * junior-legal
   * ledger
   * tabloid
   * credit-card
   * Default is "a4".
   * If you want to use your own format just pass instead of one of the above predefined formats the size as an number-array,
   * e.g. [595.28, 841.89]
   */
  format: { type: String, default: 'a4' },
  contentWidth: { type: Number, default: 672 }
})

const emit = defineEmits(['hasDownloaded'])

const { visible } = toRefs(props)
const html2Pdf = ref(null)

const [visibleValue, setVisibleValue] = useVModel({
  value: visible,
  defaultValue: false
})

const computedWidth = computed(() => {
  return paper[props.format].width || props.contentWidth
})

const { progress, openNotification, updateNotification } = useProgress(props)

const onProgress = p => {
  progress.value = p
  if (p == 100) {
    progress.value = 99
    setTimeout(() => {
      progress.value = 100
      updateNotification()
    }, 100)
  }
}

const hasDownloaded = $event => {
  emit('hasDownloaded', $event)
}

const generatePdf = () => {
  openNotification()
  setTimeout(() => {
    progress.value = 1
    html2Pdf.value && html2Pdf.value.generatePdf()
  }, 300)
}

const onCloseHandle = () => {
  setVisibleValue(false)
}

const open = () => {
  setVisibleValue(true)
}
defineExpose({ generatePdf, open })
</script>

<style lang="less" scoped>
.html-print {
  position: fixed;
  z-index: 88;
}
.content {
  // padding: 24px;
  background: #fff;
  // margin-top: 5vh;
}

.print {
  position: fixed;
  right: 24px;
  z-index: 10001;
  color: #fff;
}

:deep(.ant-modal) {
  padding-bottom: 0;
}
:deep(.ant-modal-body) {
  height: calc(100vh - 140px);
  overflow-y: auto;
}
:deep(.task-layout) {
  position: absolute;
  left: 100%;
  width: 256px;
  margin-left: 20px;
  background: #fff;
}
</style>
