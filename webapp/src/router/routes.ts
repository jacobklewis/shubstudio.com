import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'about', component: () => import('pages/AboutPage.vue') },
      { path: 'logout', component: () => import('pages/LogoutPage.vue') },
      { path: 'login', component: () => import('pages/LoginPage.vue') },
      { path: 'register', component: () => import('pages/RegisterPage.vue') },
      {
        path: 'settings/profile',
        component: () => import('pages/ProfilePage.vue'),
      },
      {
        path: 'oauth/external-request/:token',
        component: () => import('pages/RequestExternalTokenPage.vue'),
      },
      {
        path: 'games/shub-hunt',
        component: () => import('pages/ShubHuntPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
