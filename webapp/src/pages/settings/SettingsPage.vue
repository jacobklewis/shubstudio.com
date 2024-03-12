<template>
  <q-page class="full-height" style=" color: white;">
    <div class="row settingsbox">
      <div class="col-md-4 col-xs-12">
        <settings-menu-component>

        </settings-menu-component>
      </div>
    </div>

  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { api } from 'src/boot/axios';
import SettingsMenuComponent from 'src/components/SettingsMenuComponent.vue';

export default defineComponent({
  name: 'SettingsPage',
  components: { SettingsMenuComponent },
  setup() {

    return {};
  },
});
</script>
