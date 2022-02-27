<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'LogList',
  })
</script>

<script lang="ts" setup>
  import { ref, computed, onMounted } from 'vue'
  import { useQuasar } from 'quasar'
  import { useLogStore } from '../store/useLogStore'
  import { Log } from '../types'

  const $q = useQuasar()
  const logStore = useLogStore()

  const loading = ref(false)

  onMounted(async () => {
    // $q.loading.show({
    //   message: 'Esta arquitectura es la correcta',
    //   boxClass: 'bg-grey-2 text-grey-9',
    //   spinnerColor: 'secondary',
    // })

    if (logStore.logs.length === 0) {
      loading.value = true
      await logStore.getAllLogs()
      loading.value = false
    }

    // $q.loading.hide()
  })

  const rows = computed(() => {
    return logStore.logs
  })

  const columns = ref([
    {
      name: 'id',
      label: 'Id',
      field: 'id',
      require: false,
    },
    {
      name: 'datetime',
      label: 'Fecha y hora',
      field: 'dateTime',
      require: false,
      sortable: true,
    },
    {
      name: 'reasonName',
      label: 'Razón',
      field: (row: Log) => row.reason.name,
      require: true,
      sortable: true,
      // align: 'left',
    },
    {
      name: 'userName',
      label: 'Usuario',
      field: (row: Log) => row.user.full_name,
      require: true,
      sortable: true,

      // align: 'left',
    },
    {
      name: 'documentName',
      label: 'Documento',
      field: (row: Log) => row.user.document,
      require: true,
      // align: 'left',
    },
  ])

  const visibleColumns = ['datetime', 'reasonName', 'userName', 'documentName']
</script>

<template>
  <q-card class="my-card row justify-center" flat>
    <q-card-section>
      <q-table
        class="my-table bg-grey-2 text-subtitle1"
        :rows="rows"
        :columns="columns"
        row-key="name"
        :visible-columns="visibleColumns"
        rows-per-page-label="Registros por página"
        :loading="loading"
        no-data-label="Aún no hemos ingresado datos"
        loading-label="Cargando los datos desde un microservicio..."
      />
    </q-card-section>
  </q-card>
</template>

<style lang="scss" scoped>
  .my-table {
    font-size: large;
    // max-width: 1000px;
  }
</style>
