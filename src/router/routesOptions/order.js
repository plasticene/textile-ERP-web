import BlankView from '@/layouts/BlankView'
import EmptyPage from '@/pages/EmptyPage'
// import PageView from '@/layouts/PageView'
export default {
  path: '/order',
  name: '订单',
  meta: {
    icon: 'drag'
  },
  redirect: '/order/customer',
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
    }
  ]
}
