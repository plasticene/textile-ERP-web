const client = require('webpack-theme-color-replacer/client')
const { theme } = require('../config')
const {
  getMenuColors,
  getAntdColors,
  getThemeToggleColors,
  getFunctionalColors
} = require('../utils/colors')
const { ANTD } = require('../config/default')

function getThemeColors(color, $theme) {
  const _color = color || theme.color
  const mode = $theme || theme.mode
  const replaceColors = getThemeToggleColors(_color, mode)
  const themeColors = [
    ...replaceColors.mainColors,
    ...replaceColors.subColors,
    ...replaceColors.menuColors,
    ...replaceColors.contentColors,
    ...replaceColors.rgbColors,
    ...replaceColors.functionalColors.success,
    ...replaceColors.functionalColors.warning,
    ...replaceColors.functionalColors.error
  ]
  return themeColors
}

function changeThemeColor(newColor, $theme) {
  let promise = client.changer.changeColor({
    newColors: getThemeColors(newColor, $theme)
  })
  return promise
}

function modifyVars(color) {
  let _color = color || theme.color
  const palettes = getAntdColors(_color, theme.mode)
  const menuColors = getMenuColors(_color, theme.mode)
  const { success, warning, error } = getFunctionalColors(theme.mode)
  const primary = palettes[5]
  return {
    'slider-handle-color-focus': `var(--primary-color, ${palettes[1]})`,
    'primary-color': `var(--primary-6-color,${primary})`,
    'primary-1': `var(--primary-1-color,${palettes[0]})`,
    'primary-2': `var(--primary-2-color,${palettes[1]})`,
    'primary-3': `var(--primary-3-color,${palettes[2]})`,
    'primary-4': `var(--primary-4-color,${palettes[3]})`,
    'primary-5': `var(--primary-5-color,${palettes[4]})`,
    'primary-6': `var(--primary-6-color,${palettes[5]})`,
    'primary-7': `var(--primary-7-color,${palettes[6]})`,
    'primary-8': `var(--primary-8-color,${palettes[7]})`,
    'primary-9': `var(--primary-9-color,${palettes[8]})`,
    'primary-10': `var(--primary-10-color,${palettes[9]})`,
    'info-color': `var(--primary-color,${primary})`,
    'success-color': `var(--success-6-color,${success[5]})`,
    'warning-color': `var(--warning-6-color,${warning[5]})`,
    'error-color': `var(--error-6-color,${error[5]})`,
    'alert-info-bg-color': `var(--primary-1-color,${palettes[0]})`,
    'alert-info-border-color': `var(--primary-3-color,${palettes[2]})`,
    'alert-success-bg-color': `var(--success-1-color,${success[0]})`,
    'alert-success-border-color': `var(--success-3-color,${success[2]})`,
    'alert-warning-bg-color': `var(--warning-1-color,${warning[0]})`,
    'alert-warning-border-color': `var(--warning-3-color,${warning[2]})`,
    'alert-error-bg-color': `var(--error-1-color,${error[0]})`,
    'alert-error-border-color': `var(--error-3-color,${error[2]})`,
    'processing-color': `var(--primary-color,${primary})`,
    'menu-dark-submenu-bg': menuColors[0],
    'layout-header-background': menuColors[1],
    'layout-trigger-background': menuColors[2],
    'btn-danger-bg': `var(--error-5-color,${error[4]})`,
    'btn-danger-border': `var(--error-5-color,${error[4]})`,
    ...ANTD.theme[theme.mode],
    'border-radius-base': 'var(--border-radius-base,4px)',
    'border-radius-sm': 'var(--border-radius-sm,2px)'
  }
}

function loadLocalTheme(localSetting) {
  if (localSetting && localSetting.theme) {
    let { color, mode } = localSetting.theme
    color = color || theme.color
    mode = mode || theme.mode
    changeThemeColor(color, mode)
  }
}

/**
 * 获取本地保存的配置
 * @param load {boolean} 是否加载配置中的主题
 * @returns {Object}
 */
function getLocalSetting(loadTheme) {
  let localSetting = {}
  try {
    const localSettingStr = localStorage.getItem(
      process.env.VUE_APP_SETTING_KEY
    )
    localSetting = JSON.parse(localSettingStr)
  } catch (e) {
    console.error(e)
  }
  if (loadTheme) {
    loadLocalTheme(localSetting)
  }
  return localSetting
}

module.exports = {
  getThemeColors,
  changeThemeColor,
  modifyVars,
  loadLocalTheme,
  getLocalSetting
}
