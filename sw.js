// Firebase Service Worker for Push Notifications
// Файлыг GitHub-д /machida/sw.js гэж байршуулна

importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCln4ixKz1a3wB0hECtjrSZv3t-lqUgDy8",
  authDomain: "new-machida.firebaseapp.com",
  projectId: "new-machida",
  storageBucket: "new-machida.firebasestorage.app",
  messagingSenderId: "502598048863",
  appId: "1:502598048863:web:e406b8e1fb377d2b98cfea"
});

const messaging = firebase.messaging();

// Background notification handler
messaging.onBackgroundMessage(function(payload) {
  console.log('Background message:', payload);
  const n = payload.notification || {};
  const title = n.title || '📅 Ажлын Хуваарь';
  const body = n.body || 'Шинэ мессеж ирлээ';
  
  self.registration.showNotification(title, {
    body: body,
    icon: '/machida/icon-192.png',
    badge: '/machida/icon-72.png',
    data: payload.data || {},
    actions: [
      {action: 'open', title: 'Нээх'},
      {action: 'close', title: 'Хаах'}
    ]
  });
});

// Notification click handler
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  if(event.action === 'open' || !event.action) {
    event.waitUntil(
      clients.openWindow('https://tugsuue-lgtm.github.io/machida/')
    );
  }
});
