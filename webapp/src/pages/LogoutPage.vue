<template>
  <q-page>

    <div>
      <div style="background-color:#22b573; color: white;" class="column items-center">
        <br />
        <br />
        <br />
        <div class="container">
          <h3 class="text-weight-bolder">Until We Meet Again!</h3>
          <p class="text-body1" style="padding-top: 50px; ">As you logout, carry the spirit of Shub Studio with you. We
            look forward to
            welcoming you back soon for more
            exciting shub experiences. Until then, stay connected, stay inspired, and keep the shub spirit alive!</p>
          <div style="height: 50px; width: 100%;"></div>

        </div>
        <br />
      </div>
    </div>

  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { clearUser } from 'src/boot/authHelper';
import { api } from 'src/boot/axios';

export default defineComponent({
  name: 'IndexPage',
  components: {},
  mounted() {
    api.delete('/oauth/logout').then((res) => {
      clearUser();
    }).catch((err) => {
      // Ignore error
      clearUser();
    })
  },
  setup() {
    return {};
  }
});
</script>
