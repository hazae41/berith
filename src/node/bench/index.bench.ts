import { benchSync } from "@hazae41/deimos";
import { ed25519 } from "@noble/curves/ed25519";
import crypto from "crypto";
import supercop from "supercop.wasm";
import { Berith, Ed25519Keypair, Ed25519PublicKey } from "../index.js";

(async () => {
  await Berith.initBundledOnce()
  await new Promise<void>(ok => supercop.ready(() => ok()))

  ed25519.getPublicKey(ed25519.utils.randomPrivateKey());

  const message = new Uint8Array(1024)
  crypto.getRandomValues(message)

  const samples = 1_000

  const resultBerithUnserialized = benchSync("@hazae41/berith (unserialized)", () => {
    const keypair = new Ed25519Keypair()
    const identity = keypair.public()
    const proof = keypair.sign(message)
    identity.verify(message, proof)
  }, { samples })

  const resultBerithSerialized = benchSync("@hazae41/berith (serialized)", () => {
    const keypair = new Ed25519Keypair().to_bytes()
    const identity = Ed25519Keypair.from_bytes(keypair).public().to_bytes()
    const proof = Ed25519Keypair.from_bytes(keypair).sign(message)
    Ed25519PublicKey.from_bytes(identity).verify(message, proof)
  }, { samples })

  const resultNoble = benchSync("@noble/curves 0.7.0", () => {
    const privateKey = ed25519.utils.randomPrivateKey();
    const publicKey = ed25519.getPublicKey(privateKey);
    const signature = ed25519.sign(message, privateKey);
    ed25519.verify(signature, message, publicKey);
  }, { samples })

  const resultSupercop = benchSync("supercop.wasm 5.0.1", () => {
    const seed = supercop.createSeed()
    const keypair = supercop.createKeyPair(seed)
    const signature = supercop.sign(message, keypair.publicKey, keypair.secretKey)
    supercop.verify(signature, message, keypair.publicKey)
  }, { samples })

  const resultNodeUnserialized = benchSync("node:crypto (unserialized)", () => {
    const keypair = crypto.generateKeyPairSync("ed25519")
    const signature = crypto.sign(undefined, message, keypair.privateKey)
    crypto.verify(undefined, message, keypair.publicKey, signature)
  }, { samples })

  const resultNodeSerialized = benchSync("node:crypto (serialized)", () => {
    const keypair = crypto.generateKeyPairSync("ed25519")
    const privateKey = keypair.privateKey.export({ type: "pkcs8", format: "pem" })
    const publicKey = keypair.publicKey.export({ type: "spki", format: "pem" })
    const signature = crypto.sign(undefined, message, crypto.createPrivateKey(privateKey))
    crypto.verify(undefined, message, crypto.createPublicKey(publicKey), signature)
  }, { samples })

  resultBerithUnserialized.tableAndSummary(resultBerithSerialized, resultNoble, resultSupercop, resultNodeUnserialized, resultNodeSerialized)
})()