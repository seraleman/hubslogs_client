<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'LogPage',
  })
</script>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { Reason } from '../../reason/interfaces'

  const reason: Reason = {
    description: '',
    id: '620eb3457fd5565e6cff16f8',
    name: 'Hub Trade',
  }
  const document = ref<string>('')

  const onSubmit = (document: string) => {
    console.log(document)
  }
</script>

<template>
  <q-input
    v-model="document"
    type="text"
    label="Ingrese cédula para registrar"
  />

  <q-btn
    color="primary"
    icon="check"
    label="Registrar visita"
    @click="onSubmit(document)"
  />
</template>

<style lang="scss" scoped></style>
