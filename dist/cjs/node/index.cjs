'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('./mods/index.cjs');
var berith = require('../wasm/pkg/berith.cjs');



exports.initSyncBundledOnce = index.initSyncBundledOnce;
exports.Ed25519Keypair = berith.Ed25519Keypair;
exports.Ed25519PublicKey = berith.Ed25519PublicKey;
exports.Ed25519Signature = berith.Ed25519Signature;
exports.initSync = berith.initSync;
//# sourceMappingURL=index.cjs.map
