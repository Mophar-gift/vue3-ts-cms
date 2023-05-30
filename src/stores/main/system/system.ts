import type { IPageDataArgs } from '@/service/api/main/system/type'
import type { ISystemState } from './type'
import {
  deletePageDataByIdApi,
  patchPageDataApi,
  postNewPageDataApi,
  postPageDataApi
} from '@/service/api'
import { defineStore } from 'pinia'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    pageDataList: [],
    pageDataTotalCount: 0
  }),
  actions: {
    // 查
    async fetchPageDataAction(pageName: string, payload: IPageDataArgs) {
      const res = await postPageDataApi(pageName, payload)
      const { list, totalCount } = res.data
      this.$patch({ pageDataList: list, pageDataTotalCount: totalCount })
    },

    // 增
    addNewPageDataAction(pageName: string, userInfo: any) {
      return new Promise<any>((resolve, reject) => {
        postNewPageDataApi(pageName, userInfo)
          .then((res) => {
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },

    // 改
    editPageDataAction(pageName: string, id: number, userInfo: any) {
      return new Promise<any>((resolve, reject) => {
        patchPageDataApi(pageName, id, userInfo)
          .then((res) => {
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },

    // 删
    deletePageDataAction(pageName: string, id: number) {
      return new Promise<any>((resolve, reject) => {
        deletePageDataByIdApi(pageName, id)
          .then((res) => {
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
})

export default useSystemStore
