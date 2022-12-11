import TabsView from '@/layouts/tabs/TabsView'

// import BlankView from '@/layouts/BlankView'
// import PageView from '@/layouts/PageView'
import {
  bills,
  machine,
  material,
  order,
  product,
  report,
  settings
} from './routesOptions'
// 路由配置
const options = {
  routes: [
    {
      path: '/login',
      name: '登录页',
      component: () => import('@/pages/login')
    },
    {
      path: '*',
      name: '404',
      component: () => import('@/pages/exception/404')
    },
    {
      path: '/403',
      name: '403',
      component: () => import('@/pages/exception/403')
    },
    {
      path: '/',
      name: '首页',
      component: TabsView,
      props: {
        env: process.env.VUE_APP_MODE
      },
      redirect: '/base-components',
      children: [material, product, machine, order, bills, report, settings]
    }
  ]
}

export default options
