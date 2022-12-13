import BlankView from '@/layouts/BlankView'
import EmptyPage from '@/pages/EmptyPage'
// import PageView from '@/layouts/PageView'
export default {
  path: '/bills',
  name: '账单',
  meta: {
    icon: 'drag'
  },
  redirect: '/bills/customer',
  component: BlankView,
  children: [
    {
      path: 'customer',
      name: '账单客户',
      meta: {
        title: '客户'
      },
      component: EmptyPage
    },
    {
      path: 'supplier',
      name: '账单供应商',
      meta: {
        title: '供应商'
      },
      component: EmptyPage
    },
    {
      path: 'factory',
      name: '账单代工厂',
      meta: {
        title: '代工厂'
      },
      component: EmptyPage
    },
    {
      path: 'income',
      name: '账单回收收入',
      meta: {
        title: '回收收入'
      },
      component: EmptyPage
    }
  ]
}
