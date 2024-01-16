<template>
  <q-page class="full-height" style=" color: white;">
    <div class="row settingsbox">
      <div class="col-md-4 col-xs-12 gt-sm">
        <settings-menu-component>

        </settings-menu-component>
      </div>
      <div class="col-md-1 col-xs-12 gt-sm" style="height: 10px;"></div>
      <div class="col-md-7 col-xs-12">
        <q-card style=" color: #232524;">
          <q-card-section>
            <q-list>
              <q-item class="lt-md" style="padding-left: 0px;">
                <q-btn to="/settings" no-caps flat icon="fa-solid fa-arrow-left" label="Settings"></q-btn>
                <q-space />
                <q-item-section side>
                  <p class="text-subtitle1">Profile</p>
                </q-item-section>
              </q-item>
              <q-separator class="lt-md" />
              <q-item>
                <q-item-section avatar><q-icon name="fa-solid fa-user" /></q-item-section>
                <q-item-section>Username</q-item-section>
                <q-item-section class="gt-xs" side style="overflow: hidden;">{{ username }}</q-item-section>
                <q-item-section side><q-btn disable round flat size="0.5em"
                    icon="fa-solid fa-pen-to-square"></q-btn></q-item-section>
              </q-item>
              <q-item class="xs">
                <q-item-section></q-item-section>
                <q-item-section side style="overflow: hidden;">{{ username }}</q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar><q-icon name="fa-solid fa-address-card" /></q-item-section>
                <q-item-section>Display Name</q-item-section>
                <q-item-section class="gt-xs" side style="overflow: hidden;">{{ displayname || '(none)'
                }}</q-item-section>
                <q-item-section side><q-btn round flat size="0.5em" icon="fa-solid fa-pen-to-square"
                    @click="displaynameEdit = true"></q-btn></q-item-section>
              </q-item>
              <q-item class="xs">
                <q-item-section></q-item-section>
                <q-item-section top side style="overflow: hidden;">{{ displayname || '(none)' }}</q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar><q-icon name="fa-solid fa-envelope" /></q-item-section>
                <q-item-section>Email</q-item-section>
                <q-item-section class="gt-xs" style="overflow: hidden;" side>{{ email || '(none)' }}</q-item-section>
                <q-item-section side><q-btn round flat size="0.5em" icon="fa-solid fa-pen-to-square"
                    @click="emailEdit = true"></q-btn></q-item-section>
              </q-item>
              <q-item class="xs">
                <q-item-section></q-item-section>
                <q-item-section top style="overflow: hidden;" side>{{ email || '(none)' }}</q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar><q-icon name="fa-solid fa-key" /></q-item-section>
                <q-item-section>Password</q-item-section>
                <q-item-section class="gt-xs" side>******</q-item-section>
                <q-item-section side><q-btn round flat size="0.5em" icon="fa-solid fa-pen-to-square"
                    @click="editPassword"></q-btn></q-item-section>
              </q-item>
              <q-item class="xs">
                <q-item-section></q-item-section>
                <q-item-section side>******</q-item-section>
              </q-item>
              <q-separator></q-separator>
              <q-item>
                <q-item-section avatar><q-icon name="fa-solid fa-database" /></q-item-section>
                <q-item-section>Request Account Data</q-item-section>
              </q-item>
              <q-item>
                <q-item-section>We respect and prioritize your privacy. If you ever wish to retrieve your account data under the General Data Protection Regulation (GDPR), we've got you covered. This process ensures transparency and empowers you with access to your personal information within Shub Studio.</q-item-section>
              </q-item>
              <q-item>
                <q-item-section><q-btn outline color="orange" @click="retrieveGDPR">Request Data</q-btn></q-item-section>
              </q-item>
              <q-separator></q-separator>
              <q-item>
                <q-item-section avatar><q-icon name="fa-solid fa-remove" /></q-item-section>
                <q-item-section>Delete Account</q-item-section>
              </q-item>
              <q-item>
                <q-item-section>We believe in giving you the freedom to shape your Shub Studio experience. If you ever feel the need to part ways with your account, the option to delete is yours to embrace.</q-item-section>
              </q-item>
              <q-item>
                <q-item-section><q-btn outline color="red" @click="confirmDelete=true">Delete Account</q-btn></q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-separator inset />
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
    <q-dialog v-model="displaynameEdit">
      <q-card>
        <q-card-section>
          <div class="text-h6">Edit Display Name</div>
        </q-card-section>

        <q-form @submit="updateDisplayname">
          <q-card-section class="q-pt-none">
            <q-input v-model="ed_displayname" filled label="Display Name" lazy-rules :rules="[
              (val) => (val && val.length > 0 && /^[a-zA-Z0-9\s]+$/.test(val)) || 'Please type a valid display name (no special characters)',
            ]" />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Save" color="primary" type="submit" />
            <q-btn flat label="Cancel" color="secondary" v-close-popup />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
    <q-dialog v-model="emailEdit">
      <q-card>
        <q-card-section>
          <div class="text-h6">Edit Email</div>
        </q-card-section>

        <q-form @submit="updateEmail">
          <q-card-section class="q-pt-none">
            <q-input v-model="ed_email" filled label="Email" lazy-rules :rules="[
              (val) => (val && val.length > 0 && /\S+@\S+\.\S+/.test(val)) || 'Please type a valid Email',
            ]" />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Save" color="primary" type="submit" />
            <q-btn flat label="Cancel" color="secondary" v-close-popup />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
    <q-dialog v-model="confirmDelete">
      <q-card>
        <q-card-section>
          <div class="text-h6" style="color:red">Confirm Account Deletion</div>
        </q-card-section>

        <q-card-section>
          <div class="text-subtitle1">Deleting your account is permanent and cannot be undone.</div>
        </q-card-section>
        <q-card-actions align="right">
            <q-btn flat label="DELETE ACCOUNT" color="red" @click="deleteUser" />
            <q-btn flat label="Cancel" color="secondary" v-close-popup />
          </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="viewGDPR">
      <q-card>
        <q-card-section>
          <div class="text-h6">Here is all your data stored on Shub Studio</div>
        </q-card-section>

        <q-card-section>
          TODO!
        </q-card-section>
        <q-card-actions align="right">
            <q-btn flat label="Done" color="primary" v-close-popup />
          </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="passwordEdit">
      <q-card>
        <q-card-section>
          <div class="text-h6">Edit Password</div>
        </q-card-section>
        <q-form @submit="updatePassword">
          <q-card-section class="q-pt-none">
            <q-input v-model="oldPassword" filled label="Old Password" type="password" lazy-rules :rules="[
              (val) => (val && val.length > 0) || 'Please type your Old Password',
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
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Save" color="primary" type="submit" />
            <q-btn flat label="Cancel" color="secondary" v-close-popup />
          </q-card-actions>
        </q-form>
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
import SettingsMenuComponent from 'src/components/SettingsMenuComponent.vue';
import sha256 from 'fast-sha256';

