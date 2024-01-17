<template>
  <q-dialog v-model="isOpen">
    <q-card>
      <q-card-section>
        <div class="text-h6">{{ legalType == LegalType.PrivacyPolicy ? 'Privacy Policy' : 'Terms Of Service' }}</div>
      </q-card-section>

      <q-card-section style="max-height: 80vh" class="scroll">
        <privacy-policy-component v-if="legalType == LegalType.PrivacyPolicy"></privacy-policy-component>
        <terms-of-service-component v-if="legalType == LegalType.TermsOfService"></terms-of-service-component>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import LegalType from 'components/legal/LegalType';
import PrivacyPolicyComponent from './PrivacyPolicyComponent.vue';
import TermsOfServiceComponent from './TermsOfServiceComponent.vue';

export default defineComponent({
  name: 'LegalModalComponent',
  components: {
    PrivacyPolicyComponent,
    TermsOfServiceComponent
  },
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    open() {
      this.isOpen = true;
    }
  },
  props: {
    legalType: {
      type: Object as PropType<LegalType>,
      required: true,
    },
  },
  setup() {
    return { LegalType };
  },
});
</script>
