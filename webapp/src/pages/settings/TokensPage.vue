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
                  <p class="text-subtitle1">Tokens</p>
                </q-item-section>
              </q-item>
              <q-separator class="lt-md" />
              <q-item>
                <q-table style="width: 100%;" @row-click="onRowClick" title="All Tokens" :rows="rows" :columns="columns"
                  row-key="name" />
              </q-item>
            </q-list>
          </q-card-section>
          <q-separator inset />
        </q-card>
      </div>
    </div>
    <q-dialog v-model="expandedTokenEnabled">
      <q-card style="max-width: 90%!important; min-width: 50%!important;">
        <q-card-section>
          <div class="text-h6">Token Data</div>
        </q-card-section>

        <q-card-section style="max-height: 60vh" class="scroll">
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label>Domain</q-item-label>
                <q-item-label caption lines="2">{{ expandedToken.expanded.domain }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Username</q-item-label>
                <q-item-label caption lines="2">{{ expandedToken.expanded.username }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Token Key</q-item-label>
                <q-item-label caption lines="2">{{ expandedToken.expanded.token }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Expiration</q-item-label>
                <q-item-label caption lines="2">{{ new Date(expandedToken.expanded.expiration).toLocaleDateString('en-US')
                }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Scopes</q-item-label>
                <q-item-label caption>
                  <q-chip v-for="scope in expandedToken.expanded.scopes" v-bind:key="scope" color="primary"
                    text-color="white">
                    {{ scope }}
                  </q-chip>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>

        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Delete Token" color="red" @click="deleteToken" />
          <q-btn flat label="Done" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { api } from 'src/boot/axios';
import SettingsMenuComponent from 'src/components/SettingsMenuComponent.vue';
import { errorHandler, getToken, userState } from 'src/boot/authHelper';

export default defineComponent({
  name: 'NotificationsPage',
  components: { SettingsMenuComponent },
  data() {
    return {
      expandedTokenEnabled: false
    }
  },
  mounted() {
    this.refresh()
  },

  methods: {
    onRowClick(evt, row) {
      this.expandedTokenEnabled = true;
      this.expandedToken = row;
    },
    deleteToken() {
      api.delete(`/users/${userState.username}/tokens`, { data: { token: this.expandedToken.token } }).then((res) => {
        this.expandedTokenEnabled = false;
        this.expandedToken = undefined;
        this.refresh();
      }).catch((err) => {
        errorHandler.errorMessage = err;
      })
    },
    refresh() {
      api.get(`/users/${userState.username}/tokens`).then((res) => {
        this.rows = res.data;
      }).catch((err) => {
        errorHandler.errorMessage = err;
      })
    }
  },

  setup() {
    const expandedToken = ref<any>();
    const rows = ref<[]>()
    const columns = [
      {
        name: 'domain',
        label: 'Domain',
        align: 'left',
        sortable: true, field: val => val.expanded.domain
      },
      { name: 'expiration', label: 'Expiration', field: val => val.expanded.expiration, sortable: true, format: val => `${new Date(val).toLocaleDateString('en-US')}` },
    ]

    return { columns, rows, expandedToken };
  },
});
</script>

