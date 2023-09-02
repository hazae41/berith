export * from "../../../wasm/pkg/berith.js";

// @deno-types="../../../wasm/pkg/berith.d.ts"
import { __wbg_init, InitOutput } from "../../../wasm/pkg/berith.js";

import { data } from "../../../wasm/pkg/berith.wasm.js";

let output: InitOutput | undefined = undefined

export async function initBundledOnce() {
  return output ??= await __wbg_init(data)
}