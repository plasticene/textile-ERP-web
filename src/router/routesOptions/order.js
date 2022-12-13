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
      name: '订单客户',
      meta: {
        title: '客户'
      },
      component: EmptyPage
    },
    {
      path: 'supplier',
      name: '订单供应商',
      meta: {
        title: '供应商'
      },
      component: EmptyPage
    },
    {
      path: 'factory',
      name: '订单代工厂',
      meta: {
        title: '代工厂'
      },
      component: EmptyPage
    }
  ]
}
