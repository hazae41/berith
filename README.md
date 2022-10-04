# Ed25519 for WebAssembly

WebAssembly port of Ed25519_dalek, a Rust implementation of Ed25519 signatures.

### Benchmark

6.99x times faster than `@noble/ed25519`

```bash
cd bench/deno && npm run bench
```

```
cpu: Apple M1 Max
runtime: deno 1.21.0 (aarch64-apple-darwin)

file://ed25519-dalek-wasm/bench/deno/bench.ts
benchmark           time (avg)             (min … max)       p75       p99      p995
------------------------------------------------------ -----------------------------
ed25519_dalek   314.62 µs/iter (306.71 µs … 704.42 µs) 314.29 µs 340.12 µs 353.58 µs
@noble/ed25519     2.2 ms/iter     (2.06 ms … 2.64 ms)   2.23 ms   2.43 ms   2.55 ms

summary
  ed25519_dalek
   6.99x times faster than @noble/ed25519
```

### Install (Node)

```bash
npm i ed25519_dalek
```

### Test (Deno)

```bash
deno run --allow-net https://deno.land/x/ed25519_dalek/test/deno/test.ts
```

### Basic usage

```typescript
// Deno
import Ed25519, {
  Ed25519Keypair,
  Ed25519PublicKey,
  Ed25519Signature,
} from "https://deno.land/x/ed25519_dalek/deno/mod.ts";

// Node
// import Ed25519, {
//   Ed25519Keypair,
//   Ed25519PublicKey,
//   Ed25519Signature,
// } from "ed25519_dalek";

// -- Wait for WASM to load --
await Ed25519();

// -- Generating an identity --
const keypair = new Ed25519Keypair();
const identity = keypair.public(); // Ed25519PublicKey

// -- Signing & Verifying --
const bytes = new TextEncoder().encode("hello world"); // Uint8Array

const proof = keypair.sign(bytes); // Ed25519Signature
const verified = identity.verify(bytes, proof); // boolean
```

### Serializing to Uint8Array

```typescript
const bytes = new Ed25519Keypair().to_bytes();
const keypair = Ed25519Keypair.from_bytes(bytes);
```

```typescript
const bytes = keypair.public().to_bytes();
const identity = Ed25519PublicKey.from_bytes(bytes);
```

```typescript
const bytes = keypair.sign(input).to_bytes();
const proof = Ed25519Signature.from_bytes(bytes);
```

## Building

- Install Deno

https://deno.land

- Install binaryen (for wasm-opt) and add it your PATH

https://github.com/WebAssembly/binaryen/releases

- Install wasm-pack

```bash
cargo install wasm-pack
```

- Install dependencies

```bash
npm install
```

- Build wasm and module

```bash
npm run build
```
