import { omit, pick } from 'lodash'

function useSelectInit() {
  const vm = getCurrentInstance().proxy

  const scrollerListeners = pick(vm.$listeners, [
    'scroll-start',
    'scroll-end',
    'update'
  ])
  const selectListeners = omit(vm.$listeners, [
    'scroll-start',
    'scroll-end',
    'update',
    'search',
    'change'
  ])

  return { scrollerListeners, selectListeners }
}

export { useSelectInit }
