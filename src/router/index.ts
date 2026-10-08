import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import { useProfile } from '../composables/useProfile'

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
  await initProfile()

  if (isExpired.value && to.name !== 'Expired') {
    return next({ name: 'Expired' })
  }

  // 访客分享模式下，绝对禁止访问编辑页面
  if (isShareMode.value && to.name === 'Editor') {
    return next({ name: 'Education' })
  }

  next()
})

export default router
