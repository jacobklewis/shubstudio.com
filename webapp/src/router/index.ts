import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import { reactive } from 'vue';
import routes from './routes';
import { api, opencmsApi } from 'src/boot/axios';
import {
  getToken,
  clearUser,
  getRefreshToken,
  setUser,
  userState,
} from 'src/boot/authHelper';
import { Base64 } from 'src/components/Base64';

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

let isRefreshing = false;

// Intercept Request
api.interceptors.request.use(
  async (request) => {
    if (request.url?.endsWith('oauth/refresh')) {
      return request;
    }
    // Show loading (reset loading first)
    if (globalSettings.loadingPer == 1) {
      globalSettings.loadingPer = 0;
    }
    setTimeout(() => (globalSettings.loadingPer = 0.95), 50);
    // Inject Token
    while (isRefreshing) {
      await new Promise((r) => setTimeout(r, 100));
    }
    let token = getToken();

    console.log(token);
    if (token) {
      const tokenData = JSON.parse(Base64.decode(token));
      if (tokenData.expiration - 10 < Date.now()) {
        isRefreshing = true;
        const refresh_token = getRefreshToken();
        const newToken = await api.post('/oauth/refresh', {
          token: token,
          refresh_token: refresh_token,
        });
        console.log('updated new token...');
        setUser(newToken.data);
        token = getToken();
        isRefreshing = false;
      }
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

opencmsApi.interceptors.request.use(async (request) => {
  // Show loading (reset loading first)
  if (globalSettings.loadingPer == 1) {
    globalSettings.loadingPer = 0;
  }
  setTimeout(() => (globalSettings.loadingPer = 0.95), 50);
  // Inject Token
  let token = userState.appKeys.opencms;
  let attemptCount = 0;
  while (!token && token.length < 10 && attemptCount < 10) {
    await new Promise((r) => setTimeout(r, 100));
    token = userState.appKeys.opencms;
    attemptCount++;
  }
  if (token) {
    request.headers['x-api-key'] = `${token}`;
  }
  return request;
});

const navigateToLogin = () => {
  clearUser();
  // Determine state
  // const redirectPath = Router.currentRoute.value.path;

  // Router.push({
  //   path: '/login',
  //   query: { redirectPath: redirectPath.split('/').join(',') },
  // });
  Router.push({ path: '/login' });
};
