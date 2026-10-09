<template>
  <div v-if="visible" class="pwa-modal-overlay" @click.self="$emit('close')">
    <div class="pwa-modal-card">
      <!-- 头部 -->
      <div class="pwa-modal-header">
        <span class="pwa-modal-title">添加到手机桌面</span>
        <span class="pwa-modal-close" @click="$emit('close')">✕</span>
      </div>

      <!-- 应用信息卡片 -->
      <div class="pwa-app-info">
        <img class="pwa-app-icon" src="/apple-touch-icon.png" alt="App Icon" />
        <div class="pwa-app-meta">
          <div class="pwa-app-name">学信档案</div>
          <div class="pwa-app-badge">原生全屏独立应用</div>
        </div>
      </div>

      <!-- 内容引导区 -->
      <div class="pwa-guide-content">
        <!-- 1. 微信环境检测 -->
        <div v-if="isWeChat" class="guide-box wechat-box">
          <div class="guide-title">⚠️ 当前处于微信内部</div>
          <div class="guide-desc">
            微信不支持直接添加网页到手机主屏幕。<br>
            请点击微信右上角 <b>「···」</b>，选择 <b>「在浏览器中打开」</b>（Safari / 系统默认浏览器），即可添加到手机桌面！
          </div>
        </div>

        <!-- 2. 支持浏览器原生一键安装 (Android Chrome / Edge 等) -->
        <div v-else-if="canInstallDirectly" class="guide-box direct-box">
          <div class="guide-title">✨ 检测到当前浏览器支持一键添加</div>
          <button class="install-btn" @click="handleInstallClick">
            📱 点击一键安装到手机桌面
          </button>
          <div class="guide-tip-note warning-tip">
            ⚠️ <b>若点击后桌面未出现图标：</b><br>
            国产安卓系统（小米/华为/vivo/OPPO等）默认<b>拦截</b>第三方浏览器的「创建桌面快捷方式」权限。<br>
            👉 <b>解决步骤</b>：打开手机【设置 ➔ 应用 ➔ Chrome ➔ 权限管理】开启<b>「桌面快捷方式」</b>；或直接用<b>手机自带浏览器</b>打开添加。
          </div>
        </div>

        <!-- 3. iOS 苹果 Safari 引导 -->
        <div v-else-if="isIOS" class="guide-box ios-box">
          <div class="guide-title">🍎 iPhone / iPad 添加步骤：</div>
          <ol class="guide-steps">
            <li>
              点击 Safari 浏览器底部的 <b>「分享」</b> 按钮（带向上箭头的方框图标 
              <span class="ios-icon">📤</span>）
            </li>
            <li>
              在弹出的菜单中向下滚动，找到并点击 <b>「添加到主屏幕」</b>（Add to Home Screen 
              <span class="ios-icon">➕</span>）
            </li>
            <li>
              点击右上角 <b>「添加」</b>，手机桌面即可出现「学信档案」独立 App！
            </li>
          </ol>
          <div class="guide-tip-note">💡 添加到桌面后点击打开，将自动隐藏浏览器地址栏，呈现纯净全屏原生体验！</div>
        </div>

        <!-- 4. 安卓手机自带浏览器 (华为/小米/vivo/OPPO等) 通用引导 -->
        <div v-else class="guide-box android-box">
          <div class="guide-title">🤖 安卓手机浏览器添加步骤：</div>
          <ol class="guide-steps">
            <li>点击浏览器底部或右上角菜单（<b>「三条杠 ☰」</b> 或 <b>「三个点 ⋮」</b>）</li>
            <li>在菜单或工具箱中找到 <b>「添加至桌面」</b> 或 <b>「添加到主屏幕」</b></li>
            <li>点击确认，即可在手机桌面生成专属 App 图标！</li>
          </ol>
          <div class="guide-tip-note">💡 如有提示请允许“创建桌面快捷方式”权限。</div>
        </div>
      </div>

      <!-- 底部关闭按钮 -->
      <div class="pwa-modal-footer">
        <button class="pwa-done-btn" @click="$emit('close')">我知道了</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { showToast } from './Toast.vue'

defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const deferredPrompt = ref<any>(null)
const canInstallDirectly = ref(false)

// 环境检测
const isWeChat = computed(() => {
  return /MicroMessenger/i.test(navigator.userAgent)
})

const isIOS = computed(() => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
})

onMounted(() => {
  // 监听浏览器 PWA 安装事件
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt.value = e
    canInstallDirectly.value = true
  })
})

const handleInstallClick = async () => {
  if (deferredPrompt.value) {
    deferredPrompt.value.prompt()
    const { outcome } = await deferredPrompt.value.userChoice
    if (outcome === 'accepted') {
      showToast('已申请添加！如桌面无图标请开启手机快捷方式权限')
      emit('close')
    }
    deferredPrompt.value = null
    canInstallDirectly.value = false
  }
}
</script>

<style scoped>
.pwa-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
  animation: pwaFadeIn 0.2s ease-out;
}

@keyframes pwaFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.pwa-modal-card {
  background: #ffffff;
  border-radius: 16px;
  max-width: 380px;
  width: 100%;
  padding: 20px 20px 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  animation: pwaSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes pwaSlideUp {
  from { transform: translateY(20px) scale(0.95); opacity: 0; }
  to { transform: translateY(0) scale(1); opacity: 1; }
}

.pwa-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.pwa-modal-title {
  font-size: 17px;
  font-weight: 700;
  color: #222;
}

.pwa-modal-close {
  font-size: 18px;
  color: #999;
  cursor: pointer;
  padding: 4px;
}

.pwa-app-info {
  display: flex;
  align-items: center;
  gap: 14px;
  background: #f7faf8;
  border: 1px solid #e2eee6;
  border-radius: 12px;
  padding: 12px 14px;
  margin-bottom: 16px;
}

.pwa-app-icon {
  width: 50px;
  height: 50px;
  border-radius: 11px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12);
  object-fit: cover;
}

.pwa-app-meta {
  flex: 1;
}

.pwa-app-name {
  font-size: 16px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 3px;
}

.pwa-app-badge {
  display: inline-block;
  font-size: 11px;
  color: #09b37d;
  background: #e8f5e9;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 500;
}

.guide-box {
  background: #fdfdfd;
  border: 1px solid #ebebeb;
  border-radius: 12px;
  padding: 14px;
  margin-bottom: 16px;
}

.guide-title {
  font-size: 14px;
  font-weight: 700;
  color: #333;
  margin-bottom: 10px;
}

.guide-desc {
  font-size: 13px;
  color: #666;
  line-height: 1.6;
}

.guide-steps {
  margin: 0;
  padding-left: 18px;
  font-size: 13px;
  color: #444;
  line-height: 1.7;
}

.guide-steps li {
  margin-bottom: 6px;
}

.ios-icon {
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
}

.guide-tip-note {
  margin-top: 10px;
  font-size: 11px;
  color: #09b37d;
  background: #f0fdf4;
  padding: 6px 10px;
  border-radius: 6px;
  line-height: 1.4;
}

.guide-tip-note.warning-tip {
  color: #9a3412;
  background: #fff7ed;
  border: 1px solid #ffedd5;
  margin-top: 12px;
  text-align: left;
  line-height: 1.5;
}

.install-btn {
  width: 100%;
  height: 44px;
  background: #09b37d;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(9, 179, 125, 0.3);
  transition: opacity 0.2s;
}

.install-btn:active {
  opacity: 0.85;
}

.wechat-box {
  border-color: #ffe0b2;
  background: #fffbf5;
}

.wechat-box .guide-title {
  color: #e65100;
}

.pwa-modal-footer {
  text-align: center;
}

.pwa-done-btn {
  width: 100%;
  height: 40px;
  background: #f5f5f5;
  color: #444;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.pwa-done-btn:active {
  background: #eee;
}
</style>
