<template>
  <q-page>

    <div>
      <div style="background-color:#ff931e; color: white;" class="column items-center">
        <br />
        <br />
        <br />
        <div class="container">
          <h5>Drink Calculator</h5>
        </div>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <q-btn fab icon="add" color="accent" @click="createNew = true" />
        </q-page-sticky>
        <br />
      </div>
      <new-drink-modal v-model="createNew" />
    </div>

  </q-page>
</template>

<script lang="ts">
import NewDrinkModal from 'src/components/NewDrinkModal.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  components: { NewDrinkModal },
  setup() {
    const createNew = ref(false);
    return { createNew };
  }
});
</script>
