'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var berith = require('../../wasm/pkg/berith.cjs');
var berith_wasm = require('../../wasm/pkg/berith.wasm.cjs');

var output = undefined;
function initSyncBundledOnce() {
    return output !== null && output !== void 0 ? output : (output = berith.initSync(Buffer.from(berith_wasm.wasm, "base64")));
}

exports.Ed25519Keypair = berith.Ed25519Keypair;
exports.Ed25519PublicKey = berith.Ed25519PublicKey;
exports.Ed25519Signature = berith.Ed25519Signature;
exports.initSync = berith.initSync;
exports.initSyncBundledOnce = initSyncBundledOnce;
//# sourceMappingURL=index.cjs.map
