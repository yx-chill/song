import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';

const Login = () => import('@/views/Login.vue');
const Favorite = () => import('@/views/Favorite.vue');

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/favorite',
    name: 'favorite',
    component: Favorite,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
