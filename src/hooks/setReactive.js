import { isNull, isUndefined } from 'lodash'

function setReactive(reactive, data) {
  for (const key in data) {
    reactive[key] = data[key]
  }
}
function setReactiveByReactive(reactive, data) {
  for (const key in reactive) {
    if (!(isUndefined(data[key]) || isNull(data))) reactive[key] = data[key]
  }
}

export { setReactive, setReactiveByReactive }
