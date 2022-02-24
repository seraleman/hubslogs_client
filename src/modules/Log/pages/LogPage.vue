<script lang="ts">
  import { defineComponent, watch } from 'vue'
  export default defineComponent({
    name: 'LogPage',
  })
</script>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import { Reason } from '../../reason/interfaces'
  import { User } from '../../user/types'
  import { useUserStore } from '../../user/store/useUserStore'

  const userStore = useUserStore()

  onMounted(() => {
    userStore.getAllUsers()
  })

  const getUserByDocument = ref()

  const reason: Reason = {
    description: '',
    id: '620eb3457fd5565e6cff16f8',
    name: 'Hub Trade',
  }
  const document = ref<string>('')

  const onConsult = (document: string) => {
    userStore.setUserByDocument(document)
  }

  const onRegister = (user: User, Reason: Reason) => {
    console.log('crear registro')
  }
</script>

<template>
  <q-input
    v-model="document"
    type="text"
    label="Ingrese cédula para consultar usuario"
  />

  <q-btn
    color="secondary"
    icon="check"
    label="Consultar usuario"
    @click="onConsult(document)"
  />

  <q-btn
    color="primary"
    icon="check"
    label="Registrar visita"
    @click="onRegister(userStore.user, reason)"
  />

  <pre>{{ userStore.user }}</pre>
</template>

<style lang="scss" scoped></style>
