import Layout from '@/layout'

const viewDormRouter = {
  path: '/view-dorm',
  component: Layout,
  redirect: '/view-dorm/areas',
  children: [
    {
      path: 'areas',
      component: () => import('@/views/view-dorm/index'),
      name: 'ViewDormAreas',
      meta: { title: 'View Dorm', icon: 'eye-open', noCache: true }
    },
    {
      path: 'Eq',
      component: () => import('@/views/view-dorm/Eq/index'),
      name: 'EqArea',
      meta: { title: '二期', noCache: true },
      hidden: true
    },
    {
      path: 'Eq11',
      component: () => import('@/views/view-dorm/Eq/block11/index'),
      name: 'Eq11',
      meta: { title: '二期11栋', noCache: true },
      hidden: true
    },
    {
      path: 'Eq11-floor6',
      component: () => import('@/views/view-dorm/Eq/block11/floor6/index'),
      name: 'Eq11Floor6',
      meta: { title: '二期11栋6楼', noCache: true },
      hidden: true
    },
    {
      path: 'Eq11-601',
      component: () => import('@/views/view-dorm/Eq/block11/floor6/Room601.vue'),
      name: 'Eq11-601',
      meta: { title: '二期11栋601', noCache: true },
      hidden: true
    }
  ]
}

export default viewDormRouter
