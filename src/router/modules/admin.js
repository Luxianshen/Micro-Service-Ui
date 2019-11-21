/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const adminRouter = {
  path: '/admin',
  component: Layout,
  redirect: 'noredirect',
  name: 'admin',
  meta: {
    title: 'adminSettings',
    icon: 'settings'
  },
  children: [
    {
      path: 'permission',
      component: () => import('@/views/admin/permission/index'),
      name: 'adminPermission',
      meta: {
        title: 'adminPermission',
        icon: 'permission'
      }
    },
    {
      path: 'role',
      component: () => import('@/views/admin/role/index'),
      name: 'adminRole',
      meta: {
        title: 'adminRole',
        icon: 'role'
      }
    },
    {
      path: 'role/auth/:id',
      component: () => import('@/views/admin/role/auth'),
      name: 'adminRoleAuth',
      meta: {
        title: 'adminRoleAuth',
        icon: 'auth'
      },
      hidden: true
    }
  ]
}

export default adminRouter
