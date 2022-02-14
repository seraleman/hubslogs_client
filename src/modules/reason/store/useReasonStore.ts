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
      try {
        const { data } = await backendEmulator.postReasons(reason)
        const { status, reason: reasonCreated } = data
        if (status === 200 && reasonCreated)
          this.reasons = [reasonCreated, ...this.reasons]
      } catch (err) {
        console.log(err)
        return err
      }
    },

    async deleteReason(id: string) {
      try {
        const { data } = await backendEmulator.deleteReasons(id)
        const { status } = data

        if (status === 200) {
          const idx = this.reasons.map((e) => e.id).indexOf(id)
          this.reasons.splice(idx, 1)
          return true
        }
      } catch (err) {
        console.log(err)
        return err
      }
    },

    async updateReason(idx: number, reason: Reason) {
      try {
        const { data } = await backendEmulator.putReasons(reason)
        const { status } = data

        if (status === 200) {
          this.reasons[idx] = reason
        }
      } catch (error) {
        console.log(error)
        return error
      }
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

    updateSetReason(reasonUpdate: Reason) {
      const { description, id, name } = reasonUpdate

      this.reason = {
        description,
        id,
        name,
      }
    },
  },
})
