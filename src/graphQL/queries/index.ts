import { gql } from 'graphql-tag'

export const getAllUsers = gql`
  query getAllUsers {
    getAllUsers {
      id
      date_of_birth
      document
      document_type
      email
      enabled
      entity
      full_name
      password
      phoneNumber
      position
      role
    }
  }
`

export const getAllLogs = gql`
  query getAllLogs {
    getAllLogs {
      id
      reason {
        id
        name
        description
      }
      user {
        id
        full_name
        document
        document_type
        email
        entity
        phoneNumber
        position
      }
      dateTime
    }
  }
`
