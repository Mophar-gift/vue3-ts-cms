import { defineStore } from 'pinia'
import type { ICommonState } from './type'
import { postEntireRolesApi, postEntireDepartmentsApi, postEntireMenuListApi } from '@/service/api'

const useCommonStore = defineStore('common', {
  state: (): ICommonState => ({
    entireRoles: [],
    entireDepartments: [],
    entireMenus: []
  }),
  actions: {
    fetchEntireDataAction() {
      this.fetchEntireRolesAction()
      this.fetchEntireDepartmentAction()
      this.fetchEntireMenus()
    },
    async fetchEntireRolesAction() {
      const res = await postEntireRolesApi()
      this.entireRoles = res.data?.list
    },
    async fetchEntireDepartmentAction() {
      const res = await postEntireDepartmentsApi()
      this.entireDepartments = res.data?.list
    },
    async fetchEntireMenus() {
      const res = await postEntireMenuListApi()
      this.entireMenus = res.data?.list
    }
  }
})

export default useCommonStore
