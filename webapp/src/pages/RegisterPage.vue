<template>
  <q-page class="full-height row justify-center items-center" style=" color: white;">
    <div class="row loginbox">
      <div class="col-md-6 col-xs-12 row items-center">

        <div style="width: 100%; padding-bottom: 30px;">
          <h4>Join the Shub Movement Today! <q-chip color="secondary" text-color="white" icon="key">
              Access code required while in beta
            </q-chip></h4>
          <p class="text-h5">Whether you're a seasoned shub enthusiast or embarking on a new digital journey, Shub
            Studio is your passport to a world where tradition meets technology. Unlock the Shub Experience - register now
            and
            immerse yourself in the rich tapestry of shub culture!</p>
        </div>

      </div>
      <div class="col-md-1 col-xs-12"></div>
      <div class="col-md-5 col-xs-12">
        <q-card>
          <q-card-section>
            <q-form @submit="onSubmit">
              <h4 style="color: #ff931e;">Register</h4>
              <br />
              <q-input v-model="username" filled label="Username" lazy-rules :rules="[
                (val) => (val && val.length > 0 && /^[a-zA-Z0-9]+$/.test(val)) || 'Please type your Username (only letters and numbers)',
              ]" />
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
              <q-input v-model="code" filled label="Enter Access Code" type="password" lazy-rules :rules="[
                (val) => (val && val.length > 0) || 'Please enter your Access Code',
              ]" />
              <br />
              <q-btn class="full-width" label="Create Account" type="submit" color="secondary" />
            </q-form>
          </q-card-section>
          <q-separator inset />

          <q-btn class="full-width" label="login" flat to="login" color="secondary" />
        </q-card>


      </div>
    </div>
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Invalid Input</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ alertMessage }}
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="alert3">
      <q-card>
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none"> Unknown Error </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { api } from 'src/boot/axios';
import { AxiosError, AxiosResponse } from 'axios';
import { time } from 'console';
import { useRoute, useRouter } from 'vue-router';
import { setUser } from 'src/boot/authHelper';
import { Base64 } from 'src/components/Base64';
import sha256 from 'fast-sha256';

export default defineComponent({
  name: 'LoginPage',
  components: {},
  setup() {
    let router = useRouter();
    const username = ref('');
    const password = ref(undefined);
    const password2 = ref(undefined);
    const code = ref('');
    const alert = ref(false);
    const alertMessage = ref('')
    const alert3 = ref(false);

    return {
      username,
      password,
      password2,
      code,
      alert,
      alertMessage,
      alert3,
      onSubmit() {
        const txtEncoder = new TextEncoder();
        const txtDecoder = new TextDecoder('utf8');
        const hashh = sha256(txtEncoder.encode(password.value));
        const passHash = Base64.encode(txtDecoder.decode(hashh));
        api
          .post('/users', {
            username: username.value?.toLowerCase(),
            password: passHash,
            code: code.value?.toLowerCase(),
          })
          .then(function (response: AxiosResponse) {
            console.log(response);
            if (response?.status == 200) {
              router.push({ path: '/login' });
            }
          })
          .catch(function (reason: AxiosError) {
            if (reason.response!.status === 400) {
              // Handle 400
              // alert('Username already taken...');
              alertMessage.value = reason.response?.data?.status || 'Unknown Error';
              alert.value = true;
            } else {
              // Handle else
              alert3.value = true;
            }

            console.log(reason.message);
          });
      },
    };
  },
});
</script>

