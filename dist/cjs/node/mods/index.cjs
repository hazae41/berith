'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var ed25519_dalek_wasm = require('../../wasm/pkg/ed25519_dalek_wasm.cjs');
var ed25519_dalek_wasm_wasm = require('../../wasm/pkg/ed25519_dalek_wasm.wasm.cjs');

var output = undefined;
function initSyncBundledOnce() {
    return output !== null && output !== void 0 ? output : (output = ed25519_dalek_wasm.initSync(Buffer.from(ed25519_dalek_wasm_wasm.wasm, "base64")));
}

exports.Ed25519Keypair = ed25519_dalek_wasm.Ed25519Keypair;
exports.Ed25519PublicKey = ed25519_dalek_wasm.Ed25519PublicKey;
exports.Ed25519Signature = ed25519_dalek_wasm.Ed25519Signature;
exports.initSync = ed25519_dalek_wasm.initSync;
exports.initSyncBundledOnce = initSyncBundledOnce;
//# sourceMappingURL=index.cjs.map
