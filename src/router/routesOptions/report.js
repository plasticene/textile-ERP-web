import BlankView from '@/layouts/BlankView'
import EmptyPage from '@/pages/EmptyPage'
// import PageView from '@/layouts/PageView'
export default {
  path: '/report',
  name: '报表',
  meta: {
    icon: 'drag'
  },
  redirect: '/report/overview',
  component: BlankView,
  children: [
    {
      path: 'overview',
      name: '总览',
      meta: {
        page: {
          // closable: false
        }
      },
      component: EmptyPage
    },
    {
      path: 'material',
      name: '原料',
      component: EmptyPage
    },
    {
      path: 'product',
      name: '成品',
      component: EmptyPage
    },
    {
      path: 'manufacture',
      name: '生产',
      component: EmptyPage
    },
    {
      path: 'bill',
      name: '账单',
      component: EmptyPage
    }
  ]
}
