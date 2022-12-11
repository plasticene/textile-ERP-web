import BlankView from '@/layouts/BlankView'
import EmptyPage from '@/pages/EmptyPage'
// import PageView from '@/layouts/PageView'
export default {
  path: '/product',
  name: '成品',
  meta: {
    icon: 'drag'
  },
  redirect: '/product/list',
  component: BlankView,
  children: [
    {
      path: 'list',
      name: '成品总览',
      meta: {
        page: {
          // closable: false
        }
      },
      component: EmptyPage
    },
    {
      path: 'config',
      name: '成品管理',
      component: EmptyPage
    },
    {
      path: 'attr-config',
      name: '成品属性管理',
      component: EmptyPage
    }
  ]
}
