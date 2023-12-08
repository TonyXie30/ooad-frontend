import Layout from '@/layout'

const viewDormRouter = {
  path: '/view-dorm',
  component: Layout,
  redirect: '/view-dorm/zones',
  children: [
    {
      path: 'zones',
      component: () => import('@/views/view-dorm/index'),
      name: 'ViewDormZones',
      meta: { title: 'View Dorm', icon: 'eye-open', noCache: true }
    },
    {
      path: 'within-zone',
      component: () => import('@/views/view-dorm/InZone.vue'),
      name: 'ZoneArea',
      meta: { title: 'InZone', noCache: true },
      hidden: true
    },
    {
      path: 'room',
      component: () => import('@/views/view-dorm/Room/index.vue'),
      name: 'RoomPage',
      meta: { title: 'Room Page', noCache: true },
      hidden: true
    }
  ]
}

export default viewDormRouter
