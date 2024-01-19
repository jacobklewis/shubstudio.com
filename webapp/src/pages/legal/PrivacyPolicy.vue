<template>
  <q-page>
    <div class="column items-center" style="padding-top: 10vh; padding-bottom: 5vh; color: white;">
      <div class="container" style="max-width: 750px;">
        <h3>Privacy Policy</h3>
        <br />
        <privacy-policy-component></privacy-policy-component>
      </div>
    </div>

  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import PrivacyPolicyComponent from 'src/components/legal/PrivacyPolicyComponent.vue';

export default defineComponent({
  name: 'PrivacyPolicyPage',
  components: {
    PrivacyPolicyComponent
  },
  setup() {

    return {};
  }
});
</script>
