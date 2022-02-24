import { defineStore } from 'pinia'

export const useLogStore = defineStore('log', {
  state: (): LogStore => ({
    document: '',
  }),

  actions: {
    async getUserByDocument(document: string) {
      try {
      } catch (err) {
        console.log(err)
      }
    },
  },
})
