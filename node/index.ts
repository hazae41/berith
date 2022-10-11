export * from "../wasm/pkg/ed25519_dalek_wasm.js";

import { InitOutput, initSync } from "../wasm/pkg/ed25519_dalek_wasm.js";
import { wasm } from "../wasm/pkg/ed25519_dalek_wasm.wasm.js";

let output: InitOutput | undefined = undefined

export function initSyncBundledOnce() {
  return output ??= initSync(Buffer.from(wasm, "base64"))
}

