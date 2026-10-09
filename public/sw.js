// 极简 Service Worker 支持 PWA 全屏应用安装检测与离线体验
const CACHE_NAME = 'chsi-pwa-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // 对应用资源优先网络，降级缓存，保证最新更新即时拉取
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
