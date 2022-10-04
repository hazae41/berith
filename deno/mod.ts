export {
  Ed25519Keypair,
  Ed25519PublicKey,
  Ed25519Signature
} from "../wasm/pkg/ed25519_dalek_wasm.js";

import * as Base64 from "https://deno.land/std@0.158.0/encoding/base64.ts";

import init from "../wasm/pkg/ed25519_dalek_wasm.js";
import { wasm } from "../wasm/pkg/ed25519_dalek_wasm.wasm.js";

let module: Promise<unknown> | undefined = undefined

export default async function () {
  await (module ??= init(Base64.decode(wasm)))
}