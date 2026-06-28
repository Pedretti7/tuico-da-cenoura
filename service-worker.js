const CACHE='tuico-da-cenoura-v3';
const ASSETS=[
  "index.html",
  "manifest.webmanifest",
  "skins/natural.webp.b64",
  "skins/agente.webp.b64",
  "skins/armadura.webp.b64",
  "skins/chef.webp.b64",
  "skins/maromba.webp.b64",
  "skins/advogado.webp.b64",
  "skins/snowboard.webp.b64",
  "skins/praia.webp.b64",
  "skins/astronauta.webp.b64",
  "skins/comandante.webp.b64"
];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request))) });
