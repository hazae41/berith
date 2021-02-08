# Ed25519 for Deno

WebAssembly powered Ed25519 for Deno, written in Rust.

## Usage

    deno cache -r https://raw.githubusercontent.com/hazae41/deno-ed25519/master/mod.ts

```typescript
import { Ed25519Keypair } from "https://raw.githubusercontent.com/hazae41/deno-ed25519/master/mod.ts"

const keypair = new Ed25519Keypair()
const identity = keypair.public()

const bytes = new TextEncoder()
  .encode("hello world")

const proof = keypair.sign(bytes)
const verified = identity.verify(bytes, proof)
```

## Test 

    deno cache -r https://raw.githubusercontent.com/hazae41/deno-ed25519/master/test.ts
    deno run --allow-net https://raw.githubusercontent.com/hazae41/deno-ed25519/master/test.ts

## Building

- Install wasm-pack

      cargo install wasm-pack

- Build

      wasm-pack build --target web --release