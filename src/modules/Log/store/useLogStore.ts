import { defineStore } from 'pinia'
import { Reason } from '../../reason/interfaces/index'

export const useLogStore = defineStore('log', {
  state: (): LogStore => ({
    document: '',
  }),

  actions: {
    async getUser(document: string) {
      try {
      } catch (err) {
        console.log(err)
      }
    },
  },
})
