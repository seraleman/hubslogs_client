<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Reason',
})
</script>

<script lang="ts" setup>
const emit = defineEmits(['goBack'])
const props = defineProps({
  reason: {
    required: true,
    type: Object,
  },
})
</script>

<template>
  <q-page padding>
    <div class="row q-px-sm q-pb-sm">
      <q-btn
        flat
        class="q-ma-xs"
        color="secondary"
        icon="las la-arrow-circle-left"
        @click="$emit('goBack')"
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
        @click="onDelete(reason)"
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
</template>

<style lang="scss" scoped></style>
