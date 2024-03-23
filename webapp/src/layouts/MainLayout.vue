<template>
  <q-layout view="lHh lpr lff">
    <q-header style="background-color: #6d3f0d;">
      <q-toolbar style="background-color: var(--q-primarry);">

        <q-btn flat to="/" rounded size="lg" dense icon="img:icons/logo.svg">
          <q-tooltip>Home</q-tooltip>
        </q-btn>
        <q-space />
        <q-btn-group flat style="margin-right: 10px!important;">
          <!-- <q-btn flat to="/spaces">Spaces</q-btn> -->
          <q-btn flat to="/about">About</q-btn>
          <q-btn-dropdown flat label="Apps">
            <q-list>
              <DropdownSimpleItem v-for=" link  in  appList " :key="link.title" v-bind="link" />
            </q-list>
          </q-btn-dropdown>
        </q-btn-group>
        <q-btn v-if="!isLoggedIn" push to="/login">Login</q-btn>
        <q-btn-dropdown :icon="profile_icon ? 'img:' + profile_icon : 'fa-solid fa-circle'" v-if="isLoggedIn" push
          :label="username">
          <q-list>
            <DropdownSimpleItem v-for=" link  in  userList " :key="link.title" v-bind="link" />
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>


    <q-page-container style="padding-top: 0px;">
      <router-view />

      <template v-if="!isSpaces">
        <div class="row" style="margin-bottom: 20px;">
          <div class="col-3 gt-xs"></div>
          <q-btn class="col-sm-3 col-xs-12" dense flat color="white" to="/legal/tos">Terms of Service</q-btn>
          <q-btn class="col-sm-3 col-xs-12" dense flat color="white" to="/legal/pp">Privacy Policy</q-btn>
          <div class="col-3 gt-xs"></div>
        </div>
        <div
          style="width: 100%; text-align: center; font-size:12px; color:#ffffff; background-color: #ff931e; padding-bottom: 120px;">
          &copy;2024
          Shub Studio. All rights reserved</div>
      </template>

    </q-page-container>

    <Transition name="slide-fade">
      <q-banner class="bg-secondary text-white" v-if="userState.warnAddPassword"
        style="position: fixed; width:100%; bottom: 0px; left: 0px; right: 0px;">
        <div class="text-center">Don't let a forgotten password slow down your Shub Studio adventure! 🔐✨ Ensure a
          smooth
          and secure journey by adding your email for password recovery. It's your key to reclaiming your shub space
          whenever needed.</div>
        <template v-slot:action>
          <q-btn flat color="white" label="Dismiss" @click="userState.warnAddPassword = false" />
          <q-btn flat color="white" label="Add Email" to="/settings/profile"
            @click="userState.warnAddPassword = false" />
        </template>
      </q-banner>
    </Transition>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { userState, getToken, isLoggedIn } from 'src/boot/authHelper';
import DropdownSimpleItem from 'components/DropdownSimpleItem.vue';
import { useRoute, RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import clipboard from 'clipboardy';
import { api } from 'src/boot/axios';

export default defineComponent({
  name: 'MainLayout',
  data() {
    return {

    }
  },
  components: {
    DropdownSimpleItem
  },
  mounted() {
    if (isLoggedIn()) {
      api.get('/oauth/self').then((res) => {
        console.log(res.data);
        userState.warnAddPassword = res.data.email === undefined || !(/\S+@\S+\.\S+/.test(res.data.email));
      })
      this.updateIcon();
    }
  },

  computed: {
    username() {
      return userState.username;
    },
    isLoggedIn() {
      return isLoggedIn();
    },
    appList() {
      let mList = [
        {
          title: 'Games',
          caption: 'View Games',
          icon: 'fa-solid fa-gamepad',
          link: '/games',
        },
      ];
      if (this.isLoggedIn) {
        mList.push({
          title: 'Drink Calculator',
          caption: 'Take Control of your Booze',
          icon: 'fa-solid fa-whiskey-glass',
          link: '/apps/drink-calc',
        })
        mList.push({
          title: 'LED Mapper',
          caption: 'Map those LEDs (Chipper Mask)',
          icon: 'fa-solid fa-lightbulb',
          link: '/apps/led-mapper',
        })
      }
      return mList;
    }
  },
  methods: {
    updateIcon() {
      if (isLoggedIn()) {
        api.get('users/' + this.username + '/icon', { responseType: 'blob' }).then((response) => {
          const blob = response.data;
          let reader = new FileReader()
          reader.readAsDataURL(blob)
          reader.onloadend = () => {
            var base64data = reader.result;
            this.profile_icon = base64data;
          }
        })
      }
    }
  },
  beforeRouteUpdate(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    this.isSpaces = to.path?.startsWith('/spaces') || false;
    this.updateIcon();
    next();
  },

  setup() {
    const isSpaces = ref(false);
    const profile_icon = ref<string | ArrayBuffer | null>('');
    isSpaces.value = useRoute().path?.startsWith('/spaces') || false;

    return {
      userList: [
        {
          title: 'Settings',
          caption: 'Edit your settings',
          icon: 'fa-solid fa-gear',
          link: '/settings',
        },
        {
          title: 'Logout',
          caption: 'Logout of Shub Studio',
          icon: 'logout',
          link: '/logout',
        },
        {
          title: 'Copy Token',
          caption: 'Copy Token to clipboard (debug)',
          icon: 'key',
          action: function () {
            clipboard.write(getToken() || '');
          }
        }
      ],
      userState,
      isSpaces,
      profile_icon
    }
  }
});
</script>
