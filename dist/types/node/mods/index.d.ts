import { InitOutput } from '../../wasm/pkg/berith.d.js';
export { Ed25519Keypair, Ed25519PublicKey, Ed25519Signature, InitInput, InitOutput, SyncInitInput, X25519PublicKey, X25519SharedSecret, X25519StaticSecret, initSync } from '../../wasm/pkg/berith.d.js';

declare function initSyncBundledOnce(): InitOutput;

export { initSyncBundledOnce };
