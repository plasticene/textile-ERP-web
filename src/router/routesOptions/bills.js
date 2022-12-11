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
      name: '客户',
      meta: {
        page: {
          // closable: false
        }
      },
      component: EmptyPage
    },
    {
      path: 'supplier',
      name: '供应商',
      component: EmptyPage
    },
    {
      path: 'factory',
      name: '代工厂',
      component: EmptyPage
    },
    {
      path: 'income',
      name: '回收收入',
      component: EmptyPage
    }
  ]
}
