import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';

const Login = () => import('@/views/Login.vue');
const Favorite = () => import('@/views/Favorite.vue');
const Admin = () => import('@/views/back/Admin.vue');
const Search = () => import('@/views/Search.vue');
const Manage = () => import('@/views/back/Manage.vue');
const SongList = () => import('@/views/back/SongList.vue');
const AddSong = () => import('@/views/back/AddSong.vue');
const addGenre = () => import('@/views/back/addGenre.vue');
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'home' },
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
    components: { back: Login },
  },
  {
    path: '/favorite',
    name: 'favorite',
    component: Favorite,
  },
  {
    path: '/admin',
    name: 'admin',
    components: { back: Admin },
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
  },
  {
    path: '/manage',
    name: 'manage',
    components: { back: Manage },
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
