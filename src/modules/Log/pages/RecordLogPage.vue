<script lang="ts">
  import { defineComponent, watch } from 'vue'
  export default defineComponent({
    name: 'RecordLogPage',
  })
</script>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import { useQuasar } from 'quasar'
  import { useUserStore } from '../../user/store/useUserStore'
  import RecordLog from '../components/RecordLog.vue'

  const $q = useQuasar()
  const userStore = useUserStore()

  onMounted(async () => {
    $q.loading.show({
      message: 'Esta arquitectura es la correcta',
      boxClass: 'bg-grey-2 text-grey-9',
      spinnerColor: 'secondary',
    })
    await userStore.getAllUsers()
    $q.loading.hide()
  })

  const document = ref('')

  const resetDocument = () => {
    document.value = ''
  }

  const openRecordLog = ref(false)

  const toggleOpenRecordLog = () => {
    openRecordLog.value = !openRecordLog.value
  }

  const onConsult = (document: string) => {
    if (document !== '') {
      userStore.consultUserByDocument(document)
      toggleOpenRecordLog()
    }
  }
</script>

<template>
  <q-page padding>
    <div class="row justify-center">
      <q-card class="my-card">
        <q-card-section>
          <span class="text-h6"> ¿Quién nos visita hoy? </span>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-form>
            <q-input
              v-model="document"
              type="text"
              label="Ingrese número de documento del usuario"
              color="secondary"
            />
            <q-btn
              class="btn-consult q-mt-sm"
              color="secondary"
              icon="las la-search"
              label="Consultar"
              type="submit"
              @click="onConsult(document)"
            />
          </q-form>
        </q-card-section>
      </q-card>
    </div>

    <record-log
      :document="document"
      :user="userStore.user"
      :open-record-log="openRecordLog"
      @recordLogClosed="
        toggleOpenRecordLog(), resetDocument(), userStore.resetUser()
      "
    />
  </q-page>
</template>

<style lang="scss" scoped>
  .my-card {
    min-width: 400px;
  }

  .btn-consult {
    width: 100%;
  }
</style>
