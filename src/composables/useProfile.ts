import { ref, computed } from 'vue'
import { createDefaultProfile, type StudentProfile } from '../types/profile'
import { parseDataFromUrl } from '../utils/codec'
import { fetchProfileFromServer } from '../utils/api'

const DRAFT_KEY = 'chsi_draft'
const SHARE_SESSION_KEY = 'chsi_share_visitor'

// 单例全局状态
const profile = ref<StudentProfile>(createDefaultProfile())
const isLoaded = ref(false)
const isLoading = ref(false)
const isShareMode = ref(false) // 是否为访客分享模式 (无修改权限)

export function useProfile() {
  const isExpired = computed(() => {
    return profile.value.expire_time > 0 && Date.now() > profile.value.expire_time
  })

  const hasData = computed(() => {
    return !!(profile.value.name && profile.value.school)
  })

  async function initProfile(): Promise<void> {
    if (isLoaded.value) return
    isLoading.value = true

    try {
      const urlInfo = parseDataFromUrl()

      // 只要链接携带分享标记，或当前会话已被标记为访客，彻底锁定只读模式
      if (urlInfo?.isFromShare || sessionStorage.getItem(SHARE_SESSION_KEY) === '1') {
        isShareMode.value = true
        sessionStorage.setItem(SHARE_SESSION_KEY, '1')
      }

      if (urlInfo?.data) {
        profile.value = { ...createDefaultProfile(), ...urlInfo.data }
        isLoaded.value = true
        return
      }

      if (urlInfo?.id) {
        const remoteData = await fetchProfileFromServer(urlInfo.id)
        if (remoteData) {
          profile.value = { ...createDefaultProfile(), ...remoteData }
          isLoaded.value = true
          return
        }
      }

      // 仅在非分享模式下尝试加载本机草稿
      if (!isShareMode.value) {
        const draft = localStorage.getItem(DRAFT_KEY)
        if (draft) {
          try {
            const parsed = JSON.parse(draft)
            if (parsed && parsed.name) {
              profile.value = { ...createDefaultProfile(), ...parsed }
              isLoaded.value = true
              return
            }
          } catch {}
        }
      }

      // 默认空数据
      profile.value = createDefaultProfile()
    } finally {
      isLoaded.value = true
      isLoading.value = false
    }
  }

  function setProfile(data: StudentProfile) {
    if (isShareMode.value) {
      console.warn('访客模式无权修改信息')
      return
    }
    profile.value = { ...data }
    saveDraft(data)
  }

  function saveDraft(data: StudentProfile) {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(data))
    } catch (e) {
      console.warn('saveDraft error:', e)
    }
  }

  return {
    profile,
    isLoaded,
    isLoading,
    isExpired,
    hasData,
    isShareMode,
    initProfile,
    setProfile,
    saveDraft
  }
}
