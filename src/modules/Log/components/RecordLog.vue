<script lang="ts">
  import { defineComponent, watch } from 'vue'
  export default defineComponent({
    name: 'RecordLog',
  })
</script>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useQuasar } from 'quasar'
  import { User } from '../../user/types'
  import { Reason } from '../../reason/types'
  import { useLogStore } from '../store/useLogStore'

  const $q = useQuasar()
  const useLog = useLogStore()

  const emit = defineEmits(['recordLogClosed'])

  const props = defineProps({
    document: { type: String, required: true },
    user: { type: Object as () => User, required: true },
    openRecordLog: { type: Boolean, required: true },
  })

  const isRecordLogOpen = ref(false)

  const toggleIsRecordLogOpen = () => {
    isRecordLogOpen.value = !isRecordLogOpen.value
  }

  watch(
    () => props.openRecordLog,
    (openRecordLog) => {
      if (openRecordLog) toggleIsRecordLogOpen()
    }
  )

  const onRegister = async (user: User, reason: Reason) => {
    $q.loading.show({
      message: 'Esta arquitectura es la correcta',
      boxClass: 'bg-grey-2 text-grey-9',
      spinnerColor: 'secondary',
    })
    await useLog.createLog(user, reason)
    toggleIsRecordLogOpen()
    $q.loading.hide()
  }

  const reason: Reason = {
    description: '',
    id: '620eb3457fd5565e6cff16f8',
    name: 'Hub Trade',
  }
</script>

<template>
  <q-dialog
    persistent
    v-model="isRecordLogOpen"
    @hide="emit('recordLogClosed')"
  >
    <q-card class="my-card">
      <q-card-section class="row justify-center">
        <q-avatar
          size="xl"
          :icon="
            user.id !== '' ? 'las la-file-medical' : 'las la-file-medical-alt'
          "
          :color="user.id !== '' ? 'secondary' : 'negative'"
          text-color="white"
          class="q-mr-sm center"
        />
      </q-card-section>

      <q-card-section class="row items-center">
        <span v-if="user.id !== ''" class="text-h6"
          >Registrando la visita de
          <span class="text-weight-bold text-secondary">{{
            user.full_name
          }}</span>
          en
          <span class="text-weight-bold">Hub Trade.</span></span
        >

        <span v-else class="text-h6">
          El usuario con documento
          <span class="text-weight-bold text-negative">{{ document }}</span> no
          se encuentra registrado.
        </span>
      </q-card-section>

      <q-card-actions align="right" tag="form">
        <template v-if="user.id !== ''">
          <q-btn flat label="Cancelar" color="secondary" v-close-popup />

          <q-btn
            v-if="user.id !== ''"
            label="Registrar"
            color="secondary"
            @click="onRegister(user, reason)"
          />
        </template>
        <q-btn v-else flat label="Aceptar" color="dark" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped>
  .my-card {
    max-width: 400px;
  }
</style>
