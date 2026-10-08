<template>
  <div class="app-root">
    <router-view />
    <Toast />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useProfile } from './composables/useProfile'
import Toast from './components/Toast.vue'

const { initProfile } = useProfile()

onMounted(async () => {
  await initProfile()
})
</script>

<style>
.app-root {
  max-width: 450px;
  margin: 0 auto;
  position: relative;
  min-height: 100vh;
  background: var(--bg);
}
</style>
