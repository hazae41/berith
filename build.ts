import * as Base64 from "https://deno.land/std@0.158.0/encoding/base64.ts";

const wasm = await Deno.readFile("./wasm/pkg/ed25519_dalek_wasm_bg.wasm");

async function replaceAllFile(path: string, search: string, replace: string) {
  const content = await Deno.readTextFile(path)
  await Deno.writeTextFile(path, content.replaceAll(search, replace))
}

await Deno.writeTextFile(
  `./wasm/pkg/ed25519_dalek_wasm.wasm.js`,
  `export const wasm = "${Base64.encode(wasm)}";`
);

await Deno.writeTextFile(
  `./wasm/pkg/ed25519_dalek_wasm.wasm.d.ts`,
  `export const wasm: string;`
);

await replaceAllFile(
  `./wasm/pkg/ed25519_dalek_wasm.js`,
  `input = new URL('ed25519_dalek_wasm_bg.wasm', import.meta.url);`,
  `throw new Error("Fuck wasm-bindgen")`
)