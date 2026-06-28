const CACHE='tuico-da-cenoura-v4';
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
self.addEventListener('fetch',event=>{const url=new URL(event.request.url);if(event.request.mode==='navigate'||url.pathname.endsWith('/')||url.pathname.endsWith('/index.html')){event.respondWith(fetch(event.request).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put('index.html',copy));return response}).catch(()=>caches.match(event.request).then(cached=>cached||caches.match('index.html'))));return}event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request))) });
