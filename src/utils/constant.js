export const ListTableConfig = {
  sticky: { headerTop: '-25px', scrollBarBottom: '48px' }
}
export const DetailListTableConfig = {
  sticky: { headerTop: '0px', scrollBarBottom: '48px' }
}
export const Actions = [
  {
    label: '编辑',
    key: 'edit'
  },
  {
    label: '删除',
    key: 'delete'
  }
]
export const GENDER = [
  {
    label: '男',
    value: 0
  },
  {
    label: '女',
    value: 1
  }
]
export const STAFF_STATUS = [
  {
    label: '在职',
    value: 0
  },
  {
    label: '离职',
    value: 1
  }
]

const fileIconMap = {
  xlsx: 'excel',
  jpg: 'image',
  jpeg: 'image',
  png: 'image',
  gif: 'image',
  md: 'markdown',
  pdf: 'pdf',
  ppt: 'ppt',
  pptx: 'ppt',
  txt: 'text',
  doc: 'word',
  docx: 'word',
  zip: 'zip',
  rar: 'zip'
}

const pictureFileExtensions = [
  'jpg',
  'png',
  'gif',
  'jpeg',
  'webp',
  'svg',
  'bmp',
  'tif'
]

const pictureFileRegExp = /(\.?(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))/
export { fileIconMap, pictureFileExtensions, pictureFileRegExp }
