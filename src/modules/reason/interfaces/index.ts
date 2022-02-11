export interface Reason {
  description: string
  id: string
  name: string
}

export interface Reasons {
  reasons?: Reason[]
}

export interface ReasonStore {
  reason: Reason
  reasons: Reason[]
}

export interface Data {
  data: Reason[]
}
