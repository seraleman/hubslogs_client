<script lang="ts">
import { defineComponent } from 'vue'
import { stringifyQuery } from 'vue-router'
export default defineComponent({
  name: 'ReasonForm',
})
</script>

<script lang="ts" setup>
import { watch } from 'vue'
import useForm from '../composable/useForm'
import { useReasonStore } from '../store/useReasonStore'

const emit = defineEmits(['closeReasonForm'])
const props = defineProps({
  title: { type: String, required: true },
  openReasonForm: { type: Boolean, required: true },
})

const { get, method, twoWay } = useForm()

const { reasonForm } = get
const { isFieldNotNull, onCancel, onReset, onSubmit, toggleIsReasonFormOpen } =
  method
const { isReasonFormOpen, name, description } = twoWay

const useReason = useReasonStore()

watch(
  () => props.openReasonForm,
  (openReasonForm) => {
    if (openReasonForm) toggleIsReasonFormOpen()
  }
)
</script>

<template>
  <q-dialog
    v-model="isReasonFormOpen"
    transition-show="scale"
    @hide="emit('closeReasonForm')"
  >
    <q-card class="my-card q-pa-md">
      <q-card-section class="q-pa-md q-py-lg">
        <!-- v-if="!reason.id" -->
        <span class="text-body1">{{ title }}</span>
      </q-card-section>

      <q-card-section class="q-pt-sm">
        <q-form
          class="q-gutter-md"
          @reset="onReset()"
          @submit="onSubmit(reasonForm, useReason.reasons)"
        >
          <q-input
            filled
            lazy-rules
            color="secondary"
            hint="Ingresa el nombre de la nueva razón"
            label="Razón *"
            type="text"
            v-model="name"
            :rules="[(val) => isFieldNotNull(val, 'Debes ingresar')]"
          />

          <q-input
            autogrow
            filled
            color="secondary"
            hint="Haz una descripción de la razón"
            label="Descripción"
            type="textarea"
            v-model="description"
          />

          <q-card-actions tag="form">
            <q-btn
              flat
              class="q-ma-sm"
              color="secondary"
              label="Cancelar"
              @click="onCancel(undefined)"
            />

            <q-btn
              flat
              class="q-ma-sm"
              color="secondary"
              label="Borrar campos"
              type="reset"
              v-if="!reasonForm.id"
            />

            <q-space />

            <q-btn
              class="q-ma-sm"
              color="secondary"
              type="submit"
              :label="!reasonForm.id ? 'Crear' : 'Editar'"
            />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style lang="sass" scoped>
.col
  height: 50px

.square-box
  height: 50px
  width: 50px

.my-card
  width: 100%
  max-width: 500px
</style>
