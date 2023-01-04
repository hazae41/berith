# Ed25519 and X25519 for WebAssembly

WebAssembly port of Dalek's 
[Ed25519](https://github.com/dalek-cryptography/ed25519-dalek) and [X25519](https://github.com/dalek-cryptography/x25519-dalek), Rust
implementations of Ed25519 signatures and X25519 key exchange.

```bash
npm i @hazae41/berith
```

[**Node Package 📦**](https://www.npmjs.com/package/@hazae41/berith) • [**Deno Module 🦖**](https://deno.land/x/berith) • [**Next.js CodeSandbox 🪣**](https://codesandbox.io/p/github/hazae41/berith-example-next)

### Benchmark (Deno)

About 6x to 8x faster than
[@noble/ed25519](https://github.com/paulmillr/noble-ed25519)

```bash
git clone https://github.com/hazae41/berith && cd berith && npm run bench:deno
```

```
cpu: Apple M1 Max
runtime: deno 1.26.0 (aarch64-apple-darwin)

benchmark                                time (avg)             (min … max)       p75       p99      p995
--------------------------------------------------------------------------- -----------------------------
@hazae41/berith 1.1.11 (unserialized)  289.94 µs/iter (281.71 µs … 370.79 µs) 290.75 µs  311.5 µs 320.08 µs
@noble/ed25519 1.7.1                    2.1 ms/iter     (1.95 ms … 2.77 ms)   2.14 ms    2.3 ms   2.39 ms

summary
  @hazae41/berith 1.1.11 (unserialized)
   7.25x faster than @noble/ed25519 1.7.1

@hazae41/berith 1.1.11 (serialized)    332.09 µs/iter    (323.17 µs … 474 µs) 332.38 µs 361.46 µs 368.25 µs
@noble/ed25519 1.7.1                   2.07 ms/iter     (1.95 ms … 2.32 ms)   2.12 ms   2.26 ms   2.26 ms

summary
  @hazae41/berith 1.1.11 (serialized)
   6.23x faster than @noble/ed25519 1.7.1
```

### Benchmark (Node)

Not as fast as [supercop.wasm](https://github.com/nazar-pc/supercop.wasm)
(Emscripten port of [@orlp/ed25519](https://github.com/orlp/ed25519), a C
implementation of Ed25519)

```bash
git clone https://github.com/hazae41/berith && cd berith && npm run bench:node
```

```
@hazae41/berith 1.1.12 (unserialized) 4,072 ops/sec ±0.06% (12215 samples)
@hazae41/berith 1.1.12 (serialized) 3,544 ops/sec ±0.09% (10638 samples)
@noble/ed25519 1.7.1 485 ops/sec ±0.23% (1447 samples)
supercop.wasm 5.0.1 5,902 ops/sec ±0.2% (17698 samples)
node:crypto (unserialized) 7,102 ops/sec ±1.6% (21228 samples)
node:crypto (serialized) 5,648 ops/sec ±0.52% (16914 samples)
```

### Usage for Ed25519 (EdDSA over Curve25519)

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

### Usage for X25519 (ECDH over Curve25519)

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
console.log("S (Alice)", sharedx.to_bytes())
console.log("S (Bob", sharedy.to_bytes())
```

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