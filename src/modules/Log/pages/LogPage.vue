<script lang="ts">
  import { defineComponent, onMounted } from 'vue'
  export default defineComponent({
    name: 'LogPage',
  })
</script>

<script lang="ts" setup>
  import LogList from '../components/LogList.vue'
</script>

<template>
  <q-page padding>
    <q-btn
      color="secondary"
      icon="las la-plus-circle"
      label="Agregar registro"
      :to="{ name: 'logs-create' }"
    />

    <log-list></log-list>
  </q-page>
</template>

<style lang="scss" scoped></style>
