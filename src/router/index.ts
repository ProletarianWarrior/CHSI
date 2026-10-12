import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import { useProfile } from '../composables/useProfile'
import { useAuth } from '../composables/useAuth'

import HomeView from '../views/HomeView.vue'
import EduListView from '../views/EduListView.vue'
import XuejiView from '../views/XuejiView.vue'
import XueliView from '../views/XueliView.vue'
import EditorView from '../views/EditorView.vue'
import ExpiredView from '../views/ExpiredView.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/education', name: 'Education', component: EduListView },
  { path: '/xueji', name: 'Xueji', component: XuejiView },
  { path: '/xueli', name: 'Xueli', component: XueliView },
  { path: '/edit', name: 'Editor', component: EditorView },
  { path: '/expired', name: 'Expired', component: ExpiredView },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.beforeEach(async (to, _from, next) => {
  const { initProfile, isExpired, isShareMode } = useProfile()
  const { isAdmin, checkUrlToken } = useAuth()

  // 尝试从 URL 携带的 token 参数免密认证
  checkUrlToken()

  await initProfile()

  if (isExpired.value && to.name !== 'Expired') {
    return next({ name: 'Expired' })
  }

  // 访客分享模式下，绝对禁止访问编辑页面
  if (isShareMode.value && to.name === 'Editor') {
    return next({ name: 'Education' })
  }

  // 非管理员禁止访问编辑页面，彻底防止任何人通过手动修改 URL 穿帮
  if (to.name === 'Editor' && !isAdmin.value) {
    return next({ name: 'Home' })
  }

  next()
})

export default router
