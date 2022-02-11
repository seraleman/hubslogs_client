<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ReasonsPage',
})
</script>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useReasonStore } from '../store/useReasonStore'

import ReasonList from '../components/ReasonList.vue'
import ReasonForm from '../components/ReasonForm.vue'

const reasonStore = useReasonStore()

onMounted(() => {
  reasonStore.loadReasons()
})

const openReasonForm = ref(false)

const toggleIsReasonFormOpen = () => {
  openReasonForm.value = !openReasonForm.value
}

const onNew = () => {
  toggleIsReasonFormOpen()
}
</script>

<template>
  <q-page padding>
    <div class="row q-px-sm q-pb-sm">
      <q-btn
        outline
        class="q-ma-xs my-btn"
        color="secondary"
        icon="las la-plus-circle"
        label=""
        @click="onNew()"
      />

      <q-space />

      <!-- <q-input type="buscar" label="Label" /> -->
    </div>
    <reason-list
      :reasons="reasonStore.reasons"
      :reason="reasonStore.reason"
      @reasonSelected="reasonStore.setReasonById"
    />

    <reason-form
      :title="'Creando una nueva razón'"
      :openReasonForm="openReasonForm"
      @closeReasonForm="toggleIsReasonFormOpen"
    />
  </q-page>
</template>

<style lang="scss" scoped></style>
