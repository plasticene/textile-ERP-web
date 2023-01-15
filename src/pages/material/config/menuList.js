export const menu = [
  {
    name: '全部',
    path: '/',
    children: [
      {
        name: '原料',
        path: '/material',
        component: '原料',
        children: [
          {
            name: '原料总览',
            path: '/material/list',
            component: '原料总览'
          },
          {
            name: '原料总览',
            path: '/material/config',
            component: '原料总览'
          },
          {
            name: '原料属性管理',
            path: '/material/attr-config',
            component: '原料属性管理'
          }
        ]
      },
      {
        name: '成品',
        path: '/product',
        component: '成品',
        children: [
          {
            name: '成品总览',
            path: '/product/list',
            component: '成品总览'
          },
          {
            name: '成品总览',
            path: '/product/config',
            component: '成品总览'
          },
          {
            name: '成品属性管理',
            path: '/product/attr-config',
            component: '成品属性管理'
          }
        ]
      },
      {
        name: '机台',
        path: '/machine',
        component: '机台',
        children: [
          {
            name: '机台管理',
            path: '/machine/list',
            component: '机台管理'
          },
          {
            name: '机台维护',
            path: '/machine/maintain',
            component: '机台维护'
          },
          {
            name: '机台设置',
            path: '/machine/config',
            component: '机台设置'
          }
        ]
      },
      {
        name: '订单',
        path: '/order',
        component: '订单',
        children: [
          {
            name: '客户',
            path: '/order/customer',
            component: '订单客户'
          },
          {
            name: '供应商',
            path: '/order/supplier',
            component: '订单供应商'
          },
          {
            name: '代工厂',
            path: '/order/factory',
            component: '订单代工厂'
          }
        ]
      },
      {
        name: '账单',
        path: '/bills',
        component: '账单',
        children: [
          {
            name: '客户',
            path: '/bills/customer',
            component: '账单客户'
          },
          {
            name: '供应商',
            path: '/bills/supplier',
            component: '账单供应商'
          },
          {
            name: '代工厂',
            path: '/bills/factory',
            component: '账单代工厂'
          },
          {
            name: '回收收入',
            path: '/bills/income',
            component: '账单回收收入'
          }
        ]
      },
      {
        name: '报表',
        path: '/report',
        component: '报表',
        children: [
          {
            name: '总览',
            path: '/report/overview',
            component: '报表总览'
          },
          {
            name: '原料',
            path: '/report/material',
            component: '报表原料'
          },
          {
            name: '成品',
            path: '/report/product',
            component: '报表成品'
          },
          {
            name: '生产',
            path: '/report/manufacture',
            component: '报表生产'
          },
          {
            name: '账单',
            path: '/report/bill',
            component: '报表账单'
          }
        ]
      },
      {
        name: '配置',
        path: '/setting',
        component: '配置',
        children: [
          {
            name: '车间',
            path: '/setting/workshop',
            component: '车间'
          },
          {
            name: '岗位',
            path: '/setting/role',
            component: '岗位'
          },
          {
            name: '员工',
            path: '/setting/staff',
            component: '员工'
          },
          {
            name: '客户',
            path: '/setting/customer',
            component: '配置客户'
          },
          {
            name: '供应商',
            path: '/setting/supplier',
            component: '配置供应商'
          },
          {
            name: '代工厂',
            path: '/setting/factory',
            component: '配置代工厂'
          },
          {
            name: '公司',
            path: '/setting/company',
            component: '公司'
          },
          {
            name: '运营成本',
            path: '/setting/cost',
            component: '运营成本'
          }
        ]
      }
    ]
  }
]
