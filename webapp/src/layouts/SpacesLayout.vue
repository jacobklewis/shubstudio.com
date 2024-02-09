<template>
  <q-page>
    <div class="row">
      <div class="col bg-secondary text-white" style="max-width: 200px;">
        <q-list>
          <q-item clickable v-ripple v-for="session in chatSessions" v-bind:key="session._id"
            :to="'/spaces/chat/' + session._id">
            <q-item-section>{{ session.name }}</q-item-section>
          </q-item>
        </q-list>
      </div>
      <div class="col">
        <q-page-container>
          <router-view />
        </q-page-container>
      </div>
    </div>


  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { api } from 'src/boot/axios';


interface ChatSession {
  _id: string,
  userIds: [string],
  name: string,
  theme: string,
  Created_date: Date
}

export default defineComponent({
  name: 'MainLayout',

  components: {
  },
  data() {
    return {
      drawerLeft: true,

    }
  },
  methods: {
    async getChatSessions() {
      try {
        const sessions = await api.get('/spaces/sessions');
        if (sessions.status == 200) {
          this.chatSessions = sessions.data;
        } else {
          alert('error');
        }
      } catch (err) {
        console.log(err);
      }
    }
  },
  async mounted() {
    await this.getChatSessions();
  },
  setup() {
    const chatSessions = ref<ChatSession[]>([]);
    return { chatSessions };
  }
});
</script>
