import { defineStore } from 'pinia'
import { ReasonStore, Reason } from '../interfaces'
import backendEmulator from './backendEmulator'

export const useReasonStore = defineStore('reason', {
  state: (): ReasonStore => ({
    reason: {
      description: '',
      id: '',
      name: '',
    },
    reasons: [],
  }),

  getters: {
    reasonById: (state) => {
      return (reasonId: string) =>
        state.reasons.find((reason) => reason.id === reasonId)
    },
  },

  actions: {
    async createReason(reason: Reason) {
      const { data } = await backendEmulator.postReasons(reason)
      const { status, reason: reasonCreated } = data
      if (status === 200) this.reasons = [reason, ...this.reasons]
    },

    async loadReasons() {
      if (!this.reasons.length) {
        try {
          const { data } = await backendEmulator.getReasons()
          const { reasons } = data
          if (!reasons) return
          this.reasons = reasons
        } catch (err) {
          console.log(err)
          return err
        }
      }
    },

    setReasonById(id: string) {
      console.log('Llamando a setReasonById')
      const reason = this.reasonById(id)
      if (reason !== undefined) this.reason = reason
    },

    resetReason() {
      this.reason = {
        description: '',
        id: '',
        name: '',
      }
    },
  },
})
