<template>
  <q-page>

    <div>
      <div style="background-color:#22b573; color: white;" class="column items-center">
        <br />
        <br />
        <br />
        <div class="container">
          <h4>Drink Calculator Settings</h4>
          <q-card class="my-card bg-secondary text-white">
            <q-card-section>
              <q-btn flat icon="fa-solid fa-arrow-left" to="/apps/drink-calc" />
            </q-card-section>
            <q-card-section>
              <p>
                The recommended maximum alcohol consumption per week would be:
              </p>
              <ul>
                <li>
                  For women: Up to 7 drinks per week &equals; <b>4.2 oz pure alcohol</b>
                </li>
                <li>
                  For men: Up to 14 drinks per week &equals; <b>8.4 oz pure alcohol</b>
                </li>
              </ul>
              <q-input dark v-if="prefOz >= 0" type="number" label="Weekly pure Alcohol Oz" v-model="prefOz"
                :rules="[val => val > 0 || 'Please enter a value above 0']" />
              <br />
              <q-btn :loading="loading" @click="updatePrefs">Update</q-btn>
            </q-card-section>
          </q-card>
        </div>
        <br />
      </div>
    </div>

  </q-page>
</template>

<script lang="ts">
import { api } from 'src/boot/axios';
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'DrinkCalcSettings',
  components: {},
  setup() {
    const prefOz = ref(-1);
    const loading = ref(false);
    const updatePrefs = () => {
      loading.value = true;
      api.put('/apps/drinkcalc/prefs', { weeklyAllowanceOz: prefOz.value }).then(() => {
        console.log('updated!');
        loading.value = false;
      })
    }
    api.get('/apps/drinkcalc').then((res) => {
      prefOz.value = res.data.allowance;
      if (prefOz.value <= 0) {
        prefOz.value = 4;
      }
    })
    return { prefOz, updatePrefs, loading };
  }
});
</script>
