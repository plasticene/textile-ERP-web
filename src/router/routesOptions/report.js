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
      name: '报表总览',
      meta: {
        title: '总览'
      },
      component: EmptyPage
    },
    {
      path: 'material',
      name: '报表原料',
      meta: {
        title: '原料'
      },
      component: EmptyPage
    },
    {
      path: 'product',
      name: '报表成品',
      meta: {
        title: '成品'
      },
      component: EmptyPage
    },
    {
      path: 'manufacture',
      name: '报表生产',
      meta: {
        title: '生产'
      },
      component: EmptyPage
    },
    {
      path: 'bill',
      name: '报表账单',
      meta: {
        title: '账单'
      },
      component: EmptyPage
    }
  ]
}
