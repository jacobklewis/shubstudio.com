<template>
  <q-page>

    <div>
      <div style="background-color:#22b573; color: white;" class="column items-center">
        <br />
        <br />
        <br />

        <div class="container column items-center" v-if="message != ''">
          <h4>Give {{ appName }} Access</h4>
          <h5>{{ message }}</h5>
          <q-btn outline label="Return to Shub Studio" class="full-width" to="/" />
        </div>
        <div class="container column items-center" v-if="message == ''">
          <h4>Give {{ appName }} Access</h4>
          <q-list dark padding bordered class="rounded-borders permissions-box">
            <q-item class="bg-transparent">
              We understand the importance of transparency and value your privacy. {{ appName }} is requesting access to
              the following data from your Shub Studio account.
            </q-item>
            <q-expansion-item :icon="scopeDetails[scope].icon" :label="scopeDetails[scope].display"
              v-for="scope in verifiedScopes" v-bind:key="scope">
              <q-card class="bg-transparent">
                <q-card-section>
                  {{ scopeDetails[scope].description }}
                </q-card-section>
              </q-card>
            </q-expansion-item>

            <q-spinner v-if="verifiedScopes.length == 0" color="white" size="3em" style="width: 100%;" />
            <q-item v-if="verifiedScopes.length != 0">
              <q-btn outline label="Grant Access" class="full-width" @click="grantAccessNow" />
            </q-item>
            <q-item v-if="verifiedScopes.length != 0">
              <q-btn flat label="Ignore" class="full-width" to="/" />
            </q-item>
          </q-list>
          <div style="height: 50px; width: 100%;"></div>

        </div>
        <br />
      </div>
    </div>

  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import { api } from 'src/boot/axios';
import { Base64 } from 'src/components/Base64';

export default defineComponent({
  name: 'IndexPage',
  components: {},
  data() {
    return {
      verifiedScopes: []
    }
  },
  mounted() {
    // Preview
    if (this.message == '') {
      api
        .post('/oauth/external/preview', {
          scopes: this.scopes,
          domain: this.appName,
          fulfillmentId: this.fulfillmentId
        })
        .then((res) => {
          if (res.status == 200) {
            setTimeout(() => this.verifiedScopes = res.data.scopes, 500);
          } else {
            setTimeout(() => this.message = res.data.status, 500);
          }
        }).catch((res) => {
          console.log(res);
          if (res.response.status == 401) {
            // Incorrect user/password
            const statusMessage = res.response.data?.status || 'Unknown Error';
            alert(statusMessage);
          } else {
            setTimeout(() => this.message = res.response.data.status, 500);
          }
        });
    }
  },
  methods: {
    grantAccessNow() {
      api
        .post('/oauth/external/token', {
          scopes: this.verifiedScopes,
          domain: this.appName,
          fulfillmentId: this.fulfillmentId
        })
        .then((res) => {
          if (res.status == 200) {
            this.uploadExternalCheck(res.data.token);
          } else {
            this.message = res.data.status;
          }
        }).catch((res) => {
          console.log(res);
          if (res.response.status == 401) {
            // Incorrect user/password
            const statusMessage = res.response.data?.status || 'Unknown Error';
            alert(statusMessage);
          }
        });
      this.verifiedScopes = [];
    },
    uploadExternalCheck(token: string) {
      api
        .post('/oauth/external/check/' + this.fulfillmentId, {
          token: token
        })
        .then((res) => {
          if (res.status == 200) {
            this.message = 'Access Provided! Please return to your app.'
          } else {
            this.message = res.data.status;
          }
        }).catch((res) => {
          console.log(res);
          if (res.response.status == 401) {
            // Incorrect user/password
            const statusMessage = res.response.data?.status || 'Unknown Error';
            alert(statusMessage);
          }
        });
    }
  },
  setup() {
    let pageValues = {
      appName: '',
      scopes: [],
      fulfillmentId: '',
      message: ref(''),
      scopeDetails: {
        USERNAME: {
          display: 'Username',
          icon: 'fa-solid fa-user',
          description: 'By providing access to your username, you allow the app to enhance its services tailored to your unique preferences within the Shub Studio community.'
        },
        DISPLAY_NAME: {
          display: 'Display Name',
          icon: 'fa-solid fa-address-card',
          description: 'By providing access to your display name, you enable the app to create a more personalized and engaging interaction.'
        },
        EMAIL: {
          display: 'Email',
          icon: 'fa-solid fa-envelope',
          description: 'The app may use your email to send important notifications, updates, and announcements related to your Shub Studio account, ensuring you stay informed about new features, events, and community activities.'
        },
        GAME_LOGS_WRITE: {
          display: 'Write to Game Logs',
          icon: 'fa-solid fa-gamepad',
          description: 'By granting this access, you enable the app to record your gameplay data, allowing for progress tracking, and enhanced features.'
        },
        GAME_LOGS_READ: {
          display: 'Read from Game Logs',
          icon: 'fa-solid fa-gamepad',
          description: 'By granting this access, you enable the app to analyze your gameplay data, allowing for personalized insights, and enhanced features.'
        }
      }
    }

    try {
      const token = useRoute().params.token.toString();
      // const decoded = Base64.decode(token);
      //console.log(decoded);
      const params = JSON.parse(Base64.decode(token));
      /** Structure
       * {
       *  "scopes":["USERNAME", "DISPLAY_NAME"],
       *  "domain":"Shub Hunt",
       *  "fulfillmentId":"abc"
       * } */
      pageValues.appName = params.domain;
      pageValues.fulfillmentId = params.fulfillmentId;
      pageValues.scopes = params.scopes;
    } catch (err) {
      console.log(err);
      pageValues.message.value = 'Unable to fulfill request. Token invalid...'
    }

    return pageValues;
  }
});
</script>
