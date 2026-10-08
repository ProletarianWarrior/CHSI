import LZString from 'lz-string'
import type { StudentProfile } from '../types/profile'

export const DEFAULT_ONLINE_BASE = 'https://chsi-admin.pages.dev'
export const WORKER_BASE = 'https://chsi-admin.pages.dev'

export function encodeData(obj: any): string {
  const json = JSON.stringify(obj)
  try {
    const compressed = LZString.compressToEncodedURIComponent(json)
    if (compressed) return compressed
  } catch (e) {
    console.error('LZString compress error:', e)
  }
  // Fallback: URL safe base64
  const encoded = btoa(unescape(encodeURIComponent(json)))
  return encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export function decodeData(str: string): any {
  if (!str) return null
  try {
    const result = LZString.decompressFromEncodedURIComponent(str)
    if (result && (result[0] === '{' || result[0] === '[')) {
      return JSON.parse(result)
    }
  } catch (e) {
    // try fallback
  }

  // Fallback: base64
  try {
    let s = str.replace(/-/g, '+').replace(/_/g, '/')
    while (s.length % 4) s += '='
    const json = decodeURIComponent(escape(atob(s)))
    const parsed = JSON.parse(json)
    if (parsed && typeof parsed === 'object') {
      return parsed
    }
    return null
  } catch (e) {
    return null
  }
}

export function genShortId(len = 6): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let id = ''
  for (let i = 0; i < len; i++) {
    id += chars[Math.floor(Math.random() * chars.length)]
  }
  return id
}

export function getPublicBaseUrl(): string {
  const host = window.location.hostname
  // 如果是本地开发环境 (localhost / 127.0.0.1)，使用公网线上地址，确保手机微信能打开
  if (host === 'localhost' || host === '127.0.0.1' || host === '') {
    return DEFAULT_ONLINE_BASE
  }
  // 如果已部署到公网服务器，使用当前域名
  return window.location.origin + window.location.pathname
}

export function buildShareLinks(profile: StudentProfile, customId?: string) {
  const id = customId || genShortId(8)
  const encoded = encodeData(profile)
  let base = getPublicBaseUrl()
  if (!base.endsWith('/')) base += '/'

  return {
    id,
    // 线上极短分享短链接 (约 48 字符，公网直连，兼容所有手机浏览器与微信)
    onlineShortUrl: `${base}?q=${id}`,
    // Worker 重定向短链接
    workerShortUrl: `${WORKER_BASE}/s/${id}`,
    // 离线内嵌备用长链接 (仅在网络故障时备用)
    onlineFullUrl: `${base}?q=${id}.${encoded}`
  }
}

export function parseDataFromUrl(): { id?: string; data?: StudentProfile; isFromShare?: boolean } | null {
  const search = window.location.search
  const hash = window.location.hash
  const params = new URLSearchParams(search)

  // 检查是否是从分享链接进入
  let isFromShare = params.has('q') || params.has('d') || params.has('s')

  let q = params.get('q')
  if (!q && hash.includes('?')) {
    const hashParams = new URLSearchParams(hash.substring(hash.indexOf('?')))
    q = hashParams.get('q')
    if (q) isFromShare = true
  }

  if (q && q.length >= 4) {
    const dotIdx = q.indexOf('.')
    if (dotIdx > 0) {
      const id = q.substring(0, dotIdx)
      const dataPart = q.substring(dotIdx + 1)
      const data = decodeData(dataPart)
      if (data) return { id, data, isFromShare }
      return { id, isFromShare }
    } else {
      const data = decodeData(q)
      if (data) return { data, isFromShare }
      return { id: q, isFromShare }
    }
  }

  // 兼容 ?d=
  let d = params.get('d')
  if (!d && hash.includes('?')) {
    const hashParams = new URLSearchParams(hash.substring(hash.indexOf('?')))
    d = hashParams.get('d')
    if (d) isFromShare = true
  }
  if (d && d.length > 4) {
    const data = decodeData(d)
    if (data) return { data, isFromShare }
  }

  return isFromShare ? { isFromShare } : null
}
