const CACHE_NAME = 'dorrobor_ver3';
const urlsToCache = [
  '/',
  '/index.html',
  '/test3_4_ana_666.html',
  '/manifest.json',
  '/service-worker.js',
  '/icon-192.png',
  '/icon-512.png',
  // 画像やJavaScriptファイルなど、アプリを構成するすべての静的ファイルをここに追加
  '/22.gif', // test3_4_ana_555.htmlで使われる画像
  '/33.svg', // test3_4_ana_555.htmlで使われる画像
  '/circuit_data.js', // 設定ツールで使われるファイル
  // その他のCSSやJSファイルなど
];

// インストールイベント: キャッシュにファイルを保存
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// フェッチイベント: キャッシュからリソースを返す
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // キャッシュにリソースがあればそれを返す
        if (response) {
          return response;
        }
        // なければネットワークから取得する
        return fetch(event.request);
      })
  );
});

// アクティベートイベント: 古いキャッシュを削除
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});