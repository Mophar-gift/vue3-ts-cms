export interface ILoginReturn {
  code: number
  data: {
    id: number
    name: string
    token: string
  }
}
