'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var berith = require('../../wasm/pkg/berith.cjs');
var berith_wasm = require('../../wasm/pkg/berith.wasm.cjs');

var output = undefined;
function initSyncBundledOnce() {
    return output !== null && output !== void 0 ? output : (output = berith.initSync(Buffer.from(berith_wasm.wasm, "base64")));
}
function initBundledOnce() {
    return tslib.__awaiter(this, void 0, void 0, function () {
        return tslib.__generator(this, function (_a) {
            return [2 /*return*/, output !== null && output !== void 0 ? output : (output = berith["default"](Buffer.from(berith_wasm.wasm, "base64")))];
        });
    });
}

exports.Ed25519Keypair = berith.Ed25519Keypair;
exports.Ed25519PublicKey = berith.Ed25519PublicKey;
exports.Ed25519Signature = berith.Ed25519Signature;
exports.X25519PublicKey = berith.X25519PublicKey;
exports.X25519SharedSecret = berith.X25519SharedSecret;
exports.X25519StaticSecret = berith.X25519StaticSecret;
exports.initSync = berith.initSync;
exports.initBundledOnce = initBundledOnce;
exports.initSyncBundledOnce = initSyncBundledOnce;
//# sourceMappingURL=index.cjs.map
