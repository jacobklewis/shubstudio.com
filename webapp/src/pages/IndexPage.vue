<template>
  <q-page>
    <div class="column items-center" style="padding-top: 10vh; padding-bottom: 5vh; color: white;">
      <div class="container">
        <h1>Shub Studio</h1>
        <br />
        <p class="text-h4" style="padding-top: 50px; max-width: 750px;">At Shub Studio, we are dedicated to crafting
          exceptional software and media products tailored for shubs around the world. Our passion lies in creating
          innovative solutions that resonate with the unique needs and aspirations of shubs everywhere.</p>
      </div>
    </div>

   <q-btn to ="/legal/tos">ayo</q-btn>

  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  setup() {

    return {};
  }
});
</script>
