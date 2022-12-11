import BlankView from '@/layouts/BlankView'
import EmptyPage from '@/pages/EmptyPage'
// import PageView from '@/layouts/PageView'
export default {
  path: '/machine',
  name: '机台',
  meta: {
    icon: 'drag'
  },
  redirect: '/machine/list',
  component: BlankView,
  children: [
    {
      path: 'list',
      name: '机台管理',
      meta: {
        page: {
          // closable: false
        }
      },
      component: EmptyPage
    },
    {
      path: 'maintain',
      name: '机台维护',
      component: EmptyPage
    },
    {
      path: 'config',
      name: '机台设置',
      component: EmptyPage
    }
  ]
}
