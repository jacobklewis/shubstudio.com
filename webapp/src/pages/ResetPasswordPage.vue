<template>
  <q-page class="full-height row justify-center items-center" style=" color: white;">
    <div class="row loginbox">
      <div class="col-md-6 col-xs-12 row items-center">

        <div style="width: 100%; padding-bottom: 30px;">
          <h4>Welcome Back:</h4>
          <p class="text-h5">With your new password set, you're ready to dive back into the exciting world of Shub
            Studio!</p>
        </div>

      </div>
      <div class="col-md-1 col-xs-12"></div>
      <div class="col-md-5 col-xs-12">
        <q-card>
          <q-card-section>
            <q-form @submit="onSubmit" v-if="resultMessage.length == 0">
              <h4 style="color: #ff931e;">Reset Password</h4>
              <br />
              <q-input v-model="password" filled label="Password" type="password" lazy-rules :rules="[
              (val) => (val && val.length > 0) || 'Please type your Password',
            ]" />
              <br />
              <q-input v-model="password2" filled label="Re-enter Password" type="password" lazy-rules :rules="[
              (val) =>
                (val && val.length > 0 && val == password) ||
                'Please correctly re-enter your Password',
            ]" />
              <br />
              <q-btn class="full-width" label="Reset Password" type="submit" color="secondary" />
              <br />
            </q-form>
            <div v-if="resultMessage.length > 0">
              <p class="text-subtitle1 text-center" style="color: #232524">{{ resultMessage }}</p>
            </div>
          </q-card-section>
          <q-separator inset />

          <q-btn class="full-width" label="login" flat to="login" color="secondary" />
        </q-card>


      </div>
    </div>

    <legal-modal-component v-model="ppModal" :legal-type="LegalType.PrivacyPolicy"></legal-modal-component>
    <legal-modal-component v-model="tosModal" :legal-type="LegalType.TermsOfService"></legal-modal-component>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { api } from 'src/boot/axios';
import { displayAlert } from 'src/boot/authHelper';
import LegalModalComponent from 'src/components/legal/LegalModalComponent.vue';
import LegalType from 'src/components/legal/LegalType';
import sha256 from 'fast-sha256';
import { Base64 } from 'src/components/Base64';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: 'ResetPasswordPage',
  components: {
    LegalModalComponent
  },
  setup() {
    const password = ref(undefined);
    const password2 = ref(undefined);
    const time = ref(80);
    const resultMessage = ref('');
    const ppModal = ref(false)
    const tosModal = ref(false)
    const alert = ref(false);
    const alertMessage = ref('')

    const passResetCode = useRoute().params.code

    return {
      ppModal,
      tosModal,
      LegalType,
      alert,
      alertMessage,
      password,
      password2,
      time,
      resultMessage,
      onSubmit() {
        const txtEncoder = new TextEncoder();
        const txtDecoder = new TextDecoder('utf8');
        const hashh = sha256(txtEncoder.encode(password.value));
        const passHash = Base64.encode(txtDecoder.decode(hashh));
        api
          .post('/oauth/reset-password', {
            passResetCode: passResetCode,
            password: passHash
          })
          .then(function (res) {
            if (res.status == 200) {
              resultMessage.value = 'Password Reset!';
            } else {
              resultMessage.value = 'An Error Occurred..';
            }
          }).catch(function (res) {
            if (res.response.status == 401) {
              // Incorrect user/password
              const statusMessage = res.response.data?.status || 'Unknown Error';
              displayAlert(statusMessage);
            } else {
              const statusMessage = res.response.data?.status || 'Unknown Error';
              displayAlert(statusMessage);
            }
          });
      },
    };
  },
});
</script>
