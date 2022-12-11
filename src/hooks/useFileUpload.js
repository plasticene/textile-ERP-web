// import { getFilesInfo } from '@/services'

/**
 * @typedef {import('vue').Ref<FileType>} FileRef
 */

/**
 * @typedef {Object} FileType
 * @property {String} fileId
 * @property {String} fileName
 */
/**
 * @description: 文件上传处理
 * @returns {{file:FileRef, onUpload:(FileType)=>void, onFileDel:()=>void}}
 */
const useFileUpload = () => {
  const file = ref({
    fileId: '',
    fileName: ''
  })
  const onUpload = content => {
    // console.log(content.fileId)
    file.value.fileId = content.fileId
    file.value.fileName = content.fileName
  }

  const onFileDel = () => {
    file.value = {
      fileId: '',
      fileName: ''
    }
  }

  return { file, onUpload, onFileDel }
}

export { useFileUpload }
