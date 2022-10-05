import * as noble from '@noble/ed25519';
import { sha512 } from '@noble/hashes/sha512';
import Ed25519, { Ed25519Keypair, Ed25519PublicKey } from 'ed25519_dalek';
import benchmark from "nodemark";
import supercop from 'supercop.wasm';

noble.utils.sha512Sync = (...m) => sha512(noble.utils.concatBytes(...m));

await Ed25519.default()

supercop.ready(() => {
  console.log("ed25519_dalek 1.1.11 (unserialized)", benchmark(() => {
    const keypair = new Ed25519Keypair()
    const identity = keypair.public()
    const message = Uint8Array.from([0xab, 0xbc, 0xcd, 0xde]);
    const proof = keypair.sign(message)
    identity.verify(message, proof)
  }))

  console.log("ed25519_dalek 1.1.11 (serialized)", benchmark(() => {
    const keypair = new Ed25519Keypair().to_bytes()
    const identity = Ed25519Keypair.from_bytes(keypair).public().to_bytes()
    const message = Uint8Array.from([0xab, 0xbc, 0xcd, 0xde]);
    const proof = Ed25519Keypair.from_bytes(keypair).sign(message)
    Ed25519PublicKey.from_bytes(identity).verify(message, proof)
  }))

  console.log("@noble/ed25519 1.7.1", benchmark(() => {
    const privateKey = noble.utils.randomPrivateKey();
    const publicKey = noble.sync.getPublicKey(privateKey);
    const message = Uint8Array.from([0xab, 0xbc, 0xcd, 0xde]);
    const signature = noble.sync.sign(message, privateKey);
    noble.sync.verify(signature, message, publicKey);
  }))

  console.log("supercop.wasm 5.0.1", benchmark(() => {
    const seed = supercop.createSeed()
    const keys = supercop.createKeyPair(seed)
    const message = Uint8Array.from([0xab, 0xbc, 0xcd, 0xde]);
    const sig = supercop.sign(message, keys.publicKey, keys.secretKey)
    supercop.verify(sig, message, keys.publicKey)
  }))
})