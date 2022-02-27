import { gql } from 'graphql-tag'

export const createLog = gql`
  mutation createLog($logInput: LogCreateInput!) {
    createLog(logInput: $logInput) {
      id
      reason {
        id
        name
        description
      }
      user {
        document
        full_name
      }
      dateTime
      date
    }
  }
`
