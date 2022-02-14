<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'Reason',
  })
</script>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useReasonStore } from '../store/useReasonStore'
  import useGeneral from '../composable/useGeneral'

  import { Reason as reasonInterface } from '../interfaces'

  import Confirmation from './Confirmation.vue'
  import ReasonForm from './ReasonForm.vue'

  const emit = defineEmits(['goBack'])
  const props = defineProps({
    reason: {
      required: true,
      type: Object as () => reasonInterface,
    },
  })

  const useReason = useReasonStore()
  const { hideLoading, notify, showLoading } = useGeneral()

  /*hinge Confirmation component*/
  const openConfirmation = ref(false)
  const toggleOpenConfirmation = () => {
    openConfirmation.value = !openConfirmation.value
  }
  const onDelete = () => {
    toggleOpenConfirmation()
  }
  const deleteConfirmedReason = async (id: string) => {
    showLoading()
    const resp = await useReason.deleteReason(id)
    hideLoading()
    if (resp) emit('goBack')
    notify({
      color: 'secondary',
      icon: 'cloud_done',
      message: 'Razón eliminada',
      textColor: 'white',
    })
  }

  const openReasonForm = ref(false)
  const toggleOpenReasonForm = () => {
    openReasonForm.value = !openReasonForm.value
  }
  const onEdit = () => {
    toggleOpenReasonForm()
  }
</script>

<template>
  <q-page padding>
    <div class="row q-px-sm q-pb-sm">
      <q-btn
        flat
        class="q-ma-xs"
        color="secondary"
        icon="las la-arrow-circle-left"
        @click="emit('goBack')"
      />

      <q-space />

      <q-btn
        outline
        class="q-ma-xs"
        color="secondary"
        icon="las la-pen"
        @click="onEdit()"
      />

      <q-btn
        outline
        class="q-ma-xs"
        color="negative"
        icon="las la-trash-alt"
        @click="onDelete()"
      />
    </div>

    <q-card class="my-card">
      <q-card-section class="text-h6">
        {{ reason.name }}
      </q-card-section>
      <q-card-section>
        {{ reason.description }}
      </q-card-section>
    </q-card>
  </q-page>

  <confirmation
    :reason="props.reason"
    :openConfirmation="openConfirmation"
    :text="'Confirma que desea eliminar la razón'"
    @closeConfirmation="toggleOpenConfirmation"
    @delete="deleteConfirmedReason"
  />

  <reason-form
    :openReasonForm="openReasonForm"
    :reason="reason"
    :title="'Editando la razón'"
    @closeReasonForm="toggleOpenReasonForm"
  />
</template>

<style lang="scss" scoped></style>
