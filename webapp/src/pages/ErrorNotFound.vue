<template>
  <div class="fullscreen text-white text-center q-pa-md flex flex-center" style="background-color: #22b573;">
    <div>

      <div style="font-size: 30vh">
        404
      </div>
      <div class="text-h2" style="opacity:.4">
        Oops. No Shubs here...
      </div>

      <q-btn class="q-mt-xl" color="white" text-color="black" unelevated to="/" label="Back to the Studio" no-caps
        icon="img:icons/logo.svg?v=1" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ErrorNotFound'
});
</script>
