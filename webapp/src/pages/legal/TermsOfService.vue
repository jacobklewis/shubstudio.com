<template>
  <q-page>
    <div class="column items-center" style="padding-top: 10vh; padding-bottom: 5vh; color: white;">
      <div class="container" style="max-width: 750px;">
        <h3>Terms of Service</h3>
        <br />
        <terms-of-service-component></terms-of-service-component>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TermsOfServiceComponent from 'src/components/legal/TermsOfServiceComponent.vue';

export default defineComponent({
  name: 'TermsOfServicePage',
  components: {
    TermsOfServiceComponent
  },
  setup() {

    return {};
  }
});
</script>
