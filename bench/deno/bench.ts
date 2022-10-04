import * as ed from "https://deno.land/x/ed25519/mod.ts";
import Ed25519, { Ed25519Keypair } from "../../deno/mod.ts";

await Ed25519()

Deno.bench("ed25519_dalek", { group: "timing", baseline: true }, () => {
  const keypair = new Ed25519Keypair()
  const identity = keypair.public()
  const message = Uint8Array.from([0xab, 0xbc, 0xcd, 0xde]);
  const proof = keypair.sign(message)
  const verified = identity.verify(message, proof)
})

Deno.bench("@noble/ed25519", { group: "timing" }, () => {
  const privateKey = ed.utils.randomPrivateKey();
  const publicKey = ed.sync.getPublicKey(privateKey);
  const message = Uint8Array.from([0xab, 0xbc, 0xcd, 0xde]);
  const signature = ed.sync.sign(message, privateKey);
  const isValid = ed.sync.verify(signature, message, publicKey);
})