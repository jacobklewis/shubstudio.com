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
      {
        path: 'legal/tos',
        component: () => import('pages/legal/TermsOfService.vue'),
      },
      {
        path: 'legal/pp',
        component: () => import('pages/legal/PrivacyPolicy.vue'),
      },
      { path: 'about', component: () => import('pages/AboutPage.vue') },
      { path: 'logout', component: () => import('pages/LogoutPage.vue') },
      { path: 'login', component: () => import('pages/LoginPage.vue') },
      {
        path: 'login-help',
        component: () => import('pages/LoginHelpPage.vue'),
      },
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
        path: 'settings/tokens',
        component: () => import('pages/settings/TokensPage.vue'),
        beforeEnter: secureRouteCheck,
      },
      {
        path: 'oauth/external-request/:token',
        component: () => import('pages/RequestExternalTokenPage.vue'),
        beforeEnter: secureRouteCheck,
      },
      {
        path: 'games',
        component: () => import('pages/games/GamesPage.vue'),
      },
      {
        path: 'games/shub-hunt',
        component: () => import('pages/games/ShubHuntPage.vue'),
      },
      {
        path: 'spaces',
        redirect: { name: 'welcome' },
        component: () => import('layouts/SpacesLayout.vue'),
        beforeEnter: secureRouteCheck,
        children: [
          {
            name: 'welcome',
            path: 'welcome',
            component: () => import('pages/spaces/SpacesPage.vue'),
            beforeEnter: secureRouteCheck,
          },
          {
            path: 'chat/:sessionId',
            component: () => import('pages/spaces/SpacesChatPage.vue'),
            beforeEnter: secureRouteCheck,
          },
        ],
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
