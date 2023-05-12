export type Notion = {
  id: string
  user: string
  title: string
  src: string
  description: string
}

export type Action<TPayload = undefined> = {
  type: string
  payload?: TPayload
}
