import { ed25519 } from "npm:@noble/curves@0.7.0/ed25519";
import { Berith, Ed25519Keypair, Ed25519PublicKey } from "../../../src/deno/mod.ts";

await Berith.initBundledOnce()

ed25519.getPublicKey(ed25519.utils.randomPrivateKey());

const message = new Uint8Array(1024)
crypto.getRandomValues(message)

const group = "mod"

Deno.bench("@hazae41/berith (unserialized)", { group, baseline: true }, () => {
  const keypair = new Ed25519Keypair()
  const identity = keypair.public()
  const proof = keypair.sign(message)
  identity.verify(message, proof)
})

Deno.bench("@hazae41/berith (serialized)", { group, }, () => {
  const keypair = new Ed25519Keypair().to_bytes()
  const identity = Ed25519Keypair.from_bytes(keypair).public().to_bytes()
  const proof = Ed25519Keypair.from_bytes(keypair).sign(message)
  Ed25519PublicKey.from_bytes(identity).verify(message, proof)
})

Deno.bench("@noble/curves 0.7.0", { group }, () => {
  const privateKey = ed25519.utils.randomPrivateKey();
  const publicKey = ed25519.getPublicKey(privateKey);
  const signature = ed25519.sign(message, privateKey);
  ed25519.verify(signature, message, publicKey);
})