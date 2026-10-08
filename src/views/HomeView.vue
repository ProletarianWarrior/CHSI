<template>
  <div class="page pg1">
    <!-- 顶部导航 -->
    <NavBar title="学信档案" :show-back="false" theme="green">
      <template #left>
        <svg class="nb-icon" viewBox="0 0 1024 1024" fill="#fff" width="28" height="28">
          <path d="M819.2 143.018667L753.493333 102.4l-81.92 49.152L573.013333 102.4 491.52 151.552 409.941333 102.4l-81.92 49.152L246.613333 102.4 204.8 133.973333V785.066667l41.813333 30.72 81.92-49.152L409.941333 819.2l81.578667-49.152L573.013333 819.2l81.578667-51.2L736.426667 819.2l81.578666-49.152L819.2 785.066667z"/>
          <path d="M368.64 409.6h286.72v40.96H368.64zM368.64 512h286.72v40.96H368.64zM368.64 614.4h163.84v40.96H368.64z" fill="#09b37d"/>
        </svg>
      </template>
    </NavBar>

    <!-- 顶部合作意识测试卡片 (原版1:1) -->
    <div class="rec-card" @click="showToast('功能开发中,敬请期待')">
      <div class="rec-icon-wrap">
        <svg width="24" height="24" viewBox="0 0 1024 1024" fill="#fff">
          <path d="M819.2 143.018667L753.493333 102.4l-81.92 49.152L573.013333 102.4 491.52 151.552 409.941333 102.4l-81.92 49.152L246.613333 102.4 204.8 133.973333V785.066667l41.813333 30.72 81.92-49.152L409.941333 819.2l81.578667-49.152L573.013333 819.2l81.578667-51.2L736.426667 819.2l81.578666-49.152L819.2 785.066667z"/>
          <path d="M368.64 409.6h286.72v40.96H368.64zM368.64 512h286.72v40.96H368.64zM368.64 614.4h163.84v40.96H368.64z" fill="#09b37d"/>
        </svg>
      </div>
      <div class="rec-info">
        <div class="rec-title">合作意识测试</div>
      </div>
      <button class="rec-btn">去测评</button>
    </div>

    <!-- 管理员操作栏 (分享链接打开时强制彻底隐藏，无修改权限) -->
    <div v-if="!isShareMode" id="editBar" class="share-bar">
      <button class="rec-btn blue" @click="goToEdit">📝 填写/编辑信息</button>
      <button class="rec-btn outline" @click="openShare">🔗 生成分享链接</button>
    </div>

    <!-- 原版 1:1 九宫格网格 -->
    <div class="grid-sect">
      <div class="grid-container">
        <!-- 1. 高等教育信息 -->
        <div class="grid-item edu-link" @click="goToEdu">
          <div class="grid-icon g1">🎓</div>
          <span class="grid-label">高等教育信息</span>
        </div>
        <!-- 2. 在线验证报告 -->
        <div class="grid-item" @click="showToast('功能开发中,敬请期待')">
          <div class="grid-icon g1">🛡️</div>
          <span class="grid-label">在线验证报告</span>
        </div>
        <!-- 3. 学历学位认证与成绩验证 -->
        <div class="grid-item" @click="showToast('功能开发中,敬请期待')">
          <div class="grid-icon g2">📄</div>
          <span class="grid-label">学历学位认证与成绩验证</span>
        </div>
        <!-- 4. 出国(境)报告发送 -->
        <div class="grid-item" @click="showToast('功能开发中,敬请期待')">
          <div class="grid-icon g3">🌐</div>
          <span class="grid-label">出国(境)报告发送</span>
        </div>
        <!-- 5. 毕业证书图像校对 -->
        <div class="grid-item" @click="showToast('功能开发中,敬请期待')">
          <div class="grid-icon g4">👤</div>
          <span class="grid-label">毕业证书图像校对</span>
        </div>
        <!-- 6. 就业 -->
        <div class="grid-item" @click="showToast('功能开发中,敬请期待')">
          <div class="grid-icon g5">Offer</div>
          <span class="grid-label">就业</span>
        </div>
        <!-- 7. 学校满意度 -->
        <div class="grid-item" @click="showToast('功能开发中,敬请期待')">
          <div class="grid-icon g6">😊</div>
          <span class="grid-label">学校满意度</span>
        </div>
        <!-- 8. 个人测评 -->
        <div class="grid-item" @click="showToast('功能开发中,敬请期待')">
          <div class="grid-icon g7">📋</div>
          <span class="grid-label">个人测评</span>
        </div>
        <!-- 9. "双千"计划"微专业" -->
        <div class="grid-item" @click="showToast('功能开发中,敬请期待')">
          <div class="grid-icon g8">双千</div>
          <span class="grid-label">"双千"计划"微专业"</span>
        </div>
      </div>
    </div>

    <!-- 底部 TabBar -->
    <TabBar @change="handleTabChange" />

    <!-- 分享弹窗 -->
    <ShareModal
      :visible="shareModalVisible"
      :short-url="shareShortUrl"
      :full-url="shareFullUrl"
      :valid-days="profile.valid_days"
      :expire-time="profile.expire_time"
      @close="shareModalVisible = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProfile } from '../composables/useProfile'
