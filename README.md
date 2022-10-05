# Ed25519 for WebAssembly

WebAssembly port of
[Ed25519_dalek](https://github.com/dalek-cryptography/ed25519-dalek), a Rust
implementation of Ed25519 signatures.

### Install (Node)

```bash
npm i ed25519_dalek
```

### Test (Deno)

```bash
deno run --allow-net https://deno.land/x/ed25519_dalek/test/deno/test.ts
```

### Benchmark (Deno)

About 6x to 8x faster than
[@noble/ed25519](https://github.com/paulmillr/noble-ed25519)

```bash
git clone https://github.com/hazae41/ed25519-dalek-wasm && cd ed25519-dalek-wasm/bench/deno && npm run bench
```

```
cpu: Apple M1 Max
runtime: deno 1.26.0 (aarch64-apple-darwin)

benchmark                                time (avg)             (min … max)       p75       p99      p995
--------------------------------------------------------------------------- -----------------------------
ed25519_dalek 1.1.11 (unserialized)  289.94 µs/iter (281.71 µs … 370.79 µs) 290.75 µs  311.5 µs 320.08 µs
@noble/ed25519 1.7.1                    2.1 ms/iter     (1.95 ms … 2.77 ms)   2.14 ms    2.3 ms   2.39 ms

summary
  ed25519_dalek 1.1.11 (unserialized)
   7.25x faster than @noble/ed25519 1.7.1

ed25519_dalek 1.1.11 (serialized)    332.09 µs/iter    (323.17 µs … 474 µs) 332.38 µs 361.46 µs 368.25 µs
@noble/ed25519 1.7.1                   2.07 ms/iter     (1.95 ms … 2.32 ms)   2.12 ms   2.26 ms   2.26 ms

summary
  ed25519_dalek 1.1.11 (serialized)
   6.23x faster than @noble/ed25519 1.7.1
```

### Benchmark (Node)

Not as fast as [supercop.wasm](https://github.com/nazar-pc/supercop.wasm)
(Emscripten port of [@orlp/ed25519](https://github.com/orlp/ed25519), a C
implementation of Ed25519)

```bash
git clone https://github.com/hazae41/ed25519-dalek-wasm && cd ed25519-dalek-wasm/bench/node && npm i && npm run bench
```

```
ed25519_dalek 1.1.11 (unserialized) 4,063 ops/sec ±0.06% (12190 samples)
ed25519_dalek 1.1.11 (serialized) 3,535 ops/sec ±0.08% (10611 samples)
@noble/ed25519 1.7.1 483 ops/sec ±0.29% (1440 samples)
supercop.wasm 5.0.1 5,910 ops/sec ±0.21% (17723 samples)
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

- Install [Deno](https://github.com/denoland/deno)

https://deno.land

- Install [binaryen](https://github.com/WebAssembly/binaryen) (for wasm-opt) and
  add it your PATH

https://github.com/WebAssembly/binaryen/releases

- Install [wasm-pack](https://github.com/rustwasm/wasm-pack)

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
