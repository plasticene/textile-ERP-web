import BlankView from '@/layouts/BlankView'
import EmptyPage from '@/pages/EmptyPage'
// import PageView from '@/layouts/PageView'
export default {
  path: '/setting',
  name: '配置',
  meta: {
    icon: 'drag'
  },
  redirect: '/setting/workshop',
  component: BlankView,
  children: [
    {
      path: 'workshop',
      name: '车间',
      meta: {
        page: {
          // closable: false
        }
      },
      component: () => import('@/pages/dashboard/workplace')
    },
    {
      path: 'rule',
      name: '岗位',
      component: EmptyPage
    },
    {
      path: 'staff',
      name: '员工',
      component: EmptyPage
    },
    {
      path: 'customer',
      name: '客户',
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
      path: 'company',
      name: '公司',
      component: EmptyPage
    },
    {
      path: 'cost',
      name: '运营成本',
      component: EmptyPage
    }
  ]
}
