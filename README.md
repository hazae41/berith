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

```typescript
import { Berith, Ed25519Keypair } from "@hazae41/berith";

// Wait for WASM to load
Berith.initSyncBundledOnce();

// Generate an identity
const keypair = new Ed25519Keypair();
const identity = keypair.public(); // Ed25519PublicKey

// Define bytes to sign
const bytes = new TextEncoder().encode("hello world"); // Uint8Array

// Sign and verify
const proof = keypair.sign(bytes); // Ed25519Signature
const verified = identity.verify(bytes, proof); // boolean
```

You can serialize and deserialize to Uint8Array

```typescript
const bytes = new Ed25519Keypair().to_bytes().copyAndDispose();
const keypair = Ed25519Keypair.from_bytes(bytes);
```

```typescript
const bytes = keypair.public().to_bytes().copyAndDispose();
const identity = Ed25519PublicKey.from_bytes(bytes);
```

```typescript
const bytes = keypair.sign(input).to_bytes().copyAndDispose();
const proof = Ed25519Signature.from_bytes(bytes);
```

### X25519 (ECDH over Curve25519)

```typescript
import { Berith, X25519StaticSecret } from "@hazae41/berith";

// Wait for WASM to load
Berith.initSyncBundledOnce();

// Generate secret x for Alice
const secretx = new X25519StaticSecret()

// Generate secret y for Bob
const secrety = new X25519StaticSecret()

// Get public X for Alice to send to Bob
const publicx = secretx.to_public()

// Get public Y for Bob to send to Alice
const publicy = secrety.to_public()

// Alice computes the shared key S from x and Y
const sharedx = secretx.diffie_hellman(publicy)

// Bob computes the shared key S from y and X
const sharedy = secrety.diffie_hellman(publicx)

// S is the same for Alice and Bob
console.log("S (Alice)", sharedx.to_bytes().copyAndDispose())
console.log("S (Bob", sharedy.to_bytes().copyAndDispose())
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
