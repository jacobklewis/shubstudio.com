<template>
  <q-dialog v-model="model">
    <q-card>
      <q-card-section>
        <div class="text-h6">Add Drink</div>
      </q-card-section>

      <q-card-section style="max-height: 80vh" class="scroll">
        <div class="text-h6">Volume (oz)</div>
        <q-knob v-model="volume" size="25vh" :thickness="0.5" :step="0.5" :min="1" :max="16" color="orange" show-value
          center-color="orange-1" class="q-ma-md" />
        <div class="text-h6">ABV</div>
        <q-btn-toggle v-model="abv" toggle-color="primary" spread :options="[
    { label: '4.2%', value: 4.2 },
    { label: '5%', value: 5 },
    { label: '6%', value: 6 },
    { label: '7%', value: 7 },
    { label: '13%', value: 13 },
    { label: '40%', value: 40 },
  ]" />
        <q-input v-model="abv" filled type="number" label="Custom ABV" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Save" @click="saveDrink" color="primary" />
        <q-btn flat label="Cancel" color="black" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>

import { api } from 'src/boot/axios';
import { ref } from 'vue';

const model = defineModel<boolean>();
const volume = ref(12);
const abv = ref(5);

const saveDrink = () => {
  api.post('apps/drinkcalc', { sizeOz: volume.value, abv: abv.value }).then((res) => {
    console.log('saved drink!');
    model.value = false
  })
}
</script>
