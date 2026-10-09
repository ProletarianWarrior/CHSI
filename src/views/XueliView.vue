<template>
  <div class="page pg_xl">
    <NavBar title="高等学历" back-route="/education" theme="white" />

    <!-- 学历主卡片 -->
    <div class="main-card xl-card">
      <div class="card-top2">
        <div class="photo-box-xl">
          <img v-if="photoSrc" :src="photoSrc" alt="学历照片" />
          <div v-else class="photo-ph2">
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
        </div>

        <div class="name-area2">
          <div class="person-name2">{{ profile.name || '--' }}</div>
          <div class="person-extra2">
            <span class="person-gender2">{{ profile.gender || '--' }}</span>
            <span class="person-birth2">{{ birthDateStr }}</span>
          </div>
        </div>
      </div>

      <div class="school-row2">
        <span class="school-name2">{{ profile.school || '--' }}</span>
        <span class="school-degree2">{{ profile.academic_qualification || '本科' }}</span>
      </div>

      <div class="major-row2">
        <span class="major-name2">{{ profile.major || '--' }}</span>
        <span class="major-dv2"></span>
        <span class="major-type2">{{ profile.xltype || '--' }}</span>
      </div>
    </div>

    <!-- 详细属性列表 -->
    <div class="info-list2">
      <div class="info-row2">
        <span class="info-label2">入学日期</span>
        <span class="info-value2">{{ ruDateStr }}</span>
      </div>
      <div class="info-row2">
        <span class="info-label2">毕（结）业日期</span>
        <span class="info-value2">{{ biYeDateStr }}</span>
      </div>
      <div class="info-row2">
        <span class="info-label2">学历类别</span>
        <span class="info-value2">{{ profile.xllb || '普通高等教育' }}</span>
      </div>
      <div class="info-row2">
        <span class="info-label2">学制</span>
        <span class="info-value2">{{ profile.educational_system ? `${profile.educational_system} 年` : '--' }}</span>
      </div>
      <div class="info-row2">
        <span class="info-label2">毕（结）业</span>
        <span class="info-value2">{{ profile.zhuangtai || '毕业' }}</span>
      </div>
      <div class="info-row2">
        <span class="info-label2">校（院）长姓名</span>
        <span class="info-value2">{{ profile.principal || '--' }}</span>
      </div>
      <div class="info-row2">
        <span class="info-label2">证书编号</span>
        <span class="info-value2">{{ profile.degree_cert || profile.diploma_no || '--' }}</span>
      </div>
    </div>

    <!-- 验证报告按钮 -->
    <div class="btn-wrap2">
      <button class="bottom-btn2" @click="handleOpenReport">查看验证报告</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useProfile } from '../composables/useProfile'
import NavBar from '../components/NavBar.vue'
import { showToast } from '../components/Toast.vue'

const { profile } = useProfile()

const photoSrc = computed(() => {
  return profile.value.image_b || ''
})

const birthDateStr = computed(() => {
  const d = profile.value
  if (d.nian && d.yue && d.ri) {
    return `${d.nian}年${String(d.yue).padStart(2, '0')}月${String(d.ri).padStart(2, '0')}日`
  }
  if (d.id_number && d.id_number.length >= 14) {
    return `${d.id_number.substring(6, 10)}年${d.id_number.substring(10, 12)}月${d.id_number.substring(12, 14)}日`
  }
  return '--'
})

const ruDateStr = computed(() => {
  const d = profile.value
  return (d.ru_nian && d.ru_yue && d.ru_ri)
    ? `${d.ru_nian}年${String(d.ru_yue).padStart(2, '0')}月${String(d.ru_ri).padStart(2, '0')}日`
    : '--'
})

const biYeDateStr = computed(() => {
  const d = profile.value
  return (d.li_nian && d.li_yue && d.li_ri)
    ? `${d.li_nian}年${String(d.li_yue).padStart(2, '0')}月${String(d.li_ri).padStart(2, '0')}日`
    : '--'
})

const handleOpenReport = () => {
  showToast('学历在线验证报告已就绪')
}
</script>

<style lang="scss" scoped src="./XueliView.scss"></style>
