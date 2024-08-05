<template>
  <q-page>
    <div>
      <div style="background-color:#22b573; color: white;" class="column items-center">
        <br />
        <br />
        <br />
        <div class="container" style="color: #232524">
          <q-card>
            <q-card-section>
              <h3 class="text-weight-bolder">Introducing Shub Spaces</h3>
              <br />
              <p class="text-h6">Welcome to Shub Spaces, the heart of community connection on the Shub Studio website!
                Here, Shub enthusiasts like you can explore, connect, and immerse themselves in a personalized digital
                haven that celebrates the vibrant tapestry of shub culture.</p>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { api } from 'src/boot/axios';


export default defineComponent({
  name: 'ShubSpaces',
  components: {},
  setup() {
    return {};
  }
});
</script>
