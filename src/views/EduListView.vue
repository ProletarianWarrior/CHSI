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

<style scoped>
.pg2 {
  min-height: 100vh;
  background: var(--bg);
  padding-bottom: 40px;
}
.sat-card {
  margin: 10px 12px 0;
  background: var(--white);
  border-radius: 12px;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.sat-left {
  flex: 1;
  min-width: 0;
}
.sat-header {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}
.sat-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--text);
}
.sat-badge {
  background: var(--red);
  border-radius: 3px;
  padding: 2px 8px;
  margin-left: 8px;
  font-size: 10px;
  color: #fff;
  cursor: pointer;
}
.sat-desc {
  font-size: 11px;
  color: var(--text-gray);
}
.sat-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  flex-shrink: 0;
}
.sat-tag {
  background: var(--primary-bg);
  border-radius: 10px;
  padding: 4px 12px;
  font-size: 11px;
  color: var(--primary);
  cursor: pointer;
}
.edu-block {
  margin: 15px 12px 0;
}
.edu-block-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.edu-block-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--text);
}
.edu-block-badge {
  background: var(--primary);
  color: #fff;
  border-radius: 3px;
  padding: 2px 8px;
  margin-left: 8px;
  font-size: 10px;
}
.edu-block-badge.master {
  background: var(--blue);
}
.info-sect {
  margin: 0;
}
.sect-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.sect-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--text);
}
.sect-count {
  font-size: 13px;
  color: var(--primary);
  margin-left: 6px;
}
.sect-action {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
}
.sect-action-text {
  font-size: 11px;
  color: var(--text-light);
}
.sect-action-link {
  font-size: 11px;
  color: var(--primary);
  cursor: pointer;
}
.info-card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 3px 10px #d0d0d0;
  cursor: pointer;
  transition: transform .15s, box-shadow .15s;
  margin-bottom: 12px;
}
.info-card:active {
  transform: scale(.985);
  box-shadow: 0 1px 6px #c0c0c0;
}
.info-card-top {
  background: linear-gradient(to bottom, #26ae81, #3fc991);
  padding: 14px 16px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.info-card.master-card .info-card-top {
  background: linear-gradient(to bottom, #3d6af5, #5985ff);
}
.info-card-school {
  font-size: 17px;
  font-weight: 700;
  color: #fff;
  flex: 1;
  margin-right: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.info-card-degree {
  background: rgba(0, 0, 0, .25);
  border-radius: 50px;
  padding: 4px 12px;
  font-size: 12px;
  color: #fff;
  flex-shrink: 0;
}
.info-card-bottom {
  background: rgba(38, 174, 129, .88);
  padding: 10px 16px;
  display: flex;
  align-items: center;
}
.master-card .info-card-bottom {
  background: rgba(61, 106, 245, .88);
}
.info-card-major {
  font-size: 13px;
  color: #f0f0f0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.info-card-dv {
  width: 1px;
  height: 14px;
  background: rgba(255, 255, 255, .45);
  margin: 0 12px;
  flex-shrink: 0;
}
.info-card-type {
  font-size: 13px;
  color: #f0f0f0;
  flex-shrink: 0;
}
#ugXjCard {
  background: #26ae81 !important;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(38, 174, 129, .25);
}
#ugXjCard .info-card-top { background: #26ae81 !important; }
#ugXjCard .info-card-bottom { background: #26ae81 !important; }

#ugXlCard {
  background: #56a2f6 !important;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(86, 162, 246, .25);
}
#ugXlCard .info-card-top { background: #56a2f6 !important; }
#ugXlCard .info-card-bottom { background: #56a2f6 !important; }

.empty-card {
  background: var(--white);
  border-radius: 12px;
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.empty-text {
  font-size: 13px;
  color: var(--text-gray);
  text-align: center;
  line-height: 1.8;
}
</style>
