export interface IPageDataArgs {
  offset: number
  size: number
}
export interface IPageDataReturn {
  code: number
  data: {
    list: any[]
    totalCount: number
  }
}
