import { Reason } from '../../reason/types/index'
import { User } from '../../user/types/index'

export interface Log {
  id: string
  reason: Reason
  user: User
  dateTime: string
}

export interface LogStore {
  logs: Log[]
}
