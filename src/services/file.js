import { METHOD, request } from '@/utils/request'

// /hccwp-biz-web/fileUpload/
/**
 * @template T
 * @typedef {Object} Response
 * @property {ResponseData<T>} data
 */

/**
 * @typedef {Object} FileType
 * @property {number} downloadNum
 * @property {string} fileDesc
 * @property {string} fileId
 * @property {string} fileName
 * @property {string} fileUrl
 */

/**
 * @typedef {Object} FileInfoType
 * @property {string} createDate
 * @property {string} extension
 * @property {string} fileId
 * @property {string} fileName
 * @property {number} fileSize
 * @property {string} fileUrl
 */

/**
 * @template T
 * @typedef {Object} ResponseData
 * @property {T} content
 */
/**
 * @description: 文件上传
 * @param {FormData} params
 * @return {Promise<Response<FileType[]>>}
 */
export function uploadFiles(params) {
  return request('/file/uploadFile', METHOD.POST, params)
}

/**
 * @description: 获取文件信息
 * @param {{fileId:string}} params
 * @return {Promise<Response<FileInfoType>>}
 */
export function getFilesInfo(params) {
  return request('/file/fileInfo', METHOD.GET, params)
}
