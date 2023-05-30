import type { App } from 'vue'
import { createPinia } from 'pinia'
import useLoginStore from './login/login'

const pinia = createPinia()

function registerStore(app: App) {
  // 注册 pinia
  app.use(pinia)

  // 加载本地数据 (防止页面刷新数据丢失)
  const loginStore = useLoginStore()
  loginStore.loadLocalCacheAction()
}

export default registerStore
