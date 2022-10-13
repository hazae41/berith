import * as Berith from "@hazae41/berith";
import { Ed25519Keypair, Ed25519PublicKey } from "@hazae41/berith";
import * as noble from "@noble/ed25519";
import { sha512 } from "@noble/hashes/sha512";
import crypto from "crypto";
import benchmark from "nodemark";
import supercop from "supercop.wasm";

Berith.initSyncBundledOnce()

noble.utils.sha512Sync = (...m) => sha512(noble.utils.concatBytes(...m));

supercop.ready(() => {

  console.log("@hazae41/berith 1.1.17 (unserialized)", benchmark(() => {
    const keypair = new Ed25519Keypair()
    const identity = keypair.public()
    const message = Uint8Array.from([0xab, 0xbc, 0xcd, 0xde]);
    const proof = keypair.sign(message)
    identity.verify(message, proof)
  }))

  console.log("@hazae41/berith 1.1.17 (serialized)", benchmark(() => {
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
    const keypair = supercop.createKeyPair(seed)
    const message = Uint8Array.from([0xab, 0xbc, 0xcd, 0xde]);
    const signature = supercop.sign(message, keypair.publicKey, keypair.secretKey)
    supercop.verify(signature, message, keypair.publicKey)
  }))

  console.log("node:crypto (unserialized)", benchmark(() => {
    const keypair = crypto.generateKeyPairSync("ed25519")
    const message = Uint8Array.from([0xab, 0xbc, 0xcd, 0xde])
    const signature = crypto.sign(undefined, message, keypair.privateKey)
    crypto.verify(undefined, message, keypair.publicKey, signature)
  }))

  console.log("node:crypto (serialized)", benchmark(() => {
    const keypair = crypto.generateKeyPairSync("ed25519")
    const privateKey = keypair.privateKey.export({ type: "pkcs8", format: "pem" })
    const publicKey = keypair.publicKey.export({ type: "spki", format: "pem" })
    const message = Uint8Array.from([0xab, 0xbc, 0xcd, 0xde])
    const signature = crypto.sign(undefined, message, crypto.createPrivateKey(privateKey))
    crypto.verify(undefined, message, crypto.createPublicKey(publicKey), signature)
  }))

})