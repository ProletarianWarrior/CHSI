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

<style lang="scss" scoped src="./ExpiredView.scss"></style>
