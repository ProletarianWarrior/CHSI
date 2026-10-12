<template>
  <div v-if="visible" class="auth-modal-overlay" @click.self="$emit('close')">
    <div class="auth-modal-card">
      <div class="auth-modal-header">
        <span class="auth-modal-title">🔐 管理员身份验证</span>
        <span class="auth-modal-close" @click="$emit('close')">✕</span>
      </div>

      <!-- 未认证状态：输入口令表单 -->
      <div v-if="!isAdmin" class="auth-body">
        <div class="auth-tip">
          请输入管理员口令以解锁档案信息编辑与在线分享功能。
        </div>
        <div class="auth-input-wrap">
          <input
            ref="inputRef"
            v-model="inputPassword"
            type="password"
            class="auth-input"
            :class="{ 'error-shake': hasError }"
            placeholder="请输入管理员口令"
            autocomplete="current-password"
            @keyup.enter="handleConfirm"
          />
        </div>
        <div v-if="hasError" class="auth-error-msg">
          ⚠️ 口令错误，请核对后重试
        </div>
        <div class="auth-actions">
          <button class="auth-btn cancel-btn" @click="$emit('close')">取消</button>
          <button class="auth-btn submit-btn" @click="handleConfirm">确认解锁</button>
        </div>
      </div>

      <!-- 已认证状态：提示与退出管理权限选项 -->
      <div v-else class="auth-body">
        <div class="auth-success-badge">
          <span class="badge-icon">✅</span>
          <strong>当前已处于管理员模式</strong>
        </div>
        <div class="auth-desc">
          已启用档案编辑与在线分享权限，本机永久免密。如需测试普通访客视角，可点击下方退出。
        </div>
        <div class="auth-actions">
          <button class="auth-btn logout-btn" @click="handleLogout">退出管理员模式</button>
          <button class="auth-btn submit-btn" @click="$emit('close')">完成</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { useAuth } from '../composables/useAuth'
import { showToast } from './Toast.vue'

const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const { isAdmin, verifyToken, logoutAdmin } = useAuth()

const inputPassword = ref('')
const hasError = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)

watch(() => props.visible, (val) => {
  if (val) {
    inputPassword.value = ''
    hasError.value = false
    nextTick(() => {
      inputRef.value?.focus()
    })
  }
})

const handleConfirm = () => {
  if (!inputPassword.value.trim()) {
    hasError.value = true
    return
  }
  const success = verifyToken(inputPassword.value)
  if (success) {
    hasError.value = false
    showToast('管理员身份解锁成功！已自动保存，本机永久免密')
    emit('close')
  } else {
    hasError.value = true
    showToast('口令错误，请重试')
  }
}

const handleLogout = () => {
  logoutAdmin()
  showToast('已退出管理员模式，已恢复普通访客视图')
  emit('close')
}
</script>

<style scoped lang="scss">
.auth-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 16px;
  animation: fadeIn 0.2s ease;
}

.auth-modal-card {
  background: #fff;
  border-radius: 12px;
  width: 100%;
  max-width: 340px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
  overflow: hidden;
  animation: scaleUp 0.2s ease;
}

.auth-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  border-bottom: 1px solid #f0f0f0;

  .auth-modal-title {
    font-size: 16px;
    font-weight: 600;
    color: #1a1a1a;
  }

  .auth-modal-close {
    font-size: 16px;
    color: #999;
    cursor: pointer;
    padding: 4px;
    line-height: 1;

    &:hover {
      color: #333;
    }
  }
}

.auth-body {
  padding: 18px 16px 16px;
}

.auth-tip {
  font-size: 13px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 14px;
}

.auth-input-wrap {
  margin-bottom: 8px;

  .auth-input {
    width: 100%;
    height: 42px;
    padding: 0 12px;
    font-size: 15px;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    box-sizing: border-box;
    outline: none;
    transition: all 0.2s;

    &:focus {
      border-color: #09b37d;
      box-shadow: 0 0 0 2px rgba(9, 179, 125, 0.15);
    }

    &.error-shake {
      border-color: #ff4d4f;
      animation: shake 0.3s ease;
    }
  }
}

.auth-error-msg {
  font-size: 12px;
  color: #ff4d4f;
  margin-bottom: 12px;
}

.auth-success-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #09b37d;
  margin-bottom: 8px;

  .badge-icon {
    font-size: 16px;
  }
}

.auth-desc {
  font-size: 12px;
  color: #777;
  line-height: 1.5;
  margin-bottom: 16px;
}

.auth-actions {
  display: flex;
  gap: 10px;
  margin-top: 14px;

  .auth-btn {
    flex: 1;
    height: 38px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    border: none;
    transition: all 0.2s;

    &.submit-btn {
      background: #09b37d;
      color: #fff;

      &:active {
        background: #079668;
      }
    }

    &.cancel-btn {
      background: #f5f5f5;
      color: #666;

      &:active {
        background: #e8e8e8;
      }
    }

    &.logout-btn {
      background: #fff1f0;
      color: #ff4d4f;
      border: 1px solid #ffccc7;

      &:active {
        background: #ffccc7;
      }
    }
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleUp {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}
</style>
