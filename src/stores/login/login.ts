import type { IAccount } from '@/types'
import type { ILoginState } from './type'
import { postAccountloginApi, getUserInfoByIdApi, getUserMenusByRoleIdApi } from '@/service/api'
import { defineStore } from 'pinia'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'
import { mapMenuListToBtnPermissions, mapMenusToRoutes } from '@/utils/permission'
import router from '@/router'
import useCommonStore from '../main/common/common'

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: [],
    btnPermissions: []
  }),
  actions: {
    async loginAction(account: IAccount) {
      // 登录
      const loginRes = await postAccountloginApi(account)
      this.token = loginRes.data.token
      localCache.setCache(LOGIN_TOKEN, loginRes.data.token)

      // 获取用户角色信息
      const userInfoRes = await getUserInfoByIdApi(loginRes.data.id)
      this.userInfo = userInfoRes.data
      localCache.setCache('userInfo', userInfoRes.data)

      // 获取角色菜单列表
      const userMenuRes = await getUserMenusByRoleIdApi(userInfoRes.data.role?.id)
      this.userMenus = userMenuRes.data
      localCache.setCache('userMenus', userMenuRes.data)

      // 获取角色按钮权限
      const btnPermissions = mapMenuListToBtnPermissions(userMenuRes.data)
      this.btnPermissions = btnPermissions

      // 获取所有角色和部门数据
      const commonStore = useCommonStore()
      commonStore.fetchEntireDataAction()

      // 将角色菜单列表映射成路由列表，并动态添加路由
      const asyncRoutes = mapMenusToRoutes(userMenuRes.data)
      asyncRoutes.forEach((route) => router.addRoute('main', route))

      router.push('/main')
    },
    loadLocalCacheAction() {
      // 如果刷新，则重新加载数据
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')

      if (token && userInfo && userMenus) {
        this.$patch({ token, userInfo, userMenus })

        // 重新获取角色按钮权限
        const btnPermissions = mapMenuListToBtnPermissions(userMenus)
        this.btnPermissions = btnPermissions

        // 重新加载所有角色和部门数据
        const commonStore = useCommonStore()
        commonStore.fetchEntireDataAction()

        // 重新动态添加路由
        const asyncRoutes = mapMenusToRoutes(userMenus)
        asyncRoutes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})

export default useLoginStore
