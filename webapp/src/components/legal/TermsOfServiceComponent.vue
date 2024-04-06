<template>
  <div style="width: 100%; height: 80vh; position: relative;" v-if="termsOfService == ''">
    <q-spinner size="3em" class="absolute-center" color="secondary" />
  </div>
  <div v-else v-html="termsOfService">
  </div>
</template>

<script lang="ts">
import { opencmsApi } from 'src/boot/axios';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'TermsOfServiceComponent',
  mounted() {
    opencmsApi.get('/projects/adba08f9-84d8-485d-9511-5cc767f3e18f/documents/termsofservice/us/en')
      .then((response) => {
        console.log(response.data);
        this.termsOfService = response.data.content;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  setup() {
    const termsOfService = ref('');
    return { termsOfService };
  },
});
</script>
