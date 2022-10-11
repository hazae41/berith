import { initSync } from '../../wasm/pkg/ed25519_dalek_wasm.mjs';
export { Ed25519Keypair, Ed25519PublicKey, Ed25519Signature, initSync } from '../../wasm/pkg/ed25519_dalek_wasm.mjs';
import { wasm } from '../../wasm/pkg/ed25519_dalek_wasm.wasm.mjs';

var output = undefined;
function initSyncBundledOnce() {
    return output !== null && output !== void 0 ? output : (output = initSync(Buffer.from(wasm, "base64")));
}

export { initSyncBundledOnce };
//# sourceMappingURL=index.mjs.map
