export * from './util'
import { get, isString, omit } from 'lodash'
import moment from 'moment'
import numeral from 'numeral'

import { doImagePreview } from '@/components/HImagePreview'
import { getFilesInfo } from '@/services'

import { fileIconMap, pictureFileRegExp } from './constant'
import { download } from './util'

/**
 * 它接受一个字符串，并返回该字符串的最后三个字符。
 * @param filename - 文件的名称。
 */
export function getFileExtension(filename) {
  return /[.]/.exec(filename) ? /[^.]+$/.exec(filename)[0] : undefined
}

/**
 * @description: 获取文件图标
 * @param {文件名称} filename
 * @return {*}
 */
export function getFileIcon(filename) {
  if (!filename) {
    return 'paper-clip'
  }
  const fileIcon = fileIconMap[getFileExtension(filename)]
  return fileIcon ? `file-${fileIcon}` : 'paper-clip'
}

/**
 * @description: 金额格式化
 * @param {Number} vale
 * @param {String} [format] 格式默认 0,000[.]00
 * @return {String}
 */
export function formatAmount(vale, format = '0,000[.]00') {
  return numeral(vale).format(format)
}

/**
 * @description: 根据接口数据返回符合 select 的 options 选项
 * @param {*} res
 * @return {*}
 */
export const handleSelectOptions = res => {
  return get(res, 'data.content', []).map(i => {
    return {
      label: i.content,
      value: i.value
    }
  })
}

/**
 * @description: 与当前时间对比是否超时
 * @param {String} date ['YYYY-MM-DD']
 * @return {Boolean}
 */
export const isTimeOut = date => {
  const today = moment()
  return today.diff(moment(`${date} 23:59:59`)) > 0
}

/**
 *  打开文件，如果是pdf 会在新标签页打卡，
 * 如果不是 pdf 则直接下载
 * @param {string} fileId
 */
export async function openFile(_fileId) {
  // file 是 fileId
  if (!isString(_fileId)) {
    console.error('openFile param must be string')
    return
  }
  const res = await getFilesInfo({ fileId: _fileId })

  /**@type {FileObject} */
  const fileObject = res.data.content
  const { fileId, fileUrl, fileName, extension } = fileObject
  // pdf 文件
  if (extension.includes('pdf')) {
    const url = `${
      process.env.NODE_ENV === 'development' ? 'http://10.80.19.31:8000' : ''
    }/hccwp-web-init/file/download?fileId=${fileId}`
    window.open(url)
  } else if (pictureFileRegExp.test(extension)) {
    // console.log('object')
    doImagePreview({ images: [{ mainImage: fileUrl, fileName }] })
  } else {
    // 如果是图片变成当前位置打开了
    download(fileUrl, fileName)
  }
}

/**
 * @description: 格式化树数据，使得符合及联
 * @param {*} tree
 * @return {*}
 */
export function formatDeptTree(tree) {
  function loop(tree) {
    if (!tree) {
      return []
    }
    return tree.map(t => {
      const formatTitle = t.title ? t.title.replace(/(.*?)\//, '') : ''
      return {
        ...omit(t, ['children']),
        label: formatTitle,
        title: formatTitle,
        ...(t.children.length > 0 ? { children: loop(t.children) } : {})
      }
    })
  }

  return tree.map(t => ({
    ...t,
    label: t.title,
    children: loop(t.children, 0)
  }))
}
