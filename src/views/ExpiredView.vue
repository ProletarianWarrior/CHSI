<template>
  <div class="page expired-page">
    <NavBar title="学信档案" :show-back="false" theme="green" />

    <div class="expired-card">
      <div class="expired-icon">⏱️</div>
      <div class="expired-title">该分享链接已失效</div>
      <div class="expired-desc">
        此学信档案分享链接已超过发起人设定的有效期，数据查验已关闭。<br /><br />
        如需继续查看档案，请联系分享人重新生成有效链接。
      </div>
      <button class="expired-btn" @click="goHome">返回首页</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import NavBar from '../components/NavBar.vue'

const router = useRouter()
const goHome = () => {
  router.push('/')
}
</script>

<style scoped>
.expired-page {
  min-height: 100vh;
  background: var(--bg);
  display: flex;
  flex-direction: column;
}
.expired-card {
  margin: 40px 16px;
  background: #fff;
  border-radius: 14px;
  padding: 36px 20px 30px;
  text-align: center;
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
}
.expired-icon {
  font-size: 48px;
  margin-bottom: 16px;
}
.expired-title {
  font-size: 19px;
  font-weight: 700;
  color: #1f1f1f;
  margin-bottom: 12px;
}
.expired-desc {
  font-size: 13px;
  color: #8c8c8c;
  line-height: 1.7;
  max-width: 300px;
  margin: 0 auto 30px;
}
.expired-btn {
  width: 100%;
  max-width: 240px;
  height: 42px;
  background: var(--primary);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}
.expired-btn:active {
  opacity: .85;
}
</style>
