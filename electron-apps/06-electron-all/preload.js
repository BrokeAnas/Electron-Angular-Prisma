// ─────────────────────────────────────────────────────────────
// Preload principal — orchestre les preloads par feature
//
// Chaque fichier dans preloads/ est responsable d'un seul namespace.
// Ce fichier les importe tous : c'est le seul déclaré dans main.js.
//
// Résultat dans le renderer :
//   window.counterService  ← preloads/counter.js
//   window.systemService   ← preloads/system.js
//   window.api             ← preloads/api.js
// ─────────────────────────────────────────────────────────────

require('./preloads/app');
require('./preloads/counter');
require('./preloads/system');
require('./preloads/api');
