import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/Login.vue';
import HelloWorld from "@/views/HelloWorld.vue";
import Register from "@/components/Register.vue";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/home',
      name: 'home',
      component: HelloWorld,
      meta:{requiresAuth:true}
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ],
});
router.beforeEach((to, from, next) => {
  // 检查路由是否需要登录权限
  if (to.meta.requiresAuth) {
    // 在这里根据你的实际情况检查用户是否已登录
    // 例如，你可以检查是否有存储在本地的用户信息
    const isAuthenticated = localStorage.getItem('username');

    if (isAuthenticated) {
      // 用户已登录，允许访问
      next();
    } else {
      // 用户未登录，重定向到登录页面
      next('/login');
    }
  } else {
    // 不需要登录权限的路由，直接放行
    next();
  }
});
export default router;




