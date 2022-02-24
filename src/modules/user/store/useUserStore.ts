import { defineStore } from 'pinia'
import { UserStore } from '../types'

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
      phoneNumber: '',
      position: '',
      role: '',
    },

    users: [],
  }),

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

    setUserByDocument(document: string) {
      const searchedUser = this.users.find((user) => user.document === document)
      if (searchedUser !== undefined) this.user = searchedUser
    },
  },
})
