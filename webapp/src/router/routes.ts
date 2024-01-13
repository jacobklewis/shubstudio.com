import { RouteRecordRaw } from 'vue-router';
import { getToken } from 'src/boot/authHelper';

const secureRouteCheck = (to, from, next) => {
  if (getToken() == undefined) {
    next({
      path: '/login',
      query: { redirectPath: to.path.split('/').join(',') },
    });
  } else {
    next();
  }
};

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
        path: 'settings',
        component: () => import('pages/settings/SettingsPage.vue'),
        beforeEnter: secureRouteCheck,
      },
      {
        path: 'settings/profile',
        component: () => import('pages/settings/ProfilePage.vue'),
        beforeEnter: secureRouteCheck,
      },
      {
        path: 'settings/notifications',
        component: () => import('pages/settings/NotificationsPage.vue'),
        beforeEnter: secureRouteCheck,
      },
      {
        path: 'oauth/external-request/:token',
        component: () => import('pages/RequestExternalTokenPage.vue'),
        beforeEnter: secureRouteCheck,
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
