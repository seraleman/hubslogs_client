import { defineStore } from 'pinia'
import { UserStore, User } from '../types'

import { apolloClient } from '../../../graphQL/client'
import { getAllUsers } from '../../../graphQL/queries'

export const useUserStore = defineStore('user', {
  state: (): UserStore => ({
    user: {
      id: '',
      date_of_birth: '',
      document: '',
      document_type: '',
      email: '',
      enabled: '',
      entity: '',
      full_name: '',
      password: '',
      phone_number: '',
      position: '',
      role: '',
    },

    users: [],
  }),

  getters: {
    getUserByDocument: (state) => {
      return (document: string) =>
        state.users.find((user) => user.document === document)
    },
  },

  actions: {
    async getAllUsers() {
      try {
        const { data } = await apolloClient.query({
          query: getAllUsers,
        })
        this.users = data.getAllUsers
      } catch (error) {
        console.log(error)
      }
    },

    consultUserByDocument(document: string) {
      const user = this.getUserByDocument(document)
      if (user !== undefined) {
        this.setUser(user)
        return true
      } else return false
    },

    setUser(user: User) {
      this.user = user
    },

    resetUser() {
      this.user = {
        id: '',
        date_of_birth: '',
        document: '',
        document_type: '',
        email: '',
        enabled: '',
        entity: '',
        full_name: '',
        password: '',
        phone_number: '',
        position: '',
        role: '',
      }
    },
  },
})
