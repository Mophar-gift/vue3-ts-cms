import type { RouteRecordRaw } from 'vue-router'

/**
 * 用于记录第一个匹配到的路由
 */
export let firstMenu: any = null

/**
 * 用于根据角色菜单映射出对应的路由数组
 * @param userMenus 接口返回的角色菜单
 * @returns 返回匹配到的路由数组
 */
export function mapMenusToRoutes(userMenus: any[]) {
  const USER_MENUS = userMenus
  const menuRoutes: RouteRecordRaw[] = []

  // 根据本地路由文件，映射出所有路由的列表数组
  const localRoutes = loadFileRoutes()

  // 根据传入的uesrMenus，从所有路由的列表数组中，筛选出角色对应访问权限的路由列表
  function _recurMenus(userMenus: any[], allFileRoutes: RouteRecordRaw[]) {
    for (const item of userMenus) {
      const findRoute = allFileRoutes.find((route) => route.path === item.url)
      if (findRoute) {
        // (将匹配到路由的一级路由也注册，并重定向到第一个子路由)
        if (item.parentId) {
          const parentInfo = USER_MENUS.find((i) => i.id === item.parentId)
          !menuRoutes.find((it) => it.path === parentInfo.url) &&
            menuRoutes.push({ path: parentInfo.url, redirect: findRoute.path })
        }
        menuRoutes.push(findRoute)

        if (!firstMenu) firstMenu = findRoute // 记录第一个路由
      } else {
        item.children && _recurMenus(item.children, allFileRoutes)
      }
    }
  }
  _recurMenus(userMenus, localRoutes)

  return menuRoutes
}

/**
 * 用于根据路径去匹配需要显示的菜单
 * @param path 需要匹配的路径
 * @param userMenus 所有菜单
 */
export function mapPathToBreadcrumb(path: string, userMenus: any[]) {
  const breadcrumb: any[] = []
  const USER_MENUS = userMenus

  // 根据传入的uesrMenus，从所有路由的列表数组中，找到符合条件的路由对象
  function _recurMenus(userMenus: any[]) {
    for (const item of userMenus) {
      if (item.url === path) {
        if (item.parentId) {
          const parentInfo = USER_MENUS.find((i) => i.id === item.parentId)
          parentInfo &&
            breadcrumb.push({
              id: parentInfo.id,
              name: parentInfo.name,
              path: parentInfo.url
            })
        }
        breadcrumb.push({ id: item.id, name: item.name, path: item.url })
      } else {
        item.children && _recurMenus(item.children)
      }
    }
  }
  _recurMenus(userMenus)

  return breadcrumb
}

/**
 * 用于映射出菜单列表里所有对象的id
 * @param menuList 菜单列表
 * @returns 菜单列表所有的id数组
 */
export function mapMenuListToIds(menuList: any[]) {
  const menuIds: number[] = []

  function _recurMenus(menuList: any) {
    for (const item of menuList) {
      if (item.children) {
        _recurMenus(item.children)
      } else {
        menuIds.push(item.id)
      }
    }
  }
  _recurMenus(menuList)

  return menuIds
}

/**
 * 用于映射出菜单列表里所有的按钮权限
 * @param menuList 菜单列表
 * @returns 所有按钮权限
 */
export function mapMenuListToBtnPermissions(menuList: any[]) {
  const btnPermissions: string[] = []

  function _recurMenus(menuList: any[]) {
    for (const item of menuList) {
      if (item.permission) {
        btnPermissions.push(item.permission)
      } else {
        item.children && _recurMenus(item.children)
      }
    }
  }
  _recurMenus(menuList)

  return btnPermissions
}

/**
 * 用于加载本地指定文件模块的工具函数
 * @returns 返回匹配到的文件模块数组
 */
function loadFileRoutes() {
  const localRoutes: RouteRecordRaw[] = []

  const Files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', { eager: true })
  for (const key in Files) {
    const module = Files[key].default
    localRoutes.push(module)
  }

  return localRoutes
}
