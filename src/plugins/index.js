import AuthorityPlugin from './authority-plugin'
import VueI18nPlugin from './i18n-extend'
import SvgIconPlugin from './svg-icon-plugin'
import TabsPagePlugin from './tabs-page-plugin'

const Plugins = {
  install: function (Vue) {
    Vue.use(VueI18nPlugin)
    Vue.use(AuthorityPlugin)
    Vue.use(TabsPagePlugin)
    Vue.use(SvgIconPlugin)
  }
}
export default Plugins
