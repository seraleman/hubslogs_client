import { computed, ref } from 'vue'
import { useReasonStore } from '../store/useReasonStore'
import { useQuasar } from 'quasar'
import { Reason } from '../interfaces'

const useForm = () => {
  const reasonStore = useReasonStore()
  const $q = useQuasar()

  const isReasonFormOpen = ref(false)
  const reasonForm = ref<Reason>({ description: '', id: '', name: '' })

  const get = {
    isReasonFormOpen: computed(() => isReasonFormOpen.value),
    reasonForm: computed(() => reasonForm.value),
  }

  const method = {
    createReason: async (reasonForm: Reason, reasons: Reason[]) => {
      console.log('escuchando el createReason')
      let idMax = 0
      reasons.forEach((reason) => {
        if (Number(reason.id) > idMax) idMax = Number(reason.id)
      })

      const reason: Reason = {
        description: reasonForm.description,
        id: String(idMax + 1),
        name: reasonForm.name,
      }

      method.showLoading()
      await reasonStore.createReason(reason)
      method.hideLoading()
      method.toggleIsReasonFormOpen()

      $q.notify({
        color: 'secondary',
        icon: 'cloud_done',
        message: `La razón '${reasonForm.name}' ha sido creada`,
        textColor: 'white',
      })

      method.resetReasonForm()
    },

    hideLoading: () => {
      $q.loading.hide()
    },

    isFieldNotNull: (val: string, message: string) => {
      return (val !== null && val !== '') || message
    },

    resetReasonForm: () => {
      reasonForm.value = { description: '', id: '', name: '' }
    },

    toggleIsReasonFormOpen: () => {
      isReasonFormOpen.value = !isReasonFormOpen.value
    },

    showLoading: () => {
      $q.loading.show({
        message: 'Por favor espera...',
        boxClass: 'bg-grey-2 text-grey-9',
        spinnerColor: 'secondary',
      })
    },

    /* functions used in components */

    onCancel: (reason: Reason | undefined) => {
      method.toggleIsReasonFormOpen()
      method.resetReasonForm()
    },

    onReset: () => {
      method.resetReasonForm()
    },

    onSubmit: async (reasonForm: Reason, reasons: Reason[]) => {
      if (reasonForm.id === '') await method.createReason(reasonForm, reasons)
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
