# Ed25519 for Deno

WebAssembly powered Ed25519 for Deno, written in Rust.

## Usage

    deno cache -r https://deno.land/x/ed25519_dalek/mod.ts

### Basic usage

```typescript
import { 
    Ed25519Keypair,
    Ed25519PublicKey,
    Ed25519Signature
} from "https://deno.land/x/ed25519_dalek/mod.ts"

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

## Top-level await

If you intent to use it in a browser context, where top-level await is not available, you can use `legacy.ts`

```typescript
import Ed25519, {
  Ed25519Keypair,
  Ed25519PublicKey,
  Ed25519Signature
} from "https://deno.land/x/ed25519_dalek/legacy.ts"

async function test(){
    await Ed25519 // Wait for init

    const keypair = new Ed25519Keypair()
}
```

## Test 

    deno cache -r https://deno.land/x/ed25519_dalek/test.ts
    deno run --allow-net https://deno.land/x/ed25519_dalek/test.ts

## Building

- Install wasm-pack

      cargo install wasm-pack

- Build

      wasm-pack build --target web --release
