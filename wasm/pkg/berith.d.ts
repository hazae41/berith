/* tslint:disable */
/* eslint-disable */
/**
*/
export class Ed25519Signature {
  [Symbol.dispose](): void
  free(): void;
/**
* @param {Memory} bytes
*/
  constructor(bytes: Memory);
/**
* @param {Memory} bytes
* @returns {Ed25519Signature}
*/
  static from_bytes(bytes: Memory): Ed25519Signature;
/**
* @returns {Memory}
*/
  to_bytes(): Memory;
}
/**
*/
export class Ed25519SigningKey {
  [Symbol.dispose](): void
  free(): void;
/**
*/
  constructor();
/**
* @returns {Ed25519SigningKey}
*/
  static random(): Ed25519SigningKey;
/**
* @param {Memory} bytes
* @returns {Ed25519SigningKey}
*/
  static from_bytes(bytes: Memory): Ed25519SigningKey;
/**
* @returns {Memory}
*/
  to_bytes(): Memory;
/**
* @returns {Ed25519VerifyingKey}
*/
  public(): Ed25519VerifyingKey;
/**
* @param {Memory} bytes
* @returns {Ed25519Signature}
*/
  sign(bytes: Memory): Ed25519Signature;
}
/**
*/
export class Ed25519VerifyingKey {
  [Symbol.dispose](): void
  free(): void;
/**
* @param {Memory} bytes
*/
  constructor(bytes: Memory);
/**
* @param {Memory} bytes
* @returns {Ed25519VerifyingKey}
*/
  static from_bytes(bytes: Memory): Ed25519VerifyingKey;
/**
* @returns {Memory}
*/
  to_bytes(): Memory;
/**
* @param {Memory} bytes
* @param {Ed25519Signature} signature
* @returns {boolean}
*/
  verify(bytes: Memory, signature: Ed25519Signature): boolean;
}
/**
*/
export class Memory {
  [Symbol.dispose](): void
  free(): void;
/**
* @param {Uint8Array} inner
*/
  constructor(inner: Uint8Array);
/**
* @returns {number}
*/
  ptr(): number;
/**
* @returns {number}
*/
  len(): number;

  /**
   * Free on next tick
   **/
  freeNextTick(): Memory

  /**
   * Get the bytes in memory
   **/
  get bytes(): Uint8Array

  /**
   * Copy the bytes and free them
   **/
  copyAndDispose(): Uint8Array
}
/**
*/
export class X25519PublicKey {
  [Symbol.dispose](): void
  free(): void;
/**
* @param {Memory} bytes
*/
  constructor(bytes: Memory);
/**
* @param {Memory} bytes
* @returns {X25519PublicKey}
*/
  static from_bytes(bytes: Memory): X25519PublicKey;
/**
* @returns {Memory}
*/
  to_bytes(): Memory;
}
/**
*/
export class X25519SharedSecret {
  [Symbol.dispose](): void
  free(): void;
/**
* @returns {Memory}
*/
  to_bytes(): Memory;
/**
* @returns {boolean}
*/
  was_contributory(): boolean;
}
/**
*/
export class X25519StaticSecret {
  [Symbol.dispose](): void
  free(): void;
/**
*/
  constructor();
/**
* @param {Memory} bytes
* @returns {X25519StaticSecret}
*/
  static from_bytes(bytes: Memory): X25519StaticSecret;
/**
* @returns {Memory}
*/
  to_bytes(): Memory;
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

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly x25519staticsecret_random: () => number;
  readonly x25519staticsecret_from_bytes: (a: number, b: number) => void;
  readonly x25519staticsecret_to_bytes: (a: number) => number;
  readonly x25519staticsecret_diffie_hellman: (a: number, b: number) => number;
  readonly x25519staticsecret_to_public: (a: number) => number;
  readonly ed25519signingkey_new: () => number;
  readonly ed25519signingkey_from_bytes: (a: number, b: number) => void;
  readonly ed25519signingkey_to_bytes: (a: number) => number;
  readonly ed25519signingkey_public: (a: number) => number;
  readonly ed25519signingkey_sign: (a: number, b: number) => number;
  readonly ed25519verifyingkey_from_bytes: (a: number, b: number) => void;
  readonly ed25519verifyingkey_to_bytes: (a: number) => number;
  readonly ed25519verifyingkey_verify: (a: number, b: number, c: number) => number;
  readonly x25519publickey_from_bytes: (a: number, b: number) => void;
  readonly __wbg_memory_free: (a: number) => void;
  readonly memory_new: (a: number, b: number) => number;
  readonly memory_ptr: (a: number) => number;
  readonly memory_len: (a: number) => number;
  readonly x25519sharedsecret_was_contributory: (a: number) => number;
  readonly __wbg_ed25519signature_free: (a: number) => void;
  readonly ed25519signature_from_bytes: (a: number, b: number) => void;
  readonly ed25519signature_to_bytes: (a: number) => number;
  readonly ed25519signingkey_random: () => number;
  readonly ed25519verifyingkey_new: (a: number, b: number) => void;
  readonly x25519publickey_new: (a: number, b: number) => void;
  readonly ed25519signature_new: (a: number, b: number) => void;
  readonly x25519publickey_to_bytes: (a: number) => number;
  readonly x25519sharedsecret_to_bytes: (a: number) => number;
  readonly __wbg_x25519staticsecret_free: (a: number) => void;
  readonly __wbg_ed25519verifyingkey_free: (a: number) => void;
  readonly __wbg_x25519publickey_free: (a: number) => void;
  readonly __wbg_x25519sharedsecret_free: (a: number) => void;
  readonly __wbg_ed25519signingkey_free: (a: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
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
export function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
