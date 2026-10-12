import { ref, computed } from 'vue'

const ADMIN_TOKEN_KEY = 'chsi_admin_token'

/**
 * 预设管理员口令 (可根据需要在此处直接修改)
 */
export const DEFAULT_ADMIN_TOKEN = 'chsi888'

// 全局响应式状态，初始化读取 localStorage
const currentToken = ref<string>(localStorage.getItem(ADMIN_TOKEN_KEY) || '')

export function useAuth() {
  /**
   * 是否已通过管理员口令认证
   */
  const isAdmin = computed(() => {
    return currentToken.value === DEFAULT_ADMIN_TOKEN
  })

  /**
   * 校验并保存管理员口令
   */
  const verifyToken = (inputToken: string): boolean => {
    const trimmed = (inputToken || '').trim()
    if (trimmed === DEFAULT_ADMIN_TOKEN) {
      localStorage.setItem(ADMIN_TOKEN_KEY, trimmed)
      currentToken.value = trimmed
      return true
    }
    return false
  }

  /**
   * 退出管理员身份 (清空口令，恢复纯净访客视图)
   */
  const logoutAdmin = (): void => {
    localStorage.removeItem(ADMIN_TOKEN_KEY)
    currentToken.value = ''
  }

  /**
   * 检查 URL 是否携带 token 参数，支持直通免密认证
   * 例如: https://chsi-admin.pages.dev/?token=chsi888
   */
  const checkUrlToken = (): boolean => {
    try {
      const search = window.location.search
      const hash = window.location.hash
      const params = new URLSearchParams(search)

      let tokenParam = params.get('token')
      if (!tokenParam && hash.includes('?')) {
        const hashParams = new URLSearchParams(hash.substring(hash.indexOf('?')))
        tokenParam = hashParams.get('token')
      }

      if (tokenParam && tokenParam.trim() === DEFAULT_ADMIN_TOKEN) {
        verifyToken(tokenParam)
        return true
      }
    } catch (e) {
      console.warn('checkUrlToken error:', e)
    }
    return false
  }

  return {
    isAdmin,
    verifyToken,
    logoutAdmin,
    checkUrlToken,
    DEFAULT_ADMIN_TOKEN
  }
}
