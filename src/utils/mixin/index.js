import { default as previewMixin } from './preview'

// 全局调用
const directives = [
  { name: 'preview', directive: previewMixin.directives.preview }
]

const install = Vue => {
  directives.forEach(({ name, directive }) => {
    Vue.directive(name, directive)
  })
}

export { install, previewMixin }
