<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ReasonLayout',
})
</script>

<script lang="ts" setup></script>

<template>
  <q-layout>
    <div class="row justify-left">
      <q-chip
        class="q-ma-md"
        color="teal-1"
        icon="las la-cogs"
        size="xl"
        text-color="teal-7"
      >
        Razones
      </q-chip>
    </div>
    <q-separator spaced inset />

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<style lang="scss" scoped></style>
