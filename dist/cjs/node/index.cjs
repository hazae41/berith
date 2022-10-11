'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('./mods/index.cjs');
var ed25519_dalek_wasm = require('../wasm/pkg/ed25519_dalek_wasm.cjs');



exports.initSyncBundledOnce = index.initSyncBundledOnce;
exports.Ed25519Keypair = ed25519_dalek_wasm.Ed25519Keypair;
exports.Ed25519PublicKey = ed25519_dalek_wasm.Ed25519PublicKey;
exports.Ed25519Signature = ed25519_dalek_wasm.Ed25519Signature;
exports.initSync = ed25519_dalek_wasm.initSync;
//# sourceMappingURL=index.cjs.map
