<template>
  <q-dialog v-model="errorHandler.errorVisible">
    <q-card>
      <q-card-section>
        <div class="text-h6">{{ errorHandler.errorTitle }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ errorHandler.errorMessage }}
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" @click="errorHandler.errorVisible = false" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { defineComponent, PropType, ref } from 'vue';
import { errorHandler } from 'boot/authHelper'
import { onMounted } from 'vue';
</script>
