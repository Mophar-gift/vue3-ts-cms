import { createRouter, createWebHashHistory } from 'vue-router'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'
import Main from '@/views/main/main.vue'
import { firstMenu } from '@/utils/permission'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      name: 'main',
      path: '/main',
      component: Main
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login/login.vue')
    },
    {
      name: 'notFound',
      path: '/:pathMatch(.*)',
      component: () => import('@/views/not-found/not-found.vue')
    }
  ],
  scrollBehavior: () => ({ left: 0, top: 0 })
})

router.beforeEach((to) => {
  const token = localCache.getCache(LOGIN_TOKEN)
  if (!token && to.path.startsWith('/main')) {
    return '/login'
  } else if (token && to.path === '/login') {
    return firstMenu.path
  }

  if (to.path === '/main' || to.path === '/main/') {
    return firstMenu.path
  }
})

export default router
