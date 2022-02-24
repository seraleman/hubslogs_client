export interface User {
  id: string
  date_of_birth: string
  document: string
  document_type: string
  email: string
  enabled: string
  entity: string
  full_name: string
  password: string
  phoneNumber: string
  position: string
  role: string
}

export interface UserStore {
  user: User
  users: User[]
}
