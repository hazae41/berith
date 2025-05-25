## DEPRECATED

Please use
- [@hazae41/ed25519](https://github.com/hazae41/ed25519) and [@hazae41/ed25519.wasm](https://github.com/hazae41/ed25519.wasm)
- [@hazae41/x25519](https://github.com/hazae41/x25519) and [@hazae41/x25519.wasm](https://github.com/hazae41/x25519.wasm)

<div>
  <img align="right" width="128" src="https://user-images.githubusercontent.com/4405263/216624164-ee65f3ea-0857-40ad-8423-fff8014202c1.png"/>
  <p></p>
</div>

# Berith

WebAssembly port of Ed25519 signatures and X25519 key exchange

```bash
npm i @hazae41/berith
```

[**Node Package 📦**](https://www.npmjs.com/package/@hazae41/berith) • [**Deno Module 🦖**](https://deno.land/x/berith) • [**Next.js CodeSandbox 🪣**](https://codesandbox.io/p/github/hazae41/berith-example-next)

## Algorithms
- Ed25519 from Dalek (ed25519-dalek)
- X25519 from Dalek (ed25519-dalek)

## Features
- Reproducible building
- Pre-bundled and streamed
- Zero-copy memory slices

## Benchmark

### Deno

```bash
git clone https://github.com/hazae41/berith && cd berith && npm i && npm run bench:deno
```

```
cpu: Apple M1 Max
runtime: deno 1.30.3 (aarch64-apple-darwin)

file:///src/deno/bench/mod.bench.ts
benchmark                           time (avg)             (min … max)       p75       p99      p995
---------------------------------------------------------------------- -----------------------------
@hazae41/berith (unserialized)  325.78 µs/iter (316.04 µs … 491.04 µs) 326.21 µs 348.62 µs 364.54 µs
@hazae41/berith (serialized)     368.3 µs/iter (359.12 µs … 537.71 µs) 368.79 µs 399.92 µs 406.54 µs
@noble/curves 0.7.0                1.9 ms/iter      (1.73 ms … 2.3 ms)   1.96 ms   2.26 ms   2.28 ms

summary
  @hazae41/berith (unserialized)
   1.13x faster than @hazae41/berith (serialized)
   5.85x faster than @noble/curves 0.7.0
```

### Node

```bash
git clone https://github.com/hazae41/berith && cd berith && npm i && npm run bench:node
```

```
cpu: Apple M1 Max
runtime: node v18.12.1 (aarch64-apple-darwin)

┌────────────────────────────────┬──────────────────┬─────────────┬─────────────┐
│            (index)             │     average      │   minimum   │   maximum   │
├────────────────────────────────┼──────────────────┼─────────────┼─────────────┤
│ @hazae41/berith (unserialized) │ '281.68 μs/iter' │ '273.83 μs' │ '875.92 μs' │
│  @hazae41/berith (serialized)  │ '318.67 μs/iter' │ '311.29 μs' │ '938.87 μs' │
│      @noble/curves 0.7.0       │  '1.99 ms/iter'  │  '1.82 ms'  │  '5.91 ms'  │
│      supercop.wasm 5.0.1       │ '187.96 μs/iter' │ '179.21 μs' │ '734.29 μs' │
│   node:crypto (unserialized)   │ '152.67 μs/iter' │ '144.96 μs' │  '2.86 ms'  │
│    node:crypto (serialized)    │ '555.61 μs/iter' │ '549.42 μs' │  '1.20 ms'  │
└────────────────────────────────┴──────────────────┴─────────────┴─────────────┘

Summary
- @hazae41/berith (unserialized) is 1.13x faster than @hazae41/berith (serialized)
- @hazae41/berith (unserialized) is 7.06x faster than @noble/curves 0.7.0
- @hazae41/berith (unserialized) is 0.67x faster than supercop.wasm 5.0.1
- @hazae41/berith (unserialized) is 0.54x faster than node:crypto (unserialized)
- @hazae41/berith (unserialized) is 1.97x faster than node:crypto (serialized)
```

## Usage

### Ed25519 (EdDSA over Curve25519)

```ts
import { Berith, Ed25519SigningKey } from "@hazae41/berith"
// import { Berith, Ed25519SigningKey } from "https://deno.land/x/berith/src/deno/mod.ts"

// Wait for WASM to load
await Berith.initBundledOnce();

// Generate random private key
using privateKey = Ed25519SigningKey.random() // Ed25519SigningKey

// Get public key
using publicKey = privateKey.public() // Ed25519VerifyingKey

// Encode some message to sign as UTF-8
const data = new TextEncoder().encode("hello world") // Uint8Array

// Put data in memory
using mdata = new Berith.Memory(data) // Berith.Memory

// Sign data with private key
using signature = privateKey.sign(mdata) // Ed25519Signature

// Verify signature with public key
const verified = publicKey.verify(mdata, signature) // boolean
```

### X25519 (ECDH over Curve25519)

```ts
import { Berith, X25519StaticSecret } from "@hazae41/berith"
// import { Berith, X25519StaticSecret } from "https://deno.land/x/berith/src/deno/mod.ts"

// Wait for WASM to load
await Berith.initBundledOnce()

// Generate Alice's random private key
using alicePrivateKey = new X25519StaticSecret()

// Get Alice's public key
using alicePublicKey = alicePrivateKey.to_public()

// Generate Bob's random private key
using bobPrivateKey = new X25519StaticSecret()

// Get Bob's public key
using bobPublicKey = bobPrivateKey.to_public()

// Derive Alice's shared key from Bob's public key
using aliceSharedKey = alicePrivateKey.diffie_hellman(bobPublicKey)

// Derive Bob's shared key from Alice's public key
using bobSharedKey = bobPrivateKey.diffie_hellman(alicePublicKey)
```

### Memory

You have to wrap Uint8Array into Memory in order to pass them to WebAssembly

```typescript
function exampleFromBytes(bytes: Uint8Array) {
  using memory = new Berith.Memory(bytes)
  Berith.example(memory)
}
```

You have to get Uint8Array from Memory via either copy or view

```typescript
function exampleWithCopy() {
  const bytes = Berith.example().copyAndDispose() // Uint8Array
}
```

```typescript
function exampleWithView() {
  using memory = Berith.example() // X.Memory
  const bytes = memory.bytes // Uint8Array
}
```

Don't forget to free memory with `using` keyword, `.free()` method, or `.freeNextTick()` method

```typescript
function exampleWithUsing() {
  using memory = Berith.example()

  // Do stuff with `memory` or `memory.bytes`
  ...

  // Memory is automatically freed by `using` keyword
}
```

```typescript
function exampleWithFree() {
  const memory = Berith.example()

  // Do stuff with `memory` or `memory.bytes`
  ...

  memory.free()
}
```

```typescript
function exampleWithFreeNextTick() {
  const memory = Berith.example().freeNextTick()

  // Do synchronous stuff with `memory` or `memory.bytes`
  ...

  // Memory is automatically freed by `.freeNextTick()` method
}
```

### Serialization

You can serialize and deserialize almost any type to and from Memory (and Uint8Array)

```typescript
// Generate a private key
using privateKey = Ed25519SigningKey.random()

// Extract private key into Memory bytes
using privateKeyMemory = privateKey.to_bytes() // Berith.Memory

...

// Get back private key from Memory bytes
using privateKey2 = Ed25519SigningKey.from_bytes(privateKeyMemory)
```

```typescript
// Generate a private key
using privateKey = Ed25519SigningKey.random()

// Extract private key into JavaScript bytes
const privateKeyBytes = privateKey.to_bytes().copyAndDispose()

...

// Wrap JavaScript bytes into Memory bytes
using privateKeyMemory = new Berith.Memory(privateKeyBytes)

// Get back private key from Memory bytes
using privateKey2 = Ed25519SigningKey.from_bytes(privateKeyMemory)
```

## Building

### Unreproducible building

You need to install [Rust](https://www.rust-lang.org/tools/install)

Then, install [wasm-pack](https://github.com/rustwasm/wasm-pack)

```bash
cargo install wasm-pack
```

Finally, do a clean install and build

```bash
npm ci && npm run build
```

### Reproducible building

You can build the exact same bytecode using Docker, just be sure you're on a `linux/amd64` host

```bash
docker compose up --build
```

Then check that all the files are the same using `git status`

```bash
git status --porcelain
```

If the output is empty then the bytecode is the same as the one I commited

### Automated checks

Each time I commit to the repository, the GitHub's CI does the following:
- Clone the repository
- Reproduce the build using `docker compose up --build`
- Throw an error if the `git status --porcelain` output is not empty

Each time I release a new version tag on GitHub, the GitHub's CI does the following:
- Clone the repository
- Do not reproduce the build, as it's already checked by the task above
- Throw an error if there is a `npm diff` between the cloned repository and the same version tag on NPM

If a version is present on NPM but not on GitHub, do not use!
