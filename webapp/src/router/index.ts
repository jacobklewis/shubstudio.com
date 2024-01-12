import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import { reactive } from 'vue';
import routes from './routes';
import { api } from 'src/boot/axios';
import { getToken, clearUser } from 'src/boot/authHelper';

const globalSettings = reactive({
  loadingPer: 0,
});
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

const createHistory = process.env.SERVER
  ? createMemoryHistory
  : process.env.VUE_ROUTER_MODE === 'history'
  ? createWebHistory
  : createWebHashHistory;

const Router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes,

  // Leave this as is and make changes in quasar.conf.js instead!
  // quasar.conf.js -> build -> vueRouterMode
  // quasar.conf.js -> build -> publicPath
  history: createHistory(process.env.VUE_ROUTER_BASE),
});

function hasRedirectQueryParams(route) {
  return Object.keys(route.query).indexOf('redirectPath') >= 0;
}

Router.beforeEach((to, from, next) => {
  if (
    !hasRedirectQueryParams(to) &&
    hasRedirectQueryParams(from) &&
    to.path != '/'
  ) {
    next({
      path: to.path,
      query: { redirectPath: from.query['redirectPath'] },
    });
  } else {
    next();
  }
});

export default route(function (/* { store, ssrContext } */) {
  return Router;
});

export { globalSettings };

// Intercept Request
api.interceptors.request.use(
  (request) => {
    // Show loading (reset loading first)
    if (globalSettings.loadingPer == 1) {
      globalSettings.loadingPer = 0;
    }
    setTimeout(() => (globalSettings.loadingPer = 0.95), 50);
    // Inject Token
    const token = getToken();
    console.log(token);
    if (token) {
      console.log('Adding Token...');
      request.headers.Authorization = `Bearer ${token}`;
    }

    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

// Intercept Response
api.interceptors.response.use(
  (response) => {
    // Hide Loading
    globalSettings.loadingPer = 1;
    // Handle Invalid Tokens
    console.log(response.request?.responseURL);
    if (
      response.request?.responseURL?.indexOf('/login') !== -1 &&
      response.request?.responseURL?.indexOf('oauth/login') === -1
    ) {
      navigateToLogin();
      return Promise.reject();
    }
    return response;
  },
  (error) => {
    if (
      (error.response.status == 401 || error.response.status == 403) &&
      error.response.data?.action != 'user_login'
    ) {
      navigateToLogin();
    } else {
      throw error;
    }
  }
);

const navigateToLogin = () => {
  clearUser();
  // Determine state
  const redirectPath = Router.currentRoute.value.path;

  Router.push({
    path: '/login',
    query: { redirectPath: redirectPath.split('/').join(',') },
  });
};
