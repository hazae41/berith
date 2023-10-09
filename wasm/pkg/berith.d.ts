
import type { Box, Copiable, Copied } from "@hazae41/box"

/* tslint:disable */
/* eslint-disable */
/**
*/
export class Ed25519Signature {

  get freed(): boolean

  [Symbol.dispose](): void

  free(): void;
/**
* @param {Uint8Array} bytes
*/
  constructor(bytes: Box<Copiable>);
/**
* @param {Uint8Array} bytes
* @returns {Ed25519Signature}
*/
  static from_bytes(bytes: Box<Copiable>): Ed25519Signature;
/**
* @returns {Slice}
*/
  to_bytes(): Slice;
}
/**
*/
export class Ed25519SigningKey {

  get freed(): boolean

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
* @param {Uint8Array} bytes
* @returns {Ed25519SigningKey}
*/
  static from_bytes(bytes: Box<Copiable>): Ed25519SigningKey;
/**
* @returns {Slice}
*/
  to_bytes(): Slice;
/**
* @returns {Ed25519VerifyingKey}
*/
  public(): Ed25519VerifyingKey;
/**
* @param {Uint8Array} bytes
* @returns {Ed25519Signature}
*/
  sign(bytes: Box<Copiable>): Ed25519Signature;
}
/**
*/
export class Ed25519VerifyingKey {

  get freed(): boolean

  [Symbol.dispose](): void

  free(): void;
/**
* @param {Uint8Array} bytes
*/
  constructor(bytes: Box<Copiable>);
/**
* @param {Uint8Array} bytes
* @returns {Ed25519VerifyingKey}
*/
  static from_bytes(bytes: Box<Copiable>): Ed25519VerifyingKey;
/**
* @returns {Slice}
*/
  to_bytes(): Slice;
/**
* @param {Uint8Array} bytes
* @param {Ed25519Signature} signature
* @returns {boolean}
*/
  verify(bytes: Box<Copiable>, signature: Ed25519Signature): boolean;
}
/**
*/
export class X25519PublicKey {

  get freed(): boolean

  [Symbol.dispose](): void

  free(): void;
/**
* @param {Uint8Array} bytes
*/
  constructor(bytes: Box<Copiable>);
/**
* @param {Uint8Array} bytes
* @returns {X25519PublicKey}
*/
  static from_bytes(bytes: Box<Copiable>): X25519PublicKey;
/**
* @returns {Slice}
*/
  to_bytes(): Slice;
}
/**
*/
export class X25519SharedSecret {

  get freed(): boolean

  [Symbol.dispose](): void

  free(): void;
/**
* @returns {Slice}
*/
  to_bytes(): Slice;
/**
* @returns {boolean}
*/
  was_contributory(): boolean;
}
/**
*/
export class X25519StaticSecret {

  get freed(): boolean

  [Symbol.dispose](): void

  free(): void;
/**
*/
  constructor();
/**
* @param {Uint8Array} bytes
* @returns {X25519StaticSecret}
*/
  static from_bytes(bytes: Box<Copiable>): X25519StaticSecret;
/**
* @returns {Slice}
*/
  to_bytes(): Slice;
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
  readonly x25519staticsecret_from_bytes: (a: number, b: number, c: number) => void;
  readonly x25519staticsecret_diffie_hellman: (a: number, b: number) => number;
  readonly x25519staticsecret_to_public: (a: number) => number;
  readonly ed25519verifyingkey_from_bytes: (a: number, b: number, c: number) => void;
  readonly ed25519verifyingkey_to_bytes: (a: number, b: number) => void;
  readonly ed25519verifyingkey_verify: (a: number, b: number, c: number, d: number) => number;
  readonly x25519publickey_from_bytes: (a: number, b: number, c: number) => void;
  readonly x25519publickey_to_bytes: (a: number, b: number) => void;
  readonly x25519sharedsecret_was_contributory: (a: number) => number;
  readonly __wbg_ed25519signature_free: (a: number) => void;
  readonly ed25519signature_from_bytes: (a: number, b: number, c: number) => void;
  readonly ed25519signature_to_bytes: (a: number, b: number) => void;
  readonly ed25519signingkey_new: () => number;
  readonly ed25519signingkey_from_bytes: (a: number, b: number, c: number) => void;
  readonly ed25519signingkey_to_bytes: (a: number, b: number) => void;
  readonly ed25519signingkey_public: (a: number) => number;
  readonly ed25519signingkey_sign: (a: number, b: number, c: number) => number;
  readonly ed25519verifyingkey_new: (a: number, b: number, c: number) => void;
  readonly x25519publickey_new: (a: number, b: number, c: number) => void;
  readonly ed25519signature_new: (a: number, b: number, c: number) => void;
  readonly ed25519signingkey_random: () => number;
  readonly x25519staticsecret_to_bytes: (a: number, b: number) => void;
  readonly x25519sharedsecret_to_bytes: (a: number, b: number) => void;
  readonly __wbg_x25519staticsecret_free: (a: number) => void;
  readonly __wbg_x25519publickey_free: (a: number) => void;
  readonly __wbg_x25519sharedsecret_free: (a: number) => void;
  readonly __wbg_ed25519verifyingkey_free: (a: number) => void;
  readonly __wbg_ed25519signingkey_free: (a: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
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


export class Slice {

  readonly ptr: number

  readonly len: number

  constructor(ptr: number, len: number);

  /**
   * Free the bytes
   **/
  [Symbol.dispose](): void

  /**
   * Get the bytes in memory
   **/
  get bytes(): Uint8Array

  /**
   * Is the memory freed?
   **/
  get freed(): boolean

  /**
   * Free the bytes (do nothing if already freed)
   **/
  free(): void

  /**
   * Copy the bytes and free them
   **/
  copyAndDispose(): Copied

}