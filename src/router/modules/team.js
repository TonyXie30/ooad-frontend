import Layout from '@/layout'

const teamRouter = {
  path: '/team',
  component: Layout,
  redirect: '/team/team-page',
  children: [
    {
      path: 'team-page',
      component: () => import('@/views/team/index'),
      name: 'TeamPage',
      meta: { title: 'Team Page', icon: 'peoples', noCache: true }
    },
    {
      path: 'create-team',
      component: () => import('@/views/team/create-team'),
      name: 'CreateTeam',
      meta: { title: 'Create Team', noCache: true },
      hidden: true
    },
    {
      path: 'join-team',
      component: () => import('@/views/team/join-team'),
      name: 'JoinTeam',
      meta: { title: 'Join Team', noCache: true },
      hidden: true
    },
    {
      path: 'view-my-team',
      component: () => import('@/views/team/view-my-team'),
      name: 'ViewMyTeam',
      meta: { title: 'View My Team', noCache: true },
      hidden: true
    }
  ]
}

export default teamRouter
