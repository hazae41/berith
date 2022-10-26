'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('./mods/index.cjs');
var berith = require('../wasm/pkg/berith.cjs');



exports.Berith = index;
exports.initBundledOnce = index.initBundledOnce;
exports.initSyncBundledOnce = index.initSyncBundledOnce;
exports.Ed25519Keypair = berith.Ed25519Keypair;
exports.Ed25519PublicKey = berith.Ed25519PublicKey;
exports.Ed25519Signature = berith.Ed25519Signature;
exports.X25519PublicKey = berith.X25519PublicKey;
exports.X25519SharedSecret = berith.X25519SharedSecret;
exports.X25519StaticSecret = berith.X25519StaticSecret;
exports.initSync = berith.initSync;
//# sourceMappingURL=index.cjs.map
