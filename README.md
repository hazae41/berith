# Ed25519 for WebAssembly

WebAssembly port of Ed25519_dalek, a Rust implementation of Ed25519 signatures.

### Benchmark (Deno)

About 5x to 7x faster than `@noble/ed25519`

```bash
git clone https://github.com/hazae41/ed25519-dalek-wasm && cd ed25519-dalek-wasm/bench/deno && npm run bench
```

```
cpu: Apple M1 Max
runtime: deno 1.26.0 (aarch64-apple-darwin)

file:///Users/hg/Travail/ed25519-dalek-wasm/bench/deno/bench.ts
benchmark                               time (avg)             (min … max)       p75       p99      p995
-------------------------------------------------------------------------- -----------------------------
ed25519_dalek 1.1.8 (unserialized)  313.56 µs/iter (303.83 µs … 434.62 µs) 314.04 µs 342.88 µs 349.38 µs
@noble/ed25519 1.7.1                  2.14 ms/iter     (1.92 ms … 2.67 ms)   2.18 ms   2.36 ms   2.38 ms

summary
  ed25519_dalek 1.1.8 (unserialized)
   6.81x faster than @noble/ed25519 1.7.1

ed25519_dalek 1.1.8 (serialized)    354.74 µs/iter (346.42 µs … 503.04 µs) 355.38 µs 381.29 µs 392.71 µs
@noble/ed25519 1.7.1                  2.05 ms/iter     (1.92 ms … 2.24 ms)   2.09 ms   2.23 ms   2.24 ms

summary
  ed25519_dalek 1.1.8 (serialized)
   5.79x faster than @noble/ed25519 1.7.1
```

### Benchmark (Node)

Not as fast as `supercop.wasm` (Emscripten port of `@orlp/ed25519`) as
`Ed25519_dalek` doesn't use sha512 yet

```
ed25519_dalek 1.1.8 (unserialized) 4,069 ops/sec ±0.05% (12209 samples)
ed25519_dalek 1.1.8 (serialized) 3,541 ops/sec ±0.07% (10624 samples)
@noble/ed25519 1.7.1 584 ops/sec ±0.22% (1740 samples)
supercop.wasm 5.0.1 5,931 ops/sec ±0.1% (17782 samples)
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

### Building

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
