<template>
  <q-page>
    <div style="background-color:#22b573; color: white;" class="row justify-center items-center">
      <div class="container" style="color: #232524">
        <q-card style="margin-top: 2vh;">
          <q-card-section>
            <h3 class="text-weight-bolder">{{ chatSession?.name }}</h3>
            <br />

            <q-infinite-scroll reverse style="height: calc(80vh - 200px);" :offset="250">
              <!-- <q-list>
                <q-item v-for="message in chatMessages" v-bind:key="message._id">
                  <q-item-section avatar>
                    <q-avatar>
                      <img src="https://www.jacoblewis.me/assets/images/self-photo.jpg">
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label lines="1">{{ message.userId }}</q-item-label>
                    <q-item-label caption>
                      <div v-html="message.messageHtml"></div>
                    </q-item-label>
                  </q-item-section>

                  <q-item-section side top>
                    {{ detailedDate(message.Created_date) }}
                  </q-item-section>
                </q-item>
              </q-list> -->
              <div class="chat-message-holder">
                <q-chat-message v-for="message in chatMessages" v-bind:key="message._id" :name="message.userId"
                  :text="[message.messageHtml]" text-html :stamp="detailedDate(message.Created_date)" sent
                  avatar="https://www.jacoblewis.me/assets/images/self-photo.jpg" />
              </div>

            </q-infinite-scroll>
          </q-card-section>
          <q-card-section>
            <q-editor v-model="editor" min-height="5rem" />
            <q-btn color="primary" style="width: 100%; margin-top: 5px;">Send</q-btn>
          </q-card-section>
        </q-card>
      </div>
    </div>

  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { api } from 'src/boot/axios';
import { detailedDate } from 'src/boot/formatters';

interface ChatMessage {
  _id: string,
  userId: string,
  sessionId: string,
  messageHtml: string,
  Created_date: Date
}
interface ChatSession {
  _id: string,
  userIds: [string],
  name: string,
  theme: string,
  Created_date: Date
}

export default defineComponent({
  name: 'ShubSpacesChat',
  components: {},
  data() {
    return {
      editor: ''
    }
  },
  methods: {
    async getChatMessages() {
      try {
        const messages = await api.get('/spaces/sessions/' + useRoute().params.sessionId + '/messages');
        if (messages.status == 200) {
          this.chatMessages = messages.data;
        } else {
          alert('error');
        }
      } catch (err) {
        console.log(err);
      }
    },
    async getChatSession() {
      try {
        const session = await api.get('/spaces/sessions/' + useRoute().params.sessionId);
        if (session.status == 200) {
          this.chatSession = session.data;
        } else {
          alert('error');
        }
      } catch (err) {
        console.log(err);
      }
    }
  },
  async mounted() {
    this.getChatSession();
    this.getChatMessages();
  },
  setup() {
    const chatMessages = ref<ChatMessage[]>([]);
    const chatSession = ref<ChatSession>();
    return { chatMessages, chatSession, detailedDate };
  }
});
</script>
