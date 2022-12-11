<template>
  <div class="fileUpload">
    <a-upload
      v-if="!state.fileId"
      :custom-request="handleUpload"
      :show-upload-list="false"
    >
      <a-button type="primary" :size="size" icon="upload" :loading="uploading">
        {{ uploading ? '上传中...' : placeholder }}
      </a-button>
    </a-upload>
    <div v-else class="fileUpload__view">
      <a class="flex-grow flex-align-center" @click="handleOpenFile">
        <a-icon type="paper-clip" />
        <HTextTooltip class="flex-grow" :text="state.fileName" auto />
      </a>

      <HButton
        v-if="showClose"
        icon="close"
        icon-only
        class="fileUpload__icon"
        style="font-size: 12px"
        @click="handleDel"
      >
        删除
      </HButton>
      <!-- <a-icon
        class="fileUpload__icon pdl-2x"
        type="close"
        @click="handleDel"
        v-if="showClose"
      /> -->
    </div>
  </div>
</template>

<script name="FileUploadWithModel" setup>
// 多个文件上传参考 widthMultiple
import { isUndefined } from 'lodash'

import { useRequest } from '@/hooks'
import { uploadFiles } from '@/services'
import { openFile } from '@/utils'

const props = defineProps({
  value: String,
  // file: Object,
  // dataSource: Array,
  file: {
    type: Object
  },
  fileId: {
    type: String
  },
  fileName: {
    type: String
  },
  size: {
    type: String,
    default: 'small'
  },
  showClose: {
    type: Boolean,
    default: true
  },
  placeholder: {
    type: String,
    default: '上传文件'
  }
})

const emits = defineEmits([
  'input',
  'upload',
  'delFile',
  'update:file',
  'update:fileId',
  'update:fileName'
])

const state = reactive({
  value: '',
  fileId: '',
  fileName: ''
})

const { isFetching: uploading, execute } = useRequest(uploadFiles, {
  immediate: false
})

const handleUpload = async file => {
  const formData = new FormData()
  formData.append('files', file.file)
  const res = await execute(formData)
  const resFile = res[0] || {}
  // 如果不存在 props value 的时候
  if (isUndefined(props.value)) {
    state.value = resFile.fileId
  } else {
    emits('input', resFile.fileId)
  }
  if (isUndefined(props.fileId)) {
    state.fileId = resFile.fileId
  } else {
    emits('update:fileId', resFile.fileId)
  }
  if (isUndefined(props.fileName)) {
    state.fileName = resFile.fileName
  } else {
    emits('update:fileName', resFile.fileName)
  }
  emits('update:file', resFile)
  emits('upload', resFile)
  emits('change', resFile)
}

const handleDel = () => {
  console.log('object')
  if (isUndefined(props.value)) {
    state.value = ''
  } else {
    emits('input', '')
  }

  if (isUndefined(props.fileId)) {
    state.fileId = ''
  } else {
    emits('update:fileId', '')
  }
  if (isUndefined(props.fileName)) {
    state.fileName = ''
  } else {
    emits('update:fileName', '')
  }
  emits('update:file', {})
  emits('delFile')
  emits('change', {})
}

const handleOpenFile = () => {
  openFile(props.value || props.fileId || state.value)
}

watchEffect(() => {
  state.value = props.value
})
watchEffect(() => {
  state.fileName = props.fileName
})
watchEffect(() => {
  state.fileId = props.fileId
})

watchEffect(() => {
  if (props.file) {
    state.fileId = props.file.fileName
    state.fileId = props.file.fileId
  }
})
</script>

<style scoped lang="less">
.fileUpload {
  &__view {
    display: flex;
    align-items: center;
  }
  &__icon {
    cursor: pointer;
  }
}
</style>
