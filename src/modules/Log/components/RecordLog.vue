<script lang="ts">
  import { defineComponent, watch } from 'vue'
  export default defineComponent({
    name: 'RecordLog',
  })
</script>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { User } from '../../user/types'
  import { Reason } from '../../Reason/types'

  const props = defineProps({
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

  const onRegister = (user: User, Reason: Reason) => {
    console.log('crear registro')
  }
  const reason: Reason = {
    description: '',
    id: '620eb3457fd5565e6cff16f8',
    name: 'Hub Trade',
  }
</script>

<template>
  <q-dialog v-model="isRecordLogOpen" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
        <span class="q-ml-sm"
          >You are currently not connected to any network.</span
        >
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Turn on Wifi" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped></style>
