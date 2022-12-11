<template>
  <div class="fileUpload">
    <a-upload
      v-if="showUploadBtn"
      :custom-request="handleUpload"
      :show-upload-list="false"
      multiple
    >
      <a-button type="primary" :size="size" icon="upload" :loading="uploading">
        {{ uploading ? '上传中...' : placeholder }}
      </a-button>
    </a-upload>

    <ul v-if="state.fileList.length > 0" class="mt-2x file-list-view">
      <li
        v-for="(file, index) in state.fileList"
        :key="file.fileId"
        class="flex-space-between mb-1x fileUpload__view"
      >
        <div
          class="flex-align-center ant-btn-link fileUpload__text"
          @click="handleOpenFile(file, index)"
        >
          <a-icon type="paper-clip" class="mr-1x" />
          <HTextTooltip class="flex-grow" :text="file.fileName" auto />
        </div>
        <HButton
          v-if="showClose"
          icon="close"
          icon-only
          class="fileUpload__icon"
          style="font-size: 12px"
          @click="handleDel(file, index)"
        >
          删除
        </HButton>
      </li>
    </ul>
  </div>
</template>

<script name="FileUploadWithModel" setup>
// 多文件上传
// TODO:目前缺少大文件上传组件
import { isArray } from 'lodash'

import { useRequest } from '@/hooks'
import { uploadFiles } from '@/services'
import { openFile } from '@/utils'

const props = defineProps({
  value: Array,
  limit: Number,
  fileList: Array,
  size: {
    type: String,
    default: 'default'
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

const emits = defineEmits(['input', 'upload', 'delFile', 'update:fileList'])

const state = reactive({
  value: [],
  fileList: []
})

const { isFetching: uploading, execute } = useRequest(uploadFiles, {
  immediate: false
})

const showUploadBtn = computed(() => {
  if (props.limit && props.limit !== 0) {
    return state.value.length < props.limit
  } else {
    return true
  }
})
const handleUpload = async file => {
  console.log('handle-upload', file)
  const formData = new FormData()
  formData.append('files', file.file)
  const res = await execute(formData)
  const resFile = res[0] || {}
  // 如果不存在 props value 的时候
  if (!isArray(props.value)) {
    state.value = [...state.value, resFile.fileId]
  } else {
    emits('input', [...props.value, resFile.fileId])
  }

  if (!isArray(props.fileList)) {
    state.fileList = [...state.fileList, resFile]
  } else {
    emits('update:fileList', [...props.fileList, resFile])
  }

  emits('upload', resFile, props.fileList || state.fileList)
  emits('change', resFile, props.fileList || state.fileList)
}

const handleDel = (file, index) => {
  const value = props.value || state.value
  const fileList = props.fileList || state.fileList
  value.splice(index, 1)
  fileList.splice(index, 1)

  console.log(value, fileList)
  if (!isArray(props.value)) {
    state.value = value
  } else {
    emits('input', value)
  }

  if (!isArray(props.fileList)) {
    state.fileList = fileList
  } else {
    emits('update:fileList', fileList)
  }

  emits('delFile', file)
  emits('change', file)
}

const handleOpenFile = file => {
  openFile(file.fileId)
}

watchEffect(() => {
  state.value = props.value || []
})
watchEffect(() => {
  state.fileList = props.fileList || []
})
</script>

<style scoped lang="less">
.file-list-view {
  padding-left: 0;
}
.fileUpload {
  &__view {
    display: flex;
    align-items: center;
    line-height: 24px;
  }
  &__icon {
    font-size: 12px;
  }
  &__text,
  .flex-grow {
    flex-grow: 1;
  }
}
</style>
