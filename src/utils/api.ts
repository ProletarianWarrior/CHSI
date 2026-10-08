import { encodeData, decodeData } from './codec'
import type { StudentProfile } from '../types/profile'

export function getWorkerBaseUrl(): string {
  if (typeof window !== 'undefined') {
    const host = window.location.hostname
    if (host.includes('pages.dev') || (!host.includes('localhost') && !host.includes('127.0.0.1') && !host.startsWith('192.') && !host.startsWith('10.'))) {
      return window.location.origin
    }
  }
  return 'https://chsi-admin.pages.dev'
}

export const WORKER_URL = getWorkerBaseUrl()

const LOCAL_STORAGE_KEY = 'edu_local_store'

export function saveLocalStore(id: string, data: StudentProfile) {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY)
    const store = raw ? JSON.parse(raw) : {}
    store[id] = data
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(store))
  } catch (e) {
    console.error('saveLocalStore error:', e)
  }
}

export function loadLocalStore(id: string): StudentProfile | null {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!raw) return null
    const store = JSON.parse(raw)
    return store[id] || null
  } catch (e) {
    return null
  }
}

export async function saveProfileToServer(data: StudentProfile): Promise<string> {
  const compressed = encodeData(data)
  const payload = { compressed }
  const baseUrl = getWorkerBaseUrl()

  const res = await fetch(`${baseUrl}/api/save`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })

  if (!res.ok) {
    throw new Error(`Worker HTTP error: ${res.status}`)
  }

  const result = await res.json()
  if (!result.id) {
    throw new Error('无效响应，未返回 ID')
  }

  // 同时也存一份在本地
  saveLocalStore(result.id, data)
  return result.id
}

export async function fetchProfileFromServer(id: string): Promise<StudentProfile | null> {
  // 先尝试本地
  const local = loadLocalStore(id)
  if (local && local.name) return local

  // 请求 Cloudflare Worker
  try {
    const res = await fetch(`${WORKER_URL}/api/get/${id}`)
    if (!res.ok) return null
    const text = await res.text()
    let data: StudentProfile | null = null

    try {
      data = JSON.parse(text)
    } catch {
      data = decodeData(text)
    }

    if (data && data.name) {
      saveLocalStore(id, data)
      return data
    }
  } catch (e) {
    console.warn('Worker 拉取失败:', e)
  }

  return null
}
