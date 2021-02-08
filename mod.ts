export {
  Ed25519Keypair,
  Ed25519PublicKey,
  Ed25519Signature
} from "./pkg/denoed25519.js"

import init from "./pkg/denoed25519.js"

async function read(path: string) {
  const url = new URL(path, import.meta.url);

  if (url.protocol === "file:") {
    return await Deno.readFile(url);
  }

  const res = await fetch(url)
  return await res.arrayBuffer();
}

await init(read("./pkg/denoed25519_bg.wasm"));