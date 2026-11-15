// L'ancien site jfbteam-ma-mission.fr installait une application (service worker).
// Ce fichier la désinstalle proprement sur les téléphones qui l'avaient, pour qu'ils voient le nouveau site.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => caches.delete(k)));
    await self.registration.unregister();
    const clients = await self.clients.matchAll({ type: 'window' });
    clients.forEach((c) => c.navigate(c.url));
  })());
});
