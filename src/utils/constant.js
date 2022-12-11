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
