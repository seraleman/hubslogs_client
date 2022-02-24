<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'LogLayout',
  })
</script>

<script lang="ts" setup></script>

<template>
  <q-layout>
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<style lang="scss" scoped></style>
