<template>
  <div class="page pg2">
    <NavBar title="高等教育信息" back-route="/" theme="white" />

    <!-- 1. 院校满意度卡片 (原版 1:1) -->
    <div class="sat-card">
      <div class="sat-left">
        <div class="sat-header">
          <span class="sat-title">院校满意度</span>
          <span class="sat-badge" @click="showToast('投票功能')">投票</span>
        </div>
        <span class="sat-desc">本校的生活条件、环境及综合情况</span>
      </div>
      <div class="sat-right">
        <span class="sat-tag" @click="showToast('综合情况')">综合情况</span>
        <span class="sat-tag" @click="showToast('生活条件')">生活条件</span>
        <span class="sat-tag" @click="showToast('校园环境')">校园环境</span>
      </div>
    </div>

    <!-- 2. 本科教育区块 (原版 1:1) -->
    <div class="edu-block" id="undergradBlock">
      <div class="edu-block-header">
        <span class="edu-block-title" id="ugBlockTitle">{{ profile.academic_qualification || '本科' }}教育</span>
      </div>

      <!-- 学籍信息 -->
      <div class="info-sect">
        <div class="sect-header">
          <span class="sect-title">学籍信息</span>
          <span class="sect-count">(1)</span>
          <div class="sect-action">
            <span class="sect-action-text">还有学籍没有显示出来?</span>
            <span class="sect-action-link" @click="showToast('尝试绑定学籍')">尝试绑定</span>
          </div>
        </div>
        <div class="info-card" id="ugXjCard" @click="goToXueji">
          <div class="info-card-top">
            <span class="info-card-school">{{ profile.school || '--' }}</span>
            <span class="info-card-degree">{{ profile.academic_qualification || '本科' }}</span>
          </div>
          <div class="info-card-bottom">
            <span class="info-card-major">{{ profile.major || '--' }}</span>
            <span class="info-card-dv"></span>
            <span class="info-card-type">{{ profile.xltype || '--' }}</span>
          </div>
        </div>
      </div>

      <!-- 学历信息 -->
      <div class="info-sect">
        <div class="sect-header">
          <span class="sect-title">学历信息</span>
          <span class="sect-count">(1)</span>
          <div class="sect-action">
            <span class="sect-action-text">还有学历没有显示出来?</span>
            <span class="sect-action-link" @click="showToast('尝试绑定学历')">尝试绑定</span>
          </div>
        </div>
        <div class="info-card" id="ugXlCard" @click="goToXueli">
          <div class="info-card-top">
            <span class="info-card-school">{{ profile.school || '--' }}</span>
            <span class="info-card-degree">{{ profile.academic_qualification || '本科' }}</span>
          </div>
          <div class="info-card-bottom">
            <span class="info-card-major">{{ profile.major || '--' }}</span>
            <span class="info-card-dv"></span>
            <span class="info-card-type">{{ profile.xllb || '--' }}</span>
          </div>
        </div>
      </div>

      <!-- 学位信息 -->
      <div class="info-sect">
        <div class="sect-header">
          <span class="sect-title">学位信息</span>
          <span class="sect-count">(0)</span>
        </div>
        <div class="empty-card" id="ugXwEmpty">
          <span class="empty-text">暂无学位信息</span>
        </div>
      </div>
    </div>

    <!-- 3. 研究生教育区块 (若填写了研究生数据) -->
    <div v-if="profile.has_grad" class="edu-block" id="gradBlock">
      <div class="edu-block-header">
        <span class="edu-block-title" id="gradBlockTitle">研究生教育</span>
        <span class="edu-block-badge" id="gradBlockBadge">{{ profile.grad_level || '硕士' }}</span>
      </div>

      <!-- 研究生学籍信息 -->
      <div class="info-sect">
        <div class="sect-header">
          <span class="sect-title">学籍信息</span>
          <span class="sect-count">(1)</span>
        </div>
        <div class="info-card master-card" id="gradXjCard" @click="goToXueji">
          <div class="info-card-top">
            <span class="info-card-school">{{ profile.grad_school || '--' }}</span>
            <span class="info-card-degree">{{ profile.grad_level || '硕士' }}</span>
          </div>
          <div class="info-card-bottom">
            <span class="info-card-major">{{ profile.grad_major || '--' }}</span>
            <span class="info-card-dv"></span>
            <span class="info-card-type">{{ profile.grad_train_mode || '全日制' }}</span>
          </div>
        </div>
      </div>

      <!-- 研究生学历信息 -->
      <div class="info-sect">
        <div class="sect-header">
          <span class="sect-title">学历信息</span>
          <span class="sect-count">(1)</span>
        </div>
        <div class="info-card master-card" id="gradXlCard" @click="goToXueji">
          <div class="info-card-top">
            <span class="info-card-school">{{ profile.grad_school || '--' }}</span>
            <span class="info-card-degree">{{ profile.grad_level || '硕士' }}</span>
          </div>
          <div class="info-card-bottom">
            <span class="info-card-major">{{ profile.grad_major || '--' }}</span>
            <span class="info-card-dv"></span>
            <span class="info-card-type">{{ profile.grad_train_mode || '全日制' }}</span>
          </div>
        </div>
      </div>

      <!-- 研究生学位信息 -->
      <div class="info-sect">
        <div class="sect-header">
          <span class="sect-title">学位信息</span>
          <span class="sect-count">(0)</span>
        </div>
        <div class="empty-card" id="gXwEmpty">
          <span class="empty-text">暂无学位信息</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useProfile } from '../composables/useProfile'
import NavBar from '../components/NavBar.vue'
import { showToast } from '../components/Toast.vue'

const router = useRouter()
const { profile } = useProfile()

const goToXueji = () => {
  router.push('/xueji')
}

const goToXueli = () => {
  router.push('/xueli')
}
</script>

<style lang="scss" scoped src="./EduListView.scss"></style>
