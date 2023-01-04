import * as noble from "https://deno.land/x/ed25519@1.7.1/mod.ts";
import { Berith, Ed25519Keypair, Ed25519PublicKey } from "../../src/deno/mod.ts";

await Berith.initBundledOnce()

Deno.bench("@hazae41/berith 1.1.18 (unserialized)", { group: "unserialized", baseline: true }, () => {
  const keypair = new Ed25519Keypair()
  const identity = keypair.public()
  const message = Uint8Array.from([0xab, 0xbc, 0xcd, 0xde]);
  const proof = keypair.sign(message)
  identity.verify(message, proof)
})

Deno.bench("@noble/ed25519 1.7.1", { group: "unserialized" }, () => {
  const privateKey = noble.utils.randomPrivateKey();
  const publicKey = noble.sync.getPublicKey(privateKey);
  const message = Uint8Array.from([0xab, 0xbc, 0xcd, 0xde]);
  const signature = noble.sync.sign(message, privateKey);
  noble.sync.verify(signature, message, publicKey);
})

Deno.bench("@hazae41/berith 1.1.18 (serialized)", { group: "serialized", baseline: true }, () => {
  const keypair = new Ed25519Keypair().to_bytes()
  const identity = Ed25519Keypair.from_bytes(keypair).public().to_bytes()
  const message = Uint8Array.from([0xab, 0xbc, 0xcd, 0xde]);
  const proof = Ed25519Keypair.from_bytes(keypair).sign(message)
  Ed25519PublicKey.from_bytes(identity).verify(message, proof)
})

Deno.bench("@noble/ed25519 1.7.1", { group: "serialized" }, () => {
  const privateKey = noble.utils.randomPrivateKey();
  const publicKey = noble.sync.getPublicKey(privateKey);
  const message = Uint8Array.from([0xab, 0xbc, 0xcd, 0xde]);
  const signature = noble.sync.sign(message, privateKey);
  noble.sync.verify(signature, message, publicKey);
})


