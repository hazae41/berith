export {
  Ed25519Keypair,
  Ed25519PublicKey,
  Ed25519Signature
} from "../wasm/pkg/ed25519_dalek_wasm.js";

import init from "../wasm/pkg/ed25519_dalek_wasm.js";

import { wasm } from "../wasm/pkg/ed25519_dalek_wasm.wasm.js";

let module: Promise<unknown> | undefined = undefined

export default async function () {
  await (module ??= init(Buffer.from(wasm, "base64")))
}