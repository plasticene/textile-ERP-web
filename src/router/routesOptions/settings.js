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
        title: '车间'
      },
      component: () => import('@/pages/settings/workshop')
    },
    {
      path: 'role',
      name: '岗位',
      meta: {
        title: '岗位'
      },
      component: () => import('@/pages/settings/role')
    },
    {
      path: 'staff',
      name: '员工',
      meta: {
        title: '员工'
      },
      component: () => import('@/pages/settings/staff')
    },
    {
      path: 'customer',
      name: '配置客户',
      meta: {
        title: '客户'
      },
      component: EmptyPage
    },
    {
      path: 'supplier',
      name: '配置供应商',
      meta: {
        title: '供应商'
      },
      component: EmptyPage
    },
    {
      path: 'factory',
      name: '配置代工厂',
      meta: {
        title: '代工厂'
      },
      component: EmptyPage
    },
    {
      path: 'company',
      name: '公司',
      meta: {
        title: '公司'
      },
      component: EmptyPage
    },
    {
      path: 'cost',
      name: '运营成本',
      meta: {
        title: '运营成本'
      },
      component: EmptyPage
    }
  ]
}
