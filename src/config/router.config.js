// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'
// import { bxAnaalyse } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/member/member-list',
    children: [
      {
        path: 'member',
        name: 'Member',
        component: RouteView,
        redirect: '/member/member-list',
        meta: { title: '会员管理', icon: 'solution' },
        hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
        children: [
            {
                path: '/member/member-list',
                name: 'MemberMangeList',
                component: () => import('@/views/manage/member-list'),
                meta: { title: '会员管理', keepAlive: true }
            }
        ]
      },
      {
        path: 'real',
        name: 'Real',
        component: RouteView,
        redirect: '/real/real-list',
        meta: { title: '开户管理', icon: 'dollar' },
        hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
        children: [
            {
                path: '/real/real-list',
                name: 'RealList',
                component: () => import('@/views/manage/real-list'),
                meta: { title: '开户管理', keepAlive: true }
            }
        ]
      },
      {
        path: 'withdraw',
        name: 'Withdraw',
        component: RouteView,
        redirect: '/withdraw/withdraw-list',
        meta: { title: '提现管理', icon: 'dollar' },
        hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
        children: [
            {
                path: '/withdraw/withdraw-list',
                name: 'WithdrawManageList',
                component: () => import('@/views/manage/withdraw-list'),
                meta: { title: '提现管理', keepAlive: true }
            }
        ]
      },
      {
        path: 'recharge',
        name: 'Recharge',
        component: RouteView,
        redirect: '/recharge/recharge-list',
        meta: { title: '充值管理', icon: 'monitor' },
        hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
        children: [
            {
                path: '/recharge/recharge-list',
                name: 'RechargeManageList',
                component: () => import('@/views/manage/recharge-list.vue'),
                meta: { title: '充值管理', keepAlive: true }
            }
        ]
      },
      {
        path: 'order',
        name: 'Order',
        component: RouteView,
        redirect: '/order/order-list',
        meta: { title: '订单管理', icon: 'table' },
        hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
        children: [
            {
                path: '/order/order-list',
                name: 'OrderManageList',
                component: () => import('@/views/manage/order-list'),
                meta: { title: '订单管理', keepAlive: true }
            }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
