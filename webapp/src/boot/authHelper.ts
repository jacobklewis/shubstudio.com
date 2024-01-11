import { useCookies } from 'vue3-cookies';
import { reactive, Ref } from 'vue';
import { UserData } from 'src/components/models';

export const userState = reactive({
  username: '',
  isLoggedIn: false,
});

export function isLoggedIn(): boolean {
  const { cookies } = useCookies();
  const session: UserData | undefined = cookies.get('SHUBSTUDIO_SESSION') as
    | unknown
    | undefined as UserData | undefined;
  userState.isLoggedIn = session !== undefined && session !== null;
  userState.username = session?.username ?? '';
  return userState.isLoggedIn;
}

export function getToken(): string | undefined {
  const { cookies } = useCookies();
  const session: UserData | undefined = cookies.get('SHUBSTUDIO_SESSION') as
    | unknown
    | undefined as UserData | undefined;
  console.log(session);
  console.log(`session: ${session}`);
  return session?.token;
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
