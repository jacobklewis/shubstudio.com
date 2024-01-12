<template>
  <q-page class="full-height row justify-center items-center" style=" color: white;">
    <div class="row loginbox">
      <div class="col-md-6 col-xs-12 row items-center">

        <div style="width: 100%; padding-bottom: 30px;">
          <!-- <q-img style="width: 50%;" src="/icons/logo.svg" /> -->
          <p class="text-h5"><span style="font-size:3rem">&ldquo;</span>At Shub Studio, we believe in creating a seamless
            and secure digital hub for shubs
            around
            the
            world. The login page is your gateway to an immersive world where technology meets tradition, and community
            thrives.&rdquo;</p>
        </div>

      </div>
      <div class="col-md-1 col-xs-12"></div>
      <div class="col-md-5 col-xs-12">
        <q-card>
          <q-card-section>
            <div>
              <q-form @submit="onSubmit">
                <q-input v-model="username" filled label="Username" lazy-rules :rules="[
                  (val) => (val && val.length > 0) || 'Please type your Username',
                ]" />
                <q-input v-model="password" filled label="Password" type="password" lazy-rules :rules="[
                  (val) => (val && val.length > 0) || 'Please type your Password',
                ]" />
                <q-btn class="full-width" label="Login" type="submit" color="secondary" />
              </q-form>
              <br />
              <q-btn class="full-width" label="Login Help?" onclick="alert('TODO')" flat color="secondary" />

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
    const time = ref(80);

    return {
      username,
      password,
      time,
      onSubmit() {
        const txtEncoder = new TextEncoder();
        const txtDecoder = new TextDecoder('utf8');
        const hashh = sha256(txtEncoder.encode(password.value));
        const passHash = Base64.encode(txtDecoder.decode(hashh));

        api
          .post('/oauth/login', {
            username: username.value?.toLowerCase(),
            password: passHash,
          })
          .then(function (res) {
            if (res.status == 200) {
              setUser(res.data);
              if (Object.keys(router.currentRoute.value.query).indexOf('redirectPath') >= 0) {
                // navigate to redirectPath
                const redirectPath = router.currentRoute.value.query['redirectPath']?.toString().split(',').join('/');
                router.push({ path: redirectPath || '/' });
              } else {
                router.push({ path: '/' });
              }
            } else {
              alert('Error');
            }
          }).catch(function (res) {
            if (res.response.status == 401) {
              // Incorrect user/password
              const statusMessage = res.response.data?.status || 'Unknown Error';
              alert(statusMessage);
            }
          });
      },
    };
  },
});
</script>

