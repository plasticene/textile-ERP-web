<template>
  <div class="flex-align-center file-preview ant-btn-link" @click="onClick">
    <a-icon
      :type="`${getFileIcon(fileName)}`"
      class="mr-1x"
      style="font-size: 16px"
    />

    <HTextTooltip v-bind="textTooltip" class="flex-grow" :text="fileName" />
  </div>
</template>
<script name="FilePreview" setup>
import HTextTooltip from '@/components/textTooltip'
import { getFileIcon, openFile } from '@/utils'
const props = defineProps({
  fileName: String,
  fileId: String,
  textTooltip: {
    type: Object,
    default: () => ({
      auto: true
    })
  }
})

console.log(props)

const onClick = () => {
  openFile(props.fileId)
}
</script>
<style lang="less" scoped>
.file-preview {
  padding: 0 4px;
  border-radius: var(--border-radius-small);
  transition: all 0.3s ease;
  &:hover {
    background-color: var(--color-fill-1);
  }
  .ant-btn-link {
    flex-grow: 1;
  }
}
</style>
