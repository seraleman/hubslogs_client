import { computed, ref } from 'vue'
import { useReasonStore } from '../store/useReasonStore'
import { useQuasar } from 'quasar'
import { Reason } from '../interfaces'
import useGeneral from '../composable/useGeneral'

const useForm = () => {
  const reasonStore = useReasonStore()
  const $q = useQuasar()
  const { showLoading, hideLoading, notify } = useGeneral()

  const isReasonFormOpen = ref(false)
  const reasonForm = ref<Reason>({ description: '', id: '', name: '' })

  const get = {
    isReasonFormOpen: computed(() => isReasonFormOpen.value),
    reasonForm: computed(() => reasonForm.value),
  }

  const method = {
    createReason: async (reasonForm: Reason, reasons: Reason[]) => {
      let idMax = 0
      reasons.forEach((reason) => {
        if (Number(reason.id) > idMax) idMax = Number(reason.id)
      })

      const reason: Reason = {
        description: reasonForm.description,
        id: String(idMax + 1),
        name: reasonForm.name,
      }

      showLoading()
      await reasonStore.createReason(reason)
      hideLoading()
      method.toggleIsReasonFormOpen()

      notify({
        color: 'secondary',
        icon: 'cloud_done',
        message: `La razón '${reasonForm.name}' ha sido creada`,
        textColor: 'white',
      })

      method.resetReasonForm()
    },

    isFieldNotNull: (val: string, message: string) => {
      return (val !== null && val !== '') || message
    },

    resetReasonForm: () => {
      reasonForm.value = { description: '', id: '', name: '' }
    },

    setReasonForm: (reason: Reason) => {
      const { description, id, name } = reason

      reasonForm.value = {
        description,
        id,
        name,
      }
    },

    toggleIsReasonFormOpen: () => {
      isReasonFormOpen.value = !isReasonFormOpen.value
    },

    updateReason: async (reasonForm: Reason, reasons: Reason[]) => {
      const { description, id, name } = reasonForm
      const idx = reasons.map((e) => e.id).indexOf(id)
      const reasonCurrent = reasons[idx]

      const reason: Reason = {
        description,
        id,
        name,
      }

      const equal = JSON.stringify(reason) === JSON.stringify(reasonCurrent)

      if (equal) {
        notify({
          color: 'warning',
          icon: 'las la-exclamation-circle',
          message: `No hubo cambios en la información de ${reasonCurrent.name}`,
          textColor: 'white',
        })
        // mutation.toggleIsReasonFormOpen()
      } else {
        showLoading()
        await reasonStore.updateReason(idx, reason)
        hideLoading()
        reasonStore.updateSetReason(reason)

        notify({
          color: 'secondary',
          icon: 'cloud_done',
          message: `La información de ${reason.name} ha sido actualizada`,
          textColor: 'white',
        })
        method.toggleIsReasonFormOpen()
      }
    },

    /* functions used in components */

    onCancel: (reason: Reason | undefined) => {
      method.toggleIsReasonFormOpen()
      if (reason !== null) method.resetReasonForm()
    },

    onReset: () => {
      method.resetReasonForm()
    },

    onSubmit: async (reasonForm: Reason, reasons: Reason[]) => {
      if (reasonForm.id === '') await method.createReason(reasonForm, reasons)
      else method.updateReason(reasonForm, reasons)
    },
  }

  const twoWay = {
    setfieldReasonForm: (arg: { key: string; value: string }) => {
      const { key, value } = arg
      switch (key) {
        case 'name':
          reasonForm.value.name = value
          break
        case 'description':
          reasonForm.value.description = value
          break
      }
    },

    isReasonFormOpen: computed({
      get() {
        return get.isReasonFormOpen.value
      },
      set() {
        isReasonFormOpen.value = !isReasonFormOpen.value
      },
    }),

    name: computed({
      get() {
        if (reasonForm.value.name === undefined) return ''
        return reasonForm.value.name
      },
      set(value: string) {
        twoWay.setfieldReasonForm({ key: 'name', value })
      },
    }),

    description: computed({
      get() {
        if (reasonForm.value.description === undefined) return ''
        return reasonForm.value.description
      },
      set(value: string) {
        twoWay.setfieldReasonForm({ key: 'description', value })
      },
    }),
  }

  return {
    get,
    method,
    twoWay,
  }
}

export default useForm
