<template>
  <div v-if="visible" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-card">
      <div class="modal-header">
        <span class="modal-title">🎉 在线分享短链接</span>
        <span class="modal-close" @click="$emit('close')">✕</span>
      </div>

      <div class="expire-tip">
        {{ expireText }}
      </div>

      <!-- 核心：唯一极短链接展示区 -->
      <div class="link-section">
        <div class="link-label">
          <span>🔗 在线短链接</span>
          <span class="link-hint">手机微信直接秒开 · 仅只读权限</span>
        </div>
        <div class="link-box">
          <input readonly :value="shortUrl" class="link-input" @click="selectInput" />
          <button class="copy-btn" @click="copyText(shortUrl)">一键复制</button>
        </div>
      </div>

      <!-- 仅作为网络离线极端情况备用，默认折叠隐藏，不干扰用户 -->
      <div v-if="fullUrl && fullUrl !== shortUrl" class="backup-toggle-wrap">
        <span class="backup-toggle-btn" @click="showBackup = !showBackup">
          {{ showBackup ? '▼ 收起离线备用链接' : '▶ 网络故障时查看离线备用长链接' }}
        </span>
        <div v-if="showBackup" class="backup-box">
          <div class="link-label" style="font-size: 11px; color: #999;">离线内嵌长链接 (无需云端存储):</div>
          <div class="link-box">
            <input readonly :value="fullUrl" class="link-input backup-input" @click="selectInput" />
            <button class="copy-btn gray-btn" @click="copyText(fullUrl)">复制</button>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button class="done-btn" @click="$emit('close')">完成</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { showToast } from './Toast.vue'

const props = defineProps<{
  visible: boolean
  shortUrl: string
  fullUrl?: string
  validDays?: number
  expireTime?: number
}>()

defineEmits<{
  (e: 'close'): void
}>()

const showBackup = ref(false)

const expireText = computed(() => {
  if (props.expireTime && props.expireTime > 0) {
    const d = new Date(props.expireTime)
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    const h = String(d.getHours()).padStart(2, '0')
    const min = String(d.getMinutes()).padStart(2, '0')
    return `⏱️ 有效期：${props.validDays || 30} 天（至 ${y}-${m}-${day} ${h}:${min} 失效）`
  }
  return '⏱️ 有效期：永久有效'
})

const selectInput = (e: MouseEvent) => {
  const target = e.target as HTMLInputElement
  target.select()
}

const copyText = async (text: string) => {
  if (!text) return
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text)
    } else {
      const textarea = document.createElement('textarea')
      textarea.value = text
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
    showToast('极短分享链接已复制到剪贴板！')
  } catch (err) {
    showToast('复制失败，请手动选择复制')
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.55);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}
.modal-card {
  background: #fff;
  border-radius: 14px;
  width: 100%;
  max-width: 380px;
  padding: 20px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.modal-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--text);
}
.modal-close {
  cursor: pointer;
  font-size: 18px;
  color: #999;
  padding: 4px;
}
.expire-tip {
  background: #f6ffed;
  border: 1px solid #b7eb8f;
  color: #389e0d;
  font-size: 12px;
  padding: 8px 10px;
  border-radius: 6px;
  margin-bottom: 14px;
}
.link-section {
  margin-bottom: 14px;
}
.link-label {
  font-size: 12px;
  color: #666;
  margin-bottom: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.link-hint {
  font-size: 11px;
  color: var(--primary);
  font-weight: 500;
}
.link-box {
  display: flex;
  gap: 8px;
}
.link-input {
  flex: 1;
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 12px;
  background: #fafafa;
  color: #333;
  outline: none;
}
.copy-btn {
  background: var(--primary);
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0 14px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
}
.copy-btn:active {
  opacity: 0.85;
}
.backup-toggle-wrap {
  margin-top: 10px;
  margin-bottom: 6px;
}
.backup-toggle-btn {
  font-size: 11px;
  color: #999;
  cursor: pointer;
  display: inline-block;
  user-select: none;
  transition: color .2s;
}
.backup-toggle-btn:hover {
  color: #666;
  text-decoration: underline;
}
.backup-box {
  margin-top: 8px;
  padding: 8px;
  background: #f9f9f9;
  border-radius: 6px;
  border: 1px dashed #ddd;
}
.backup-input {
  background: #fff;
  color: #888;
  font-size: 11px;
}
.gray-btn {
  background: #888;
}
.modal-footer {
  margin-top: 18px;
  text-align: center;
}
.done-btn {
  width: 100%;
  height: 40px;
  background: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}
.done-btn:active {
  background: #eee;
}
</style>
