<template>
  <q-card style=" color: #232524;">
    <q-card-section>
      <q-list>
        <q-item class="gt-sm">
          <q-item-section>Settings</q-item-section>
        </q-item>
        <q-item class="lt-md">
          <q-item-section>
            <p class="text-subtitle1">Settings</p>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/settings/profile">
          <q-item-section avatar><q-icon name="fa-solid fa-address-card" /></q-item-section>
          <q-item-section>Profile</q-item-section>
          <q-tooltip>Edit your profile</q-tooltip>
        </q-item>
        <q-item clickable v-ripple to="/settings/notifications">
          <q-item-section avatar><q-icon name="fa-solid fa-bell" /></q-item-section>
          <q-item-section>Notifications</q-item-section>
          <q-tooltip>Manage your notifications</q-tooltip>
        </q-item>
        <q-item clickable v-ripple to="/settings/tokens">
          <q-item-section avatar><q-icon name="fa-solid fa-key" /></q-item-section>
          <q-item-section>Tokens</q-item-section>
          <q-tooltip>Manage your Access tokens</q-tooltip>
        </q-item>
        <q-item v-if="userState.isSystemAdmin" clickable v-ripple to="/settings/legal-editor">
          <q-item-section avatar><q-icon name="fa-solid fa-file-alt" /></q-item-section>
          <q-item-section>Legal</q-item-section>
          <q-tooltip>Legal documents</q-tooltip>
        </q-item>
      </q-list>
    </q-card-section>
    <q-separator inset />
    <div class="text-center" style="padding: 10px;">v0.1.15-beta</div>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { userState } from 'src/boot/authHelper';

export default defineComponent({
  name: 'SettingsMenuComponent',
  setup() {

    return { userState };
  },
});
</script>
