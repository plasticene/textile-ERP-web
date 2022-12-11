import UAParser from 'ua-parser-js'

import { logVersion } from '@/utils/util'
function loadBrowserEnv(packageInfo) {
  var parser = new UAParser()
  const result = parser.getResult()
  const _getHccwpEnv_ = () => {
    if (!packageInfo) {
      console.warn(
        '[packageInfo]获取packageInfo信息错误!,请确认是否在 "bootstrap" 中传入 "packageInfo" 参数'
      )
      return {}
    }
    return {
      ...result,
      package: packageInfo || {},
      _versionText: 'Build V' + packageInfo['version']
    }
  }
  window._getHccwpEnv_ = _getHccwpEnv_
  logVersion(_getHccwpEnv_())
}

export { loadBrowserEnv }
