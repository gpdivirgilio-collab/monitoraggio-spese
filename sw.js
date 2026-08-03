const CACHE = "monitoraggio-spese-v12";
const RISORSE = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "icon.svg",
  "lib/xlsx.full.min.js",
  "lib/pdf.min.js",
  "lib/pdf.worker.min.js"
];

self.addEventListener("install", e => {
  // ogni risorsa a sé: se una non risponde l'installazione non fallisce
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.all(RISORSE.map(r => c.add(r).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(chiavi => Promise.all(chiavi.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// rete prima per l'app (così gli aggiornamenti arrivano), cache come riserva offline
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request)
      .then(risposta => {
        const copia = risposta.clone();
        caches.open(CACHE).then(c => c.put(e.request, copia)).catch(() => {});
        return risposta;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
