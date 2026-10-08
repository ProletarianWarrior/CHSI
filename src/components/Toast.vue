<template>
  <div class="toast" :class="{ show: toastState.visible }">
    {{ toastState.message }}
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'

const toastState = ref({
  visible: false,
  message: ''
})

let timer: any = null

export function showToast(msg: string, duration = 2000) {
  toastState.value.message = msg
  toastState.value.visible = true
  clearTimeout(timer)
  timer = setTimeout(() => {
    toastState.value.visible = false
  }, duration)
}

export default {
  setup() {
    return { toastState }
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(.8);
  background: rgba(17, 17, 17, .85);
  color: #fff;
  padding: 10px 24px;
  border-radius: 6px;
  font-size: 14px;
  z-index: 99999;
  pointer-events: none;
  opacity: 0;
  transition: all .25s;
  text-align: center;
  max-width: 80%;
  line-height: 1.5;
}
.toast.show {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}
</style>
