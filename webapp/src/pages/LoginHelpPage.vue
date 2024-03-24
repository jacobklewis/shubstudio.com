<template>
  <q-page class="full-height row justify-center items-center" style=" color: white;">
    <div class="row loginbox">
      <div class="col-md-6 col-xs-12 row items-center">

        <div style="width: 100%; padding-bottom: 30px;">
          <h4>Reclaim Your Shub Studio Account</h4>
          <p class="text-h5">Lost in the digital labyrinth? Fear not, Shub Enthusiast!</p>
        </div>

      </div>
      <div class="col-md-1 col-xs-12"></div>
      <div class="col-md-5 col-xs-12">
        <q-card>
          <q-card-section>
            <div>
              <q-form @submit="onSubmit" v-if="resultMessage.length == 0">
                <q-input v-model="username" filled label="Username/Email" lazy-rules :rules="[
                (val) => (val && val.length > 0 && (/^[a-zA-Z0-9]+$/.test(val) || /\S+@\S+\.\S+/.test(val))) || 'Please type your Username or Email',
              ]" />
                <br />
                <q-btn class="full-width" label="Request Support" type="submit" color="secondary" />
              </q-form>
              <div v-if="resultMessage.length > 0">
                <p class="text-subtitle1 text-center" style="color: #232524">{{ resultMessage }}</p>
              </div>
              <br />
              <q-btn class="full-width" label="Login" to="login" flat color="secondary" />

            </div>
          </q-card-section>
          <q-separator inset />
          <q-card-section>
            <q-btn class="full-width" label="Register" to="register" outline color="secondary" />

          </q-card-section>
        </q-card>
      </div>
    </div>

  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { api } from 'src/boot/axios';
import { displayAlert } from 'src/boot/authHelper';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: 'LoginHelpPage',
  components: {
  },
  setup() {
    const username = ref('');
    const password = ref(undefined);
    const time = ref(80);
    const resultMessage = ref('');

    return {
      username,
      password,
      time,
      resultMessage,
      onSubmit() {

        api
          .post('/oauth/forgot-password', {
            username: username.value?.toLowerCase()
          })
          .then(function (res) {
            if (res.status == 200) {
              if (res.data.status == 'emailed') {
                resultMessage.value = 'Reset URL emailed to you. Please continue there!';
              } else {
                resultMessage.value = 'Request Submitted. Please check with admin';
              }

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
