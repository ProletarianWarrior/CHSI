<template>
  <div class="tabbar">
    <div
      v-for="(item, idx) in tabs"
      :key="idx"
      class="tabbar-item"
      :class="{ active: activeIndex === idx }"
      @click="handleClick(idx, item)"
    >
      <div class="tabbar-icon">{{ item.icon }}</div>
      <div class="tabbar-label">{{ item.label }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'change', index: number, label: string): void
}>()

const activeIndex = ref(0)

const tabs = [
  { icon: '🏠', label: '首页' },
  { icon: '🎓', label: '学籍学历学位' },
  { icon: '📊', label: '个人测评' },
  { icon: '💼', label: '求职招聘' },
  { icon: '👤', label: '我的' }
]

const handleClick = (idx: number, item: typeof tabs[0]) => {
  activeIndex.value = idx
  emit('change', idx, item.label)
}
</script>

<style scoped>
.tabbar {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 450px;
  height: 54px;
  background: var(--white);
  display: flex;
  align-items: center;
  border-top: 1px solid #eee;
  z-index: 100;
  padding-bottom: env(safe-area-inset-bottom);
}
.tabbar-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  cursor: pointer;
  color: var(--gray);
  transition: color .2s;
  padding: 6px 0;
}
.tabbar-item.active {
  color: var(--primary);
}
.tabbar-icon {
  font-size: 20px;
  line-height: 1;
}
.tabbar-label {
  font-size: 10px;
  line-height: 1;
}
</style>
