// 默认导入所有src文件夹下的icons文件(自动导入，不需手动一个个导入)
import SvgIcon from './SvgIcon.vue' //写了组件在打开 用于注册组件

//写了组件在打开 用于注册组件

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('@/icons', false, /.svg$/)
requireAll(req)

export { SvgIcon }
export default {
  install(Vue) {
    Vue.component('svg-icon', SvgIcon)
  }
}
