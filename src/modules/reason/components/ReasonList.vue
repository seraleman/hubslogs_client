<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ReasonList',
})
</script>

<script lang="ts" setup>
import { useReasonStore } from '../store/useReasonStore'
import { Reason as reasonInterface } from '../interfaces'

import ReasonItem from './ReasonItem.vue'
import Reason from './Reason.vue'

const props = defineProps({
  reason: {
    default() {
      return {
        reason: {
          description: '',
          id: '',
          name: '',
        },
      }
    },
    required: true,
    type: Object,
  },
  reasons: {
    required: true,
    type: Object as () => reasonInterface[],
    default() {},
  },
})

const reasonStore = useReasonStore()
</script>

<template>
  <template v-if="!props.reason.id">
    <div class="row q-pa-md items-end justify-center">
      <reason-item
        v-for="{ id, name, description } in props.reasons"
        :key="id"
        :id="id"
        :name="name"
        :description="description"
        v-bind="$attrs"
      ></reason-item>
    </div>
  </template>

  <template v-else>
    <div class="row q-pa-md items-end justify-center">
      <reason :reason="props.reason" @go-back="reasonStore.resetReason()" />
    </div>
  </template>
</template>

<style lang="sass" scoped>

.my-sticky-header-table
  /* height or max-height is important */
  max-height: 605px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #f9f9f9

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>
