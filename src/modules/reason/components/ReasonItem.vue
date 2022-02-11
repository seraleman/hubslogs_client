<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ReasonItem',
})
</script>

<script lang="ts" setup>
const emit = defineEmits(['reasonSelected'])
const props = defineProps({
  id: {
    required: true,
    type: String,
  },
  name: {
    required: true,
    type: String,
  },
  description: {
    default: '',
    type: String,
  },
})

const trimText = (text: string, size: string) => {
  switch (size) {
    case 'small':
      return text.length > 60 ? text.substring(0, 50) + '...' : text

    case 'medium':
      return text.length > 130 ? text.substring(0, 120) + '...' : text
  }
}

const trimmedDescription = trimText(props.description, 'medium')
const trimmedName = trimText(props.name, 'small')
</script>

<template>
  <q-card
    bordered
    class="my-card q-ma-sm cursor-pointer"
    @click="$emit('reasonSelected', id)"
  >
    <q-card-section>
      <div class="text-h6">{{ trimmedName }}</div>
    </q-card-section>

    <q-separator inset />

    <q-card-section>
      {{ trimmedDescription }}
      <template v-if="!trimmedDescription">
        <template v-if="!trimmedDescription">
          <span><i>(agrega una descripción)</i></span>
        </template>
      </template>
    </q-card-section>

    <q-card-section class="row justify-end q-pa-sm card-section-footer">
      <q-chip color="teal-4" text-color="white" dense square class="glossy">
        34 visitas
      </q-chip>
    </q-card-section>
  </q-card>
</template>

<style lang="sass" scoped>
.my-card
  width: 250px
  background-color: #fff
  transition: 0.3s
  &:hover
    background-color: $teal-1
    .card-section-footer
      background-color: $grey-3

.card-section-footer
  background-color: $grey-2
  transition: 0.3s
</style>
