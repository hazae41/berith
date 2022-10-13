export * from "../wasm/pkg/berith.js";

import * as Base64 from "https://deno.land/std@0.158.0/encoding/base64.ts";

import { InitOutput, initSync } from "../wasm/pkg/berith.js";
import { wasm } from "../wasm/pkg/berith.wasm.js";

let output: InitOutput | undefined = undefined

export async function initSyncBundledOnce() {
  return output ??= initSync(Base64.decode(wasm))
}