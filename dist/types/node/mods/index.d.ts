import { InitOutput } from '../../wasm/pkg/berith.d.js';
export { Ed25519Keypair, Ed25519PublicKey, Ed25519Signature, InitInput, InitOutput, SyncInitInput, initSync } from '../../wasm/pkg/berith.d.js';

declare function initSyncBundledOnce(): InitOutput;

export { initSyncBundledOnce };
