import { useCookies } from 'vue3-cookies';
import { reactive, Ref } from 'vue';
import { UserData } from 'src/components/models';
import { Base64 } from 'src/components/Base64';
import { api } from 'src/boot/axios';
import { get } from 'http';

export const userState = reactive({
  username: '',
  isLoggedIn: false,
  warnAddPassword: false,
  isSystemAdmin: false,
  appKeys: { opencms: undefined },
});
export const errorHandler = reactive({
  errorTitle: '',
  errorMessage: '',
  errorVisible: false,
});

export function displayAlert(message: string) {
  errorHandler.errorTitle = 'Alert';
  errorHandler.errorMessage = message;
  errorHandler.errorVisible = true;
}
let gettingAppToken = false;

function checkSystemAdmin(tokenData: any) {
  userState.isSystemAdmin = tokenData.scopes.indexOf('SYSTEM_ADMIN') >= 0;
  if (
    userState.isSystemAdmin &&
    !userState.appKeys.opencms &&
    !gettingAppToken
  ) {
    gettingAppToken = true;
    api.get('/oauth/external/app-token/opencms').then((response) => {
      userState.appKeys.opencms = response.data.token;
      gettingAppToken = false;
    });
  }
}

export function isLoggedIn(): boolean {
  const { cookies } = useCookies();
  const session: UserData | undefined = cookies.get('SHUBSTUDIO_SESSION') as
    | unknown
    | undefined as UserData | undefined;
  userState.isLoggedIn = session !== undefined && session !== null;
  userState.username = session?.username ?? '';
  try {
    const tokenData = JSON.parse(Base64.decode(session?.token || ''));
    if (tokenData.ref_exp && tokenData.ref_exp < Date.now()) {
      // cannot refresh token. Therefore, user is not logged in
      clearUser();
    }
    checkSystemAdmin(tokenData);
  } catch (err) {
    // ignore
  }
  if (!userState.isLoggedIn) {
    // reset warning
    userState.warnAddPassword = false;
  }
  return userState.isLoggedIn;
}

export function getToken(): string | undefined {
  const { cookies } = useCookies();
  const session: UserData | undefined = cookies.get('SHUBSTUDIO_SESSION') as
    | unknown
    | undefined as UserData | undefined;
  console.log(session);
  console.log(`session: ${session}`);
  try {
    const tokenData = JSON.parse(Base64.decode(session?.token || ''));
    if (tokenData.ref_exp && tokenData.ref_exp < Date.now()) {
      // cannot refresh token. Therefore, user is not logged in
      return undefined;
    }
    checkSystemAdmin(tokenData);
  } catch (err) {
    // ignore
  }
  return session?.token;
}

export function getRefreshToken(): string | undefined {
  const { cookies } = useCookies();
  const session: UserData | undefined = cookies.get('SHUBSTUDIO_SESSION') as
    | unknown
    | undefined as UserData | undefined;
  return session?.refresh;
}

export function setUser(userData: UserData) {
  const { cookies } = useCookies();
  cookies.set(
    'SHUBSTUDIO_SESSION',
    JSON.stringify(userData),
    '90d',
    undefined,
    undefined,
    true
  );
  isLoggedIn();
}

export function clearUser() {
  const { cookies } = useCookies();
  cookies.remove('SHUBSTUDIO_SESSION');
  isLoggedIn();
}
