/* tslint:disable */
/* eslint-disable */
/**
*/
declare class Ed25519Keypair {
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
declare class Ed25519PublicKey {
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
declare class Ed25519Signature {
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
/**
*/
declare class X25519PublicKey {
  free(): void;
/**
* @param {Uint8Array} input
*/
  constructor(input: Uint8Array);
/**
* @param {Uint8Array} input
* @returns {X25519PublicKey}
*/
  static from_bytes(input: Uint8Array): X25519PublicKey;
/**
* @returns {Uint8Array}
*/
  to_bytes(): Uint8Array;
}
/**
*/
declare class X25519SharedSecret {
  free(): void;
/**
* @returns {Uint8Array}
*/
  to_bytes(): Uint8Array;
/**
* @returns {boolean}
*/
  was_contributory(): boolean;
}
/**
*/
declare class X25519StaticSecret {
  free(): void;
/**
*/
  constructor();
/**
* @param {Uint8Array} input
* @returns {X25519StaticSecret}
*/
  static from_bytes(input: Uint8Array): X25519StaticSecret;
/**
* @returns {Uint8Array}
*/
  to_bytes(): Uint8Array;
/**
* @param {X25519PublicKey} other
* @returns {X25519SharedSecret}
*/
  diffie_hellman(other: X25519PublicKey): X25519SharedSecret;
/**
* @returns {X25519PublicKey}
*/
  to_public(): X25519PublicKey;
}

type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_ed25519keypair_free: (a: number) => void;
  readonly ed25519keypair_new: () => number;
  readonly ed25519keypair_from_bytes: (a: number, b: number, c: number) => void;
  readonly ed25519keypair_to_bytes: (a: number, b: number) => void;
  readonly ed25519keypair_public: (a: number) => number;
  readonly ed25519keypair_sign: (a: number, b: number, c: number) => number;
  readonly __wbg_ed25519signature_free: (a: number) => void;
  readonly ed25519signature_new: (a: number, b: number, c: number) => void;
  readonly ed25519signature_from_bytes: (a: number, b: number, c: number) => void;
  readonly ed25519signature_to_bytes: (a: number, b: number) => void;
  readonly __wbg_ed25519publickey_free: (a: number) => void;
  readonly ed25519publickey_new: (a: number, b: number, c: number) => void;
  readonly ed25519publickey_from_bytes: (a: number, b: number, c: number) => void;
  readonly ed25519publickey_to_bytes: (a: number, b: number) => void;
  readonly ed25519publickey_verify: (a: number, b: number, c: number, d: number) => number;
  readonly __wbg_x25519staticsecret_free: (a: number) => void;
  readonly x25519staticsecret_new: () => number;
  readonly x25519staticsecret_from_bytes: (a: number, b: number, c: number) => void;
  readonly x25519staticsecret_to_bytes: (a: number, b: number) => void;
  readonly x25519staticsecret_diffie_hellman: (a: number, b: number) => number;
  readonly x25519staticsecret_to_public: (a: number) => number;
  readonly __wbg_x25519publickey_free: (a: number) => void;
  readonly x25519publickey_new: (a: number, b: number, c: number) => void;
  readonly x25519publickey_from_bytes: (a: number, b: number, c: number) => void;
  readonly x25519publickey_to_bytes: (a: number, b: number) => void;
  readonly __wbg_x25519sharedsecret_free: (a: number) => void;
  readonly x25519sharedsecret_to_bytes: (a: number, b: number) => void;
  readonly x25519sharedsecret_was_contributory: (a: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
}

type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
declare function initSync(module: SyncInitInput): InitOutput;

export { Ed25519Keypair, Ed25519PublicKey, Ed25519Signature, InitInput, InitOutput, SyncInitInput, X25519PublicKey, X25519SharedSecret, X25519StaticSecret, initSync };
