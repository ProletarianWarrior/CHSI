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

<style scoped>
.pg_xl {
  background: var(--white);
  min-height: 100vh;
  padding-bottom: 30px;
}
.xl-card {
  width: calc(100% - 32px);
  max-width: 420px;
  margin: 12px auto 8px;
  background: #56a2f6 !important;
  border-radius: 10px;
  padding-bottom: 18px;
  box-shadow: 0 4px 14px rgba(86, 162, 246, .35) !important;
}
.card-top2 {
  display: flex;
  align-items: flex-start;
  padding: 20px 16px 0;
}
.photo-box-xl {
  width: 68px;
  height: 88px;
  background: rgba(255, 255, 255, .3);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
}
.photo-box-xl img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}
.photo-ph2 {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: rgba(255, 255, 255, .25);
}
.photo-ph2 svg {
  width: 26px;
  height: 26px;
  opacity: .7;
}
.name-area2 {
  flex: 1;
  margin-left: 16px;
}
.person-name2 {
  font-size: 17px;
  font-weight: 700;
  color: #f7f7f7;
}
.person-extra2 {
  display: flex;
  align-items: center;
  margin-top: 10px;
  gap: 8px;
}
.person-gender2 {
  font-size: 13px;
  color: #f7f7f7;
}
.person-birth2 {
  font-size: 13px;
  color: #f7f7f7;
}
.school-row2 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 22px 0;
}
.school-name2 {
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  flex: 1;
  margin-right: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.school-degree2 {
  background: rgba(0, 0, 0, .3);
  border-radius: 50px;
  padding: 5px 14px;
  font-size: 11px;
  color: #f7f7f7;
  flex-shrink: 0;
  white-space: nowrap;
}
.major-row2 {
  display: flex;
  align-items: center;
  padding: 10px 22px 0;
}
.major-name2 {
  font-size: 11px;
  color: #f7f7f7;
}
.major-dv2 {
  width: 1px;
  height: 13px;
  background: #f7f7f7;
  margin: 0 15px;
}
.major-type2 {
  font-size: 11px;
  color: #f7f7f7;
}
.info-list2 {
  background: var(--white);
  padding: 0 16px;
}
.info-row2 {
  display: flex;
  align-items: center;
  min-height: 35px;
  padding: 4px 0;
}
.info-row2:first-child {
  margin-top: 28px;
}
.info-label2 {
  width: 140px;
  font-size: 14px;
  color: #838383;
  text-align: right;
  flex-shrink: 0;
}
.info-value2 {
  font-size: 14px;
  color: #000;
  margin-left: 15px;
  flex: 1;
  word-break: break-all;
}
.btn-wrap2 {
  margin: 30px 16px 10px;
  display: flex;
  justify-content: center;
}
.bottom-btn2 {
  width: calc(100% - 32px);
  max-width: 420px;
  height: 45px;
  background: var(--primary-dark);
  border: none;
  border-radius: 5px;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
}
</style>
