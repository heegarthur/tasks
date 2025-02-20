self.addEventListener('install', event => {
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('sync', event => {
    if (event.tag === 'continueTimer') {
        event.waitUntil(updateTimerInBackground());
    }
});

async function updateTimerInBackground() {
    const allClients = await self.clients.matchAll();
    allClients.forEach(client => client.postMessage({ action: "updateTimer" }));
}
