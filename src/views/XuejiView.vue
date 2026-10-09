<template>
  <div class="page pg3">
    <NavBar title="高等学籍" back-route="/education" theme="white" />

    <!-- 顶部横幅 -->
    <div class="survey-banner">
      <img :src="bannerImg" class="survey-banner-img" alt="满意度调查" @error="handleImgErr" />
    </div>

    <!-- 本科/研究生 Tab 切换 (若填写了研究生信息) -->
    <div v-if="profile.has_grad" class="level-tabs">
      <div
        class="level-tab"
        :class="{ active: currentTab === 'ug' }"
        @click="currentTab = 'ug'"
      >
        本科
      </div>
      <div
        class="level-tab"
        :class="{ active: currentTab === 'grad' }"
        @click="currentTab = 'grad'"
      >
        {{ profile.grad_level || '硕士' }}
      </div>
    </div>

    <!-- 学籍主卡片 -->
    <div class="main-card" :class="{ master: currentTab === 'grad' }">
      <div class="card-top2">
        <div class="photo-row2">
          <!-- 录取照片 -->
          <div class="photo-item2">
            <div class="photo-box2">
              <img v-if="currentPhotoA" :src="currentPhotoA" alt="录取照片" />
              <div v-else class="photo-ph2">
                <svg viewBox="0 0 24 24" fill="#fff">
                  <circle cx="12" cy="8" r="4"/>
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                </svg>
              </div>
            </div>
            <div class="photo-label2">录取照片</div>
          </div>
          <!-- 学历照片 -->
          <div class="photo-item2">
            <div class="photo-box2">
              <img v-if="currentPhotoB" :src="currentPhotoB" alt="学历照片" />
              <div v-else class="photo-ph2">
                <svg viewBox="0 0 24 24" fill="#fff">
                  <circle cx="12" cy="8" r="4"/>
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                </svg>
              </div>
            </div>
            <div class="photo-label2">学历照片</div>
          </div>
        </div>

        <!-- 姓名与生日 -->
        <div class="name-area2">
          <div class="person-name2">{{ profile.name || '--' }}</div>
          <div class="person-extra2">
            <span class="person-gender2">{{ profile.gender || '--' }}</span>
            <span class="person-birth2">{{ birthDateStr }}</span>
          </div>
        </div>
      </div>

      <!-- 学校与层次 -->
      <div class="school-row2">
        <span class="school-name2">{{ currentSchool }}</span>
        <span class="school-degree2">{{ currentDegree }}</span>
      </div>

      <!-- 专业与形式 -->
      <div class="major-row2">
        <span class="major-name2">{{ currentMajor }}</span>
        <span class="major-dv2"></span>
        <span class="major-type2">{{ currentType }}</span>
      </div>

      <!-- 研究生专属扩展标签 -->
      <div v-if="currentTab === 'grad'" class="grad-extra-row">
        <span v-if="profile.grad_degree_type" class="grad-extra-tag">{{ profile.grad_degree_type }}</span>
        <span v-if="profile.grad_enroll_type" class="grad-extra-tag">{{ profile.grad_enroll_type }}</span>
        <span v-if="profile.grad_supervisor" class="grad-extra-tag">导师: {{ profile.grad_supervisor }}</span>
      </div>
    </div>

    <!-- 详细属性列表 -->
    <div class="info-list2">
      <div class="info-row2">
        <span class="info-label2">民族</span>
        <span class="info-value2">{{ profile.nation || '汉族' }}</span>
      </div>
      <div class="info-row2">
        <span class="info-label2">证件号码</span>
        <span class="info-value2">{{ profile.id_number || '--' }}</span>
      </div>
      <div class="info-row2">
        <span class="info-label2">院校</span>
        <span class="info-value2">{{ currentSchool }}</span>
      </div>
      <div class="info-row2">
        <span class="info-label2">层次</span>
        <span class="info-value2">{{ currentDegree }}</span>
      </div>
      <div class="info-row2">
        <span class="info-label2">专业</span>
        <span class="info-value2">{{ currentMajor }}</span>
      </div>
      <div class="info-row2">
        <span class="info-label2">学制</span>
        <span class="info-value2">{{ currentEduSys ? `${currentEduSys} 年` : '--' }}</span>
      </div>
      <div class="info-row2">
        <span class="info-label2">学历类别</span>
        <span class="info-value2">{{ currentTab === 'grad' ? '研究生' : (profile.xllb || '普通高等教育') }}</span>
      </div>
      <div class="info-row2">
        <span class="info-label2">学习形式</span>
        <span class="info-value2">{{ currentType }}</span>
      </div>
      <div class="info-row2">
        <span class="info-label2">院系</span>
        <span class="info-value2">{{ currentFenyuan }}</span>
      </div>
      <div v-if="currentTab === 'ug'" class="info-row2">
        <span class="info-label2">系(所)</span>
        <span class="info-value2">{{ profile.xisuo || '--' }}</span>
      </div>
      <div v-if="currentTab === 'ug'" class="info-row2">
        <span class="info-label2">班级</span>
        <span class="info-value2">{{ profile.banji || '--' }}</span>
      </div>
      <div class="info-row2">
        <span class="info-label2">学号</span>
        <span class="info-value2">{{ currentXuehao }}</span>
      </div>
      <div class="info-row2">
        <span class="info-label2">入学日期</span>
        <span class="info-value2">{{ currentRuDate }}</span>
      </div>
      <div class="info-row2">
        <span class="info-label2">预计毕业日期</span>
        <span class="info-value2">{{ currentLiDate }}</span>
      </div>
      <div class="info-row2">
        <span class="info-label2">学籍状态</span>
        <span class="info-value2">{{ currentStatus }}</span>
      </div>
    </div>

    <!-- 查看报告按钮 -->
    <div class="btn-wrap2">
      <button class="bottom-btn2" @click="handleOpenReport">查看验证报告</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useProfile } from '../composables/useProfile'
