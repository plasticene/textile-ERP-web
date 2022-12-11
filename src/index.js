import 'moment/locale/zh-cn'
import '@/mock'
import './theme/index.less'
import 'animate.css/source/animate.css'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

import Antd from 'ant-design-vue'
import Vue from 'vue'
import VueVirtualScroller from 'vue-virtual-scroller'

import { selfBootstrap } from '@/_bootstrap'
import Components from '@/components'
import Plugins from '@/plugins'
import { initI18n } from '@/utils/i18n'
import { install } from '@/utils/mixin'

import packageInfo from '../package.json'
import App from './App.vue'
import { initRouter } from './router'
import store from './store'

const router = initRouter(store.state.setting.asyncRoutes)
const i18n = initI18n('CN', 'US')
const isProd =
  process.env.NODE_ENV === 'production' &&
  process.env.VUE_APP_MODE === 'production'

Vue.config.productionTip = false
Vue.config.devtools = !isProd
// Vue.config.errorHandler = (err, vm, info) => {
//   console.error(`Error in ${info}: "${err.toString()}"`, vm)
// }
//通过环境配置 performance是否可用
Vue.config.performance = !isProd
Vue.use(Antd)
Vue.use(Plugins)
Vue.use(Components)
Vue.use(install)
Vue.use(VueVirtualScroller)

Vue.prototype.log = console.log
selfBootstrap({
  router,
  store,
  i18n,
  message: Vue.prototype.$message,
  packageInfo: packageInfo
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
