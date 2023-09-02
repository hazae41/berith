import { ed25519 } from "npm:@noble/curves@0.7.0/ed25519";
import { Berith, Ed25519SigningKey } from "../../../src/deno/mod.ts";

await Berith.initBundledOnce()

ed25519.getPublicKey(ed25519.utils.randomPrivateKey());

const message = new Uint8Array(1024)
crypto.getRandomValues(message)

const group = "mod"

Deno.bench("@hazae41/berith (unserialized)", { group, baseline: true }, () => {
  const keypair = new Ed25519SigningKey()
  const identity = keypair.public()
  const proof = keypair.sign(message)
  identity.verify(message, proof)
  keypair.free()
  identity.free()
  proof.free()
})

Deno.bench("@noble/curves 0.7.0", { group }, () => {
  const privateKey = ed25519.utils.randomPrivateKey();
  const publicKey = ed25519.getPublicKey(privateKey);
  const signature = ed25519.sign(message, privateKey);
  ed25519.verify(signature, message, publicKey);
})