import NavBar from '../components/NavBar.vue'
import { showToast } from '../components/Toast.vue'
import bannerImg from '../assets/banner.png'

const { profile } = useProfile()
const currentTab = ref<'ug' | 'grad'>('ug')

const handleImgErr = (e: Event) => {
  const target = e.target as HTMLElement
  target.style.display = 'none'
}

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

const currentPhotoA = computed(() => {
  return currentTab.value === 'grad' ? (profile.value.grad_image_a || profile.value.image_a) : profile.value.image_a
})

const currentPhotoB = computed(() => {
  return currentTab.value === 'grad' ? (profile.value.grad_image_b || profile.value.image_b) : profile.value.image_b
})

const currentSchool = computed(() => {
  return currentTab.value === 'grad' ? (profile.value.grad_school || '--') : (profile.value.school || '--')
})

const currentDegree = computed(() => {
  return currentTab.value === 'grad' ? (profile.value.grad_level || '硕士') : (profile.value.academic_qualification || '本科')
})

const currentMajor = computed(() => {
  return currentTab.value === 'grad' ? (profile.value.grad_major || '--') : (profile.value.major || '--')
})

const currentType = computed(() => {
  return currentTab.value === 'grad' ? (profile.value.grad_train_mode || '全日制') : (profile.value.xltype || '普通全日制')
})

const currentEduSys = computed(() => {
  return currentTab.value === 'grad' ? profile.value.grad_educational_system : profile.value.educational_system
})

const currentFenyuan = computed(() => {
  return currentTab.value === 'grad' ? (profile.value.grad_fenyuan || '--') : (profile.value.fenyuan || '--')
})

const currentXuehao = computed(() => {
  return currentTab.value === 'grad' ? (profile.value.grad_xuehao || '--') : (profile.value.xuehao || '--')
})

const currentRuDate = computed(() => {
  const d = profile.value
  if (currentTab.value === 'grad') {
    return (d.grad_ru_nian && d.grad_ru_yue && d.grad_ru_ri)
      ? `${d.grad_ru_nian}年${String(d.grad_ru_yue).padStart(2, '0')}月${String(d.grad_ru_ri).padStart(2, '0')}日`
      : '--'
  }
  return (d.ru_nian && d.ru_yue && d.ru_ri)
    ? `${d.ru_nian}年${String(d.ru_yue).padStart(2, '0')}月${String(d.ru_ri).padStart(2, '0')}日`
    : '--'
})

const currentLiDate = computed(() => {
  const d = profile.value
  if (currentTab.value === 'grad') {
    return (d.grad_li_nian && d.grad_li_yue && d.grad_li_ri)
      ? `${d.grad_li_nian}年${String(d.grad_li_yue).padStart(2, '0')}月${String(d.grad_li_ri).padStart(2, '0')}日`
      : '--'
  }
  return (d.li_nian && d.li_yue && d.li_ri)
    ? `${d.li_nian}年${String(d.li_yue).padStart(2, '0')}月${String(d.li_ri).padStart(2, '0')}日`
    : '--'
})

const currentStatus = computed(() => {
  return currentTab.value === 'grad' ? (profile.value.grad_zhuangtai || '在籍(注册学籍)') : (profile.value.zhuangtai || '在籍(注册学籍)')
})

const handleOpenReport = () => {
  showToast('学信档案验证报告在线查验完成')
}
</script>

<style lang="scss" scoped src="./XuejiView.scss"></style>
