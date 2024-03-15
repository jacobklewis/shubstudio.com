<template>
  <q-page>

    <div>
      <div style="background-color:#ff931e; color: white;" class="column items-center">
        <br />
        <br />
        <br />
        <div class="container">
          <h5>Drink Calculator</h5>
          <p>Ounces of Pure Alcohol Allowed each week: {{ summary?.allowance || "(None)" }}</p>
          <p>Ounces remaining: {{ summary?.remaining || "(None)" }}</p>
          <q-linear-progress stripe rounded size="20px"
            :value="((summary?.allowance || 0) - (summary?.remaining || 0)) / (summary?.allowance || 1)" color="warning"
            class="q-mt-sm" />
          <h6>Drinks in the past week:</h6>
          <q-list bordered separator>
            <q-item v-for="drink in (summary?.past7days || [])" v-bind:key="drink._id">
              <q-item-section>
                <q-item-label>{{ drink.sizeOz }} oz at {{ drink.abv }}&percnt;</q-item-label>
                <q-item-label caption>{{ detailedDate(drink.Created_date) }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn flat icon="remove" color="red" @click="() => deleteItem(drink._id)"></q-btn>
              </q-item-section>

            </q-item>
          </q-list>
        </div>
        <q-page-sticky position="top-right" :offset="[18, 18]">
          <q-btn fab icon="add" color="accent" @click="createNew = true" />
        </q-page-sticky>
        <br />
      </div>
      <new-drink-modal v-model="createNew" />
    </div>

  </q-page>
</template>

<script lang="ts">
import { api } from 'src/boot/axios';
import NewDrinkModal from 'src/components/NewDrinkModal.vue';
import { detailedDate } from 'src/boot/formatters';
import { defineComponent, ref, watch } from 'vue';

interface Drink {
  _id: string,
  sizeOz: number,
  abv: number,
  Created_date: Date
}

interface Summary {
  past7days: Drink[],
  allowance: number,
  remaining: number,
}

export default defineComponent({
  name: 'IndexPage',
  components: { NewDrinkModal },
  setup() {
    const createNew = ref(false);
    const summary = ref<Summary>()
    const updateDash = () => {
      api.get('/apps/drinkcalc').then((res) => {
        summary.value = res.data
      })
    }
    const deleteItem = (id: string) => {
      api.delete('/apps/drinkcalc/' + id).then((res) => {
        updateDash();
      })
    }
    watch(createNew, (x) => {
      if (!x) {
        updateDash();
      }
    })
    updateDash();
    return { createNew, summary, deleteItem, detailedDate };
  }
});
</script>
