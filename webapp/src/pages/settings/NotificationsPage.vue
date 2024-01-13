<template>
  <q-page class="full-height" style=" color: white;">
    <div class="row settingsbox">
      <div class="col-md-4 col-xs-12 gt-sm">
        <settings-menu-component>

        </settings-menu-component>
      </div>
      <div class="col-md-1 col-xs-12 gt-sm" style="height: 10px;"></div>
      <div class="col-md-7 col-xs-12">
        <q-card style=" color: #232524;">
          <q-card-section>
            <q-list>
              <q-item class="lt-md">
                <q-btn to="/settings" flat icon="fa-solid fa-arrow-left" label="Settings"></q-btn>
                <q-space />
                <q-item-section side>
                  <p class="text-subtitle1">Profile</p>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar><q-icon name="fa-solid fa-check" /></q-item-section>
                <q-item-section>No notification settings yet...</q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-separator inset />
        </q-card>
      </div>
    </div>

  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { api } from 'src/boot/axios';
import SettingsMenuComponent from 'src/components/SettingsMenuComponent.vue';

export default defineComponent({
  name: 'NotificationsPage',
  components: { SettingsMenuComponent },
  setup() {

    return {};
  },
});
</script>

