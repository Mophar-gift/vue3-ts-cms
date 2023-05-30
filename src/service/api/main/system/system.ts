import kgRequest from '@/service'
import type { IPageDataArgs, IPageDataReturn } from './type'

// 查
export function postPageDataApi(pageName: string, data: IPageDataArgs) {
  return kgRequest.post<IPageDataReturn>({
    url: `/${pageName}/list`,
    data
  })
}

// 增
export function postNewPageDataApi(pageName: string, data: any) {
  return kgRequest.post({
    url: `/${pageName}`,
    data
  })
}

// 删
export function deletePageDataByIdApi(pageName: string, id: number) {
  return kgRequest.delete({
    url: `/${pageName}/${id}`
  })
}

// 改
export function patchPageDataApi(pageName: string, id: number, data: any) {
  return kgRequest.patch({
    url: `/${pageName}/${id}`,
    data
  })
}
