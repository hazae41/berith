# Ed25519 for Deno

WebAssembly powered Ed25519 for Deno, written in Rust.

## Usage

    deno cache -r https://raw.githubusercontent.com/hazae41/deno-ed25519/master/mod.ts

### Basic usage

```typescript
import { 
    Ed25519Keypair,
    Ed25519PublicKey,
    Ed25519Signature
} from "https://raw.githubusercontent.com/hazae41/deno-ed25519/master/mod.ts"

// -- Generating an identity --
const keypair = new Ed25519Keypair()
const identity = keypair.public() // Ed25519PublicKey

// -- Signing & Verifying --
const bytes = new TextEncoder()
  .encode("hello world") // Uint8Array

const proof = keypair.sign(bytes) // Ed25519Signature
const verified = identity.verify(bytes, proof) // boolean
```

### Serializing to Uint8Array

```typescript
const bytes = new Ed25519Keypair().to_bytes()
const keypair = Ed25519Keypair.from_bytes(bytes)
```

```typescript
const bytes = keypair.public().to_bytes()
const identity = Ed25519PublicKey.from_bytes(bytes)
```

```typescript
const bytes = keypair.sign(input).to_bytes()
const proof = Ed25519Signature.from_bytes(bytes)
```

## Test 

    deno cache -r https://raw.githubusercontent.com/hazae41/deno-ed25519/master/test.ts
    deno run --allow-net https://raw.githubusercontent.com/hazae41/deno-ed25519/master/test.ts

## Building

- Install wasm-pack

      cargo install wasm-pack

- Build

      wasm-pack build --target web --release