export interface ICommonState {
  entireRoles: IRole[]
  entireDepartments: IDepartment[]
  entireMenus: any[]
}
export interface IRole {
  id: number
  name: string
  intro: string
  createAt: string
  updateAt: string
  menuList: any[]
}
export interface IDepartment {
  id: number
  name: string
  parentId: number
  createAt: string
  updateAt: string
  leader: string
}
