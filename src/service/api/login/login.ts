import kgRequest from '../..'
import type { ILoginReturn } from './type'
import type { IAccount } from '@/types'

enum apiUrls {
  LOGIN = '/login',
  USER = '/users',
  MENU = '/role'
}

export function postAccountloginApi(data: IAccount) {
  return kgRequest.post<ILoginReturn>({
    url: apiUrls.LOGIN,
    data
  })
}

export function getUserInfoByIdApi(id: number) {
  return kgRequest.get({
    url: `${apiUrls.USER}/${id}`
  })
}

export function getUserMenusByRoleIdApi(roleId: number) {
  return kgRequest.get({
    url: `${apiUrls.MENU}/${roleId}/menu`
  })
}