import { buildShareLinks } from '../utils/codec'
import { saveProfileToServer, getWorkerBaseUrl } from '../utils/api'
import NavBar from '../components/NavBar.vue'
import TabBar from '../components/TabBar.vue'
import ShareModal from '../components/ShareModal.vue'
import { showToast } from '../components/Toast.vue'

const router = useRouter()
const { profile, isShareMode } = useProfile()

const shareModalVisible = ref(false)
const shareShortUrl = ref('')
const shareFullUrl = ref('')

const goToEdu = () => {
  router.push('/education')
}

const goToEdit = () => {
  router.push('/edit')
}

const handleTabChange = (_idx: number, label: string) => {
  if (label !== '首页') {
    showToast(`切换到:${label}`)
  }
}

const openShare = async () => {
  showToast('正在生成极短分享链接...')
  const { workerShortUrl, onlineFullUrl } = buildShareLinks(profile.value)
  shareFullUrl.value = onlineFullUrl
  shareShortUrl.value = workerShortUrl

  try {
    const remoteId = await saveProfileToServer(profile.value)
    shareShortUrl.value = `${getWorkerBaseUrl()}/s/${remoteId}`
  } catch (e) {
    console.warn('Worker 保存异常，使用本地短码:', e)
  }

  shareModalVisible.value = true
}
</script>

<style scoped>
.pg1 {
  min-height: 100vh;
  padding-bottom: 70px;
}
.rec-card {
  margin: 12px 12px;
  background: var(--white);
  border-radius: 12px;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}
.rec-icon-wrap {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.rec-info {
  flex: 1;
  min-width: 0;
}
.rec-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
}
.rec-btn {
  flex-shrink: 0;
  padding: 6px 18px;
  background: var(--primary);
  color: #fff;
  border: none;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
}
.rec-btn:active {
  opacity: .8;
}
.rec-btn.outline {
  background: transparent;
  color: var(--primary);
  border: 1.5px solid var(--primary);
}
.rec-btn.blue {
  background: var(--blue);
}
.share-bar {
  margin: 0 12px 8px;
  display: flex;
  gap: 8px;
}
.share-bar .rec-btn {
  flex: 1;
  text-align: center;
  padding: 8px 0;
  border-radius: 8px;
  font-size: 13px;
}
.grid-sect {
  margin: 0 12px;
  background: var(--white);
  border-radius: 12px;
  overflow: hidden;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 18px 8px;
  height: 115px;
  cursor: pointer;
  transition: background .2s;
  position: relative;
}
.grid-item::after {
  content: '';
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background: #eee;
  transform: scaleY(.5);
}
.grid-item::before {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  width: 1px;
  height: 100%;
  background: #eee;
  transform: scaleX(.5);
}
.grid-item:nth-child(3n)::before {
  display: none;
}
.grid-item:active {
  background: #f9f9f9;
}
.grid-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-bottom: 8px;
  color: #fff;
  font-weight: 700;
}
.grid-icon.g1 { background: #09b37d; }
.grid-icon.g2 { background: #4ecdc4; }
.grid-icon.g3 { background: #5c9be6; }
.grid-icon.g4 { background: #26ae81; }
.grid-icon.g5 { background: #5985ff; border-radius: 6px; font-size: 13px; }
.grid-icon.g6 { background: #f7c044; }
.grid-icon.g7 { background: #5985ff; }
.grid-icon.g8 { background: #09b37d; border-radius: 8px; font-size: 12px; }
.grid-label {
  font-size: 12px;
  color: var(--text);
  text-align: center;
  line-height: 1.4;
  max-width: 100px;
}
.grid-item.edu-link .grid-label {
  color: var(--primary);
  font-weight: 500;
}
</style>
