import moment from 'moment'

export function dateFormat(value, format = 'YYYY-MM-DD') {
  return moment(value).format(format)
}
