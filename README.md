# Ed25519 for Deno

WebAssembly powered Ed25519 for Deno, written in Rust.

## Usage

    deno cache -r https://raw.githubusercontent.com/hazae41/deno-ed25519/master/mod.ts

```typescript
import { Ed25519Keypair } from "https://raw.githubusercontent.com/hazae41/deno-ed25519/master/mod.ts"

const keypair = new Ed25519Keypair()
console.log("keypair", keypair.to_bytes())

const identity = keypair.public()
console.log("identity", identity.to_bytes())

const bytes = new TextEncoder()
  .encode("hello world")
console.log("bytes", bytes)

const proof = keypair.sign(bytes)
console.log("proof", proof.to_bytes())

const verified = identity.verify(bytes, proof)
console.log("verified", verified)
```

## Test 

    deno cache -r https://raw.githubusercontent.com/hazae41/deno-ed25519/master/test.ts
    deno run --allow-net https://raw.githubusercontent.com/hazae41/deno-ed25519/master/test.ts

## Building

- Install wasm-pack

      cargo install wasm-pack

- Build

      wasm-pack build --target web --release