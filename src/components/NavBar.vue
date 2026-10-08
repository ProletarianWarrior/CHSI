<template>
  <nav class="nb" :class="{ 'theme-green': theme === 'green', 'theme-white': theme === 'white' }">
    <div class="nb-spacer" :style="{ background: theme === 'green' ? 'var(--primary)' : 'var(--white)' }"></div>
    <div class="nb-main">
      <div v-if="showBack" class="nb-back" @click="handleBack">
        <svg viewBox="0 0 24 24" fill="none" :stroke="theme === 'green' ? '#fff' : '#333'" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </div>
      <div v-else-if="$slots.left" class="nb-left">
        <slot name="left"></slot>
      </div>

      <span class="nb-title" :style="{ color: theme === 'green' ? '#fff' : '#000' }">
        {{ title }}
      </span>

      <div class="nb-menu" @click="$emit('menu-click')">
        <slot name="right">
          <div class="nb-menu-fb">
            <span :style="{ background: theme === 'green' ? '#fff' : '#333' }"></span>
            <span :style="{ background: theme === 'green' ? '#fff' : '#333' }"></span>
            <span :style="{ background: theme === 'green' ? '#fff' : '#333' }"></span>
          </div>
        </slot>
      </div>
    </div>
  </nav>
  <div class="nb-ph"></div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const props = withDefaults(defineProps<{
  title: string
  showBack?: boolean
  backRoute?: string
  theme?: 'green' | 'white'
}>(), {
  showBack: true,
  theme: 'white'
})

const emit = defineEmits<{
  (e: 'back'): void
  (e: 'menu-click'): void
}>()

const router = useRouter()

const handleBack = () => {
  emit('back')
  if (props.backRoute) {
    router.push(props.backRoute)
  } else {
    router.back()
  }
}
</script>

<style scoped>
.nb {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 99;
  width: 100%;
  max-width: 450px;
}
.theme-green {
  background: var(--primary);
}
.theme-white {
  background: var(--white);
}
.nb-spacer {
  height: 20px;
}
.nb-main {
  height: 45px;
  display: flex;
  align-items: center;
  position: relative;
  padding: 0 12px;
}
.nb-back {
  width: 32px;
  height: 32px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.nb-back svg {
  width: 20px;
  height: 20px;
}
.nb-left {
  display: flex;
  align-items: center;
  gap: 8px;
}
.nb-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  font-weight: 700;
  white-space: nowrap;
}
.nb-menu {
  margin-left: auto;
  width: 26px;
  height: 26px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.nb-menu-fb {
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: flex-end;
}
.nb-menu-fb span {
  display: block;
  height: 2px;
  border-radius: 1px;
}
.nb-menu-fb span:nth-child(1) { width: 18px; }
.nb-menu-fb span:nth-child(2) { width: 14px; }
.nb-menu-fb span:nth-child(3) { width: 18px; }
.nb-ph {
  height: 65px;
}
</style>
