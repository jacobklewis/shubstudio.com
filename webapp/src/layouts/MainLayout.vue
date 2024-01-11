<template>
  <canvas id="bgcanvas" style="width: 100%; height: 100%; position: fixed; background-color: #ff931e;"></canvas>
  <!-- <div
    style="position: fixed; width: 100%; height: 100%; background: linear-gradient(to right, #23252455, #23252455 50%, #23252400 100%);">
  </div> -->
  <q-layout view="lHh lpr lff">
    <q-header style="background-color: transparent;">
      <q-toolbar style="background-color: var(--q-secondary);">

        <q-btn flat to="/" rounded size="lg" dense icon="img:icons/logo.svg">
          <q-tooltip>Home</q-tooltip>
        </q-btn>
        <q-space />
        <q-btn flat to="/games/shub-hunt">Shub Hunt</q-btn>
        <q-btn flat to="/about">About</q-btn>
        <q-btn v-if="!isLoggedIn" flat to="/login">Login</q-btn>
        <q-btn-dropdown v-if="isLoggedIn" stretch flat :label="username">
          <q-list>
            <DropdownSimpleItem v-for=" link  in  userList " :key="link.title" v-bind="link" />
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>


    <q-page-container>
      <router-view />

      <div
        style="width: 100%; text-align: center; font-size:12px; color:#ffffff; background-color: #ff931e; padding-bottom: 20px;">
        &copy;2024
        Shub Studio. All rights reserved</div>
    </q-page-container>

  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { userState, getToken } from 'src/boot/authHelper';
import DropdownSimpleItem from 'components/DropdownSimpleItem.vue';
import clipboard from 'clipboardy';

export default defineComponent({
  name: 'MainLayout',

  components: {
    DropdownSimpleItem
  },

  computed: {
    username() {
      return userState.username;
    },
    isLoggedIn() {
      return userState.isLoggedIn;
    }
  },

  setup() {

    return {
      userList: [
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
        },

      ]
    }
  }
});
</script>
