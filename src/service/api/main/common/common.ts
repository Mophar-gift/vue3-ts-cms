import kgRequest from '@/service'
import type { IEntireDepartmentsReturn, IEntireMenuListReturn, IEntireRolesReturn } from './type'

enum apiUrls {
  ENTIRE_ROLES = '/role/list',
  ENTIRE_DEPARTMENTS = '/department/list',
  ENTIRE_MENUS = '/menu/list'
}

export function postEntireRolesApi() {
  return kgRequest.post<IEntireRolesReturn>({
    url: apiUrls.ENTIRE_ROLES
  })
}

export function postEntireDepartmentsApi() {
  return kgRequest.post<IEntireDepartmentsReturn>({
    url: apiUrls.ENTIRE_DEPARTMENTS
  })
}

export function postEntireMenuListApi() {
  return kgRequest.post<IEntireMenuListReturn>({
    url: apiUrls.ENTIRE_MENUS
  })
}
