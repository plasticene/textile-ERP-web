import BlankView from '@/layouts/BlankView'
import EmptyPage from '@/pages/EmptyPage'
// import PageView from '@/layouts/PageView'
export default {
  path: '/material',
  name: '原料',
  meta: {
    icon: 'drag'
  },
  redirect: '/material/list',
  component: BlankView,
  children: [
    {
      path: 'list',
      name: '原料总览',
      meta: {
        title: '原料总览'
      },
      component: EmptyPage
    },
    {
      path: 'config',
      name: '原料管理',
      meta: {
        title: '原料管理'
      },
      component: EmptyPage
    },
    {
      path: 'attr-config',
      name: '原料属性管理',
      meta: {
        title: '原料属性管理'
      },
      component: EmptyPage
    }
  ]
}
