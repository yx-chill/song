import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Index from '@/views/Index.vue';

const Login = () => import('@/views/Login.vue');
const Register = () => import('@/views/Register.vue');
const Song = () => import('@/views/Song.vue');
const Favorite = () => import('@/views/Favorite.vue');
const Search = () => import('@/views/Search.vue');
const Admin = () => import('@/views/back/Admin.vue');
const Manage = () => import('@/views/back/Manage.vue');
const SongList = () => import('@/views/back/SongList.vue');
const AddSong = () => import('@/views/back/AddSong.vue');
const addGenre = () => import('@/views/back/addGenre.vue');
const routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/home',
    component: Index,
    children: [
      {
        path: 'home',
        name: 'home',
        component: Home,
      },
      {
        path: 'about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
      },
      {
        name: 'song',
        path: 'song/:id',
        component: Song,
      },
      {
        path: 'favorite',
        name: 'favorite',
        component: Favorite,
      },
      {
        path: 'search',
        name: 'search',
        component: Search,
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
  },
  {
    path: '/manage',
    name: 'manage',
    component: Manage,
    // redirect: '/manage/add-song',
    meta: { requiresAuth: true },
    children: [
      {
        path: 'song-list',
        name: 'song-list',
        component: SongList,
      },
      {
        path: 'add-song',
        name: 'add-song',
        component: AddSong,
      },
      {
        path: 'add-genre',
        name: 'add-genre',
        component: addGenre,
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'home' },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
