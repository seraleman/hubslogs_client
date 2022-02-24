<script lang="ts">
  import { defineComponent, watch } from 'vue'
  export default defineComponent({
    name: 'LogPage',
  })
</script>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import { Reason } from '../../reason/types'
  import { User } from '../../user/types'
  import { useUserStore } from '../../user/store/useUserStore'
  import RecordLog from '../components/RecordLog.vue'
  const userStore = useUserStore()

  onMounted(() => {
    userStore.getAllUsers()
  })

  const document = ref('')
  const openRecordLog = ref(false)

  const toggleOpenRecordLog = () => {
    openRecordLog.value = !openRecordLog.value
  }

  const onConsult = (document: string) => {
    if (userStore.consultUserByDocument(document)) {
      console.log('Entra en la creación')
      toggleOpenRecordLog()
    }
  }
</script>

<template>
  <div>
    <q-input
      v-model="document"
      type="text"
      label="Ingrese número de documento"
    />

    <q-btn
      color="secondary"
      icon="check"
      label="Consultar"
      @click="onConsult(document)"
    />

    <!-- <q-btn color="secondary" icon="check" label="Realizar otra consulta" /> -->
    <!-- @click="onConsult(document)" -->
    <!-- <q-btn color="primary" icon="check" label="Registrar visita" /> -->
    <!-- @click="onRegister(userStore.user,)" -->
  </div>

  <record-log :user="userStore.user" :open-record-log="openRecordLog" />
</template>

<style lang="scss" scoped></style>