export default defineComponent({
  name: 'ProfilePage',
  components: { SettingsMenuComponent },
  mounted() {
    this.refreshProfile();
  },
  methods: {
    refreshProfile() {
      api.get('/oauth/self').then((response: AxiosResponse) => {
        this.username = response.data.username;
        this.displayname = response.data.displayname;
        this.email = response.data.email;
      })
    },
    updateDisplayname() {
      api.patch('/users', {
        username: this.username,
        displayname: this.ed_displayname
      }).then((response: AxiosResponse) => {
        this.displaynameEdit = false;
        this.displayname = this.ed_displayname;
        this.ed_displayname = '';
      }).catch((reason: AxiosError) => {
        if (reason.response!.status === 400) {
          this.alertMessage = reason.response?.data?.status || 'Unknown Error';
          this.alert = true;
        } else {
          // Handle else
        }
        console.log(reason.message);
      })
    },
    updateEmail() {
      api.patch('/users', {
        username: this.username,
        email: this.ed_email
      }).then((response: AxiosResponse) => {
        this.emailEdit = false;
        this.email = this.ed_email;
        this.ed_email = '';
      }).catch((reason: AxiosError) => {
        if (reason.response!.status === 400) {
          this.alertMessage = reason.response?.data?.status || 'Unknown Error';
          this.alert = true;
        } else {
          // Handle else
        }
        console.log(reason.message);
      })
    },
    updatePassword() {
      const txtEncoder = new TextEncoder();
      const txtDecoder = new TextDecoder('utf8');
      const hashh = sha256(txtEncoder.encode(this.password));
      const passHash = Base64.encode(txtDecoder.decode(hashh));
      const hashhOld = sha256(txtEncoder.encode(this.oldPassword));
      const oldPassHash = Base64.encode(txtDecoder.decode(hashhOld));
      api.patch('/users', {
        username: this.username,
        password: passHash,
        oldPassword: oldPassHash
      }).then((response: AxiosResponse) => {
        this.passwordEdit = false;
        this.password = undefined;
        this.password2 = undefined;
        this.oldPassword = undefined;
      }).catch((reason: AxiosError) => {
        if (reason.response!.status === 400) {
          this.alertMessage = reason.response?.data?.status || 'Unknown Error';
          this.alert = true;
        } else {
          // Handle else
        }
        console.log(reason.message);
      })
    },
    editPassword() {
      this.passwordEdit = true;
      this.password = undefined;
      this.password2 = undefined;
      this.oldPassword = undefined;
    },
    deleteUser() {
      api.delete('/users/'+this.username).then((response: AxiosResponse) => {
        this.router.push({ path: '/logout' });
      }).catch((reason: AxiosError) => {
        if (reason.response!.status === 400) {
          this.alertMessage = reason.response?.data?.status || 'Unknown Error';
          this.alert = true;
        } else {
          // Handle else
        }
        console.log(reason.message);
      })
    },
    retrieveGDPR() {
      this.viewGDPR = true;
    }
  },
  setup() {
    let router = useRouter();
    const username = ref('');
    const displayname = ref('');
    const email = ref('');
    const ed_displayname = ref('');
    const ed_email = ref('');
    const password = ref(undefined);
    const password2 = ref(undefined);
    const oldPassword = ref(undefined);
    const alert = ref(false);
    const alertMessage = ref('')
    const displaynameEdit = ref(false);
    const emailEdit = ref(false);
    const passwordEdit = ref(false);
    const confirmDelete = ref(false);
    const viewGDPR = ref(false);

    return {
      username,
      displayname,
      email,
      ed_displayname,
      ed_email,
      password,
      password2,
      oldPassword,
      alert,
      alertMessage,
      displaynameEdit,
      emailEdit,
      passwordEdit,
      confirmDelete,
      viewGDPR,
      router,
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
            }

            console.log(reason.message);
          });
      },
    };
  },
});
</script>

