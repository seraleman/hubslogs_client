import { defineStore } from 'pinia'
import { Log, LogStore } from '../types'
import { User } from '../../user/types'
import { Reason } from '../../reason/types'
import { apolloClient } from '../../../graphQL/client'
import { createLog } from '../../../graphQL/mutations'
import { getAllLogs } from '../../../graphQL/queries'

export const useLogStore = defineStore('log', {
  state: (): LogStore => ({
    logs: [],
  }),

  actions: {
    async createLog(user: User, reason: Reason) {
      const { id } = user

      const logInput = {
        reason,
        user: id,
      }

      const { data, errors } = await apolloClient.mutate({
        mutation: createLog,
        variables: {
          logInput,
        },
      })

      if (data.createLog !== undefined) {
        console.log('entrando en createLog')
        const {
          id: idCreated,
          reason: reasonCreated,
          user: userCreated,
          dateTime,
        } = data.createLog

        const log: Log = {
          id: idCreated,
          reason: {
            description: reasonCreated.description,
            name: reasonCreated.name,
            id: reasonCreated.id,
          },
          user: {
            id: '',
            date_of_birth: '',
            document: userCreated.document,
            document_type: '',
            email: '',
            enabled: '',
            entity: '',
            full_name: userCreated.full_name,
            password: '',
            phone_number: '',
            position: '',
            role: '',
          },
          dateTime,
        }
        console.log(log)
        console.log(this.logs)
        this.logs = [...this.logs, log]
        console.log(this.logs)
      }
    },

    async getAllLogs() {
      try {
        const { data } = await apolloClient.query({
          query: getAllLogs,
        })
        this.logs = [...data.getAllLogs]
      } catch (error) {
        console.log(error)
      }
    },
  },
})
