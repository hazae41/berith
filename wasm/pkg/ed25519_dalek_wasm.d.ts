/* tslint:disable */
/* eslint-disable */
/**
*/
export class Ed25519Keypair {
  free(): void;
/**
*/
  constructor();
/**
* @param {Uint8Array} input
* @returns {Ed25519Keypair}
*/
  static from_bytes(input: Uint8Array): Ed25519Keypair;
/**
* @returns {Uint8Array}
*/
  to_bytes(): Uint8Array;
/**
* @returns {Ed25519PublicKey}
*/
  public(): Ed25519PublicKey;
/**
* @param {Uint8Array} input
* @returns {Ed25519Signature}
*/
  sign(input: Uint8Array): Ed25519Signature;
}
/**
*/
export class Ed25519PublicKey {
  free(): void;
/**
* @param {Uint8Array} input
*/
  constructor(input: Uint8Array);
/**
* @param {Uint8Array} input
* @returns {Ed25519PublicKey}
*/
  static from_bytes(input: Uint8Array): Ed25519PublicKey;
/**
* @returns {Uint8Array}
*/
  to_bytes(): Uint8Array;
/**
* @param {Uint8Array} input
* @param {Ed25519Signature} signature
* @returns {boolean}
*/
  verify(input: Uint8Array, signature: Ed25519Signature): boolean;
}
/**
*/
export class Ed25519Signature {
  free(): void;
/**
* @param {Uint8Array} input
*/
  constructor(input: Uint8Array);
/**
* @param {Uint8Array} input
* @returns {Ed25519Signature}
*/
  static from_bytes(input: Uint8Array): Ed25519Signature;
/**
* @returns {Uint8Array}
*/
  to_bytes(): Uint8Array;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_ed25519keypair_free: (a: number) => void;
  readonly ed25519keypair_new: () => number;
  readonly ed25519keypair_from_bytes: (a: number, b: number, c: number) => void;
  readonly ed25519keypair_to_bytes: (a: number, b: number) => void;
  readonly ed25519keypair_public: (a: number) => number;
  readonly ed25519keypair_sign: (a: number, b: number, c: number) => number;
  readonly __wbg_ed25519signature_free: (a: number) => void;
  readonly ed25519signature_from_bytes: (a: number, b: number, c: number) => void;
  readonly ed25519signature_to_bytes: (a: number, b: number) => void;
  readonly __wbg_ed25519publickey_free: (a: number) => void;
  readonly ed25519publickey_from_bytes: (a: number, b: number, c: number) => void;
  readonly ed25519publickey_to_bytes: (a: number, b: number) => void;
  readonly ed25519publickey_verify: (a: number, b: number, c: number, d: number) => number;
  readonly ed25519signature_new: (a: number, b: number, c: number) => void;
  readonly ed25519publickey_new: (a: number, b: number, c: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
