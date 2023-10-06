import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/Login.vue';
import HelloWorld from "@/views/HelloWorld.vue";
import Register from "@/components/Register.vue";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/home',
      name: 'home',
      component: HelloWorld
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ],
});

export default router;




