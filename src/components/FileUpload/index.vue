<template>
  <div class="fileUpload">
    <template v-if="!fileId">
      <a-upload :custom-request="handleUpload" :show-upload-list="false">
        <a-button
          type="primary"
          :size="size"
          icon="upload"
          :loading="uploading"
        >
          {{ uploading ? '上传中...' : placeholder }}
        </a-button>
      </a-upload>
      <span v-if="sizeLimit" class="fileUpload__tip">
        {{ sizeTip ? sizeTip : `不大于${sizeName}` }}
      </span>
    </template>
    <div v-else class="fileUpload__view">
      <a class="fileUpload__href" @click="download">
        <a-icon type="paper-clip" />
        <span class="fileUpload__name" :title="fileName">{{ fileName }}</span>
      </a>
      <a-icon
        v-if="showClose"
        class="fileUpload__icon pdl-2x"
        type="close"
        @click="handleDel"
      />
    </div>
  </div>
</template>

<script>
import { uploadFiles } from '@/services'
export default {
  name: 'FileUpload',
  components: {},
  props: {
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
    },
    sizeLimit: {
      type: Number
    },
    sizeTip: {
      type: String
    }
  },
  data() {
    return {
      uploading: false
    }
  },
  computed: {
    sizeName() {
      if (!this.sizeLimit) {
        return ''
      }
      let fileSizeMsg = ''
      if (
        Math.floor(this.sizeLimit / 1024) === this.sizeLimit / 1024 &&
        this.sizeLimit < 1048576
      ) {
        fileSizeMsg = `${this.sizeLimit / 1024}KB`
      } else if (this.sizeLimit < 1048576) {
        fileSizeMsg = `${(this.sizeLimit / 1024).toFixed(2)}KB`
      } else if (
        Math.floor(this.sizeLimit / (1024 * 1024)) ===
          this.sizeLimit / (1024 * 1024) &&
        this.sizeLimit < 1073741824
      ) {
        fileSizeMsg = `${this.sizeLimit / (1024 * 1024)}MB`
      } else if (this.sizeLimit > 1048576 && this.sizeLimit < 1073741824) {
        fileSizeMsg = `${(this.sizeLimit / (1024 * 1024)).toFixed(2)}MB`
      } else if (
        Math.floor(this.sizeLimit / (1024 * 1024 * 1024)) ===
          this.sizeLimit / (1024 * 1024 * 1024) &&
        this.sizeLimit < 1099511627776
      ) {
        fileSizeMsg = `${this.sizeLimit / (1024 * 1024 * 1024)}GB`
      } else if (
        this.sizeLimit > 1073741824 &&
        this.sizeLimit < 1099511627776
      ) {
        fileSizeMsg = `${(this.sizeLimit / (1024 * 1024 * 1024)).toFixed(2)}GB`
      } else {
        fileSizeMsg = '文件超过1TB'
      }
      return fileSizeMsg
    }
  },
  created() {},
  beforeDestroy() {},
  methods: {
    // 上传附件
    handleUpload(file) {
      if (file.file.size > this.sizeLimit) {
        this.$message.warning(`文件不能大于${this.sizeName}`)
        return
      }
      this.uploading = true
      const formData = new FormData()
      formData.append('files', file.file)
      uploadFiles(formData)
        .then(res => {
          this.$emit('upload', res.data.content[0] || {})
        })
        .finally(() => {
          this.uploading = false
        })
    },
    // 删除附件
    handleDel() {
      this.$emit('delFile')
    },
    // 下载附件
    download() {
      const url = `${
        process.env.NODE_ENV === 'development' ? 'http://10.80.19.31:8000' : ''
      }/hccwp-biz-web/file/download?fileId=${this.fileId}`
      window.open(url)
    }
  }
}
</script>

<style scoped lang="less">
.fileUpload {
  width: 100%;
  &__tip {
    font-size: 12px;
    margin-left: 8px;
  }
  &__view {
    width: 100%;
    display: flex;
    align-items: center;
    &:hover {
      .fileUpload__icon {
        opacity: 1;
      }
    }
  }
  &__href {
    max-width: calc(100% - 20px);
    display: flex;
    align-items: center;
  }
  &__name {
    max-width: 100%;
    overflow: hidden;
    display: inline-block;
    word-break: break-all;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  &__icon {
    cursor: pointer;
    display: block;
    opacity: 0;
  }
}
</style>
