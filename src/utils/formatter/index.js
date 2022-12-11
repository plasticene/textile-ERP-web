// eslint-disable-next-line no-unused-vars
import numeral from 'numeral'

export { default as formatConfig } from './formatConfig.js'
/**
 * @description: 格式化银行卡号 XXXX XXXX XXXX XXXX
 * @param {Number|String} val 银行卡号
 * @param {String} separator  [" "] 分割线
 * @return {String}
 */
export function formatBankNumber(val, separator = ' ') {
  const type = typeof val
  if (!['string', 'number'].includes(type)) {
    console.warn('val is not a string or number')
    return ''
  }
  return (type === 'string' ? val : val.toString()).replace(
    /(\d{4})(?=\d)/g,
    '$1' + separator
  )
}
