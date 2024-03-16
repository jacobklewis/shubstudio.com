<template>
  <q-page>

    <div>
      <div style="background-color:#ff931e; color: white;" class="column items-center">
        <br />
        <br />
        <br />
        <div class="container">
          <h4>Drink Calculator</h4>
          <q-card class="my-card bg-secondary text-white">
            <q-card-section>
              <q-btn class="float-right" flat icon="fa-solid fa-gear" to="/apps/drink-calc/settings" />
              <div class="text-h6">Ounces remaining: {{ summary?.remaining || "(None)" }}</div>
              <div class="text-subtitle2">Ounces of Pure Alcohol Allowed each week: {{ summary?.allowance || "(None)" }}
              </div>
            </q-card-section>

            <q-card-section>
              <q-linear-progress stripe rounded size="20px" :value="completionValue" color="green" class="q-mt-sm" />
              <q-linear-progress v-if="completionValue > 1" stripe rounded size="20px" :value="completionValue - 1"
                color="warning" class="q-mt-sm" />

            </q-card-section>
            <q-card-section>
              <div class="text-h6">Drinks in the past week:</div>
              <q-list dark bordered separator>
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
            </q-card-section>

          </q-card>


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
import { useRouter } from 'vue-router';

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
  name: 'DrinkCalc',
  components: { NewDrinkModal },
  computed: {
    completionValue() { return ((this.summary?.allowance || 0) - (this.summary?.remaining || 0)) / (this.summary?.allowance || 1) }
  },
  setup() {
    const createNew = ref(false);
    const summary = ref<Summary>()
    const router = useRouter()
    const updateDash = () => {
      api.get('/apps/drinkcalc').then((res) => {
        summary.value = res.data
        if (summary.value?.allowance == -1) {
          router.push('/apps/drink-calc/settings');
        }
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
