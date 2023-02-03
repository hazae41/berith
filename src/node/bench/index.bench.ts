import { benchSync } from "@hazae41/deimos";
import * as noble from "@noble/ed25519";
import { sha512 } from "@noble/hashes/sha512";
import crypto from "crypto";
import supercop from "supercop.wasm";
import { Berith, Ed25519Keypair, Ed25519PublicKey } from "../index.js";

Berith.initSyncBundledOnce()

noble.utils.sha512Sync = (...m) => sha512(noble.utils.concatBytes(...m));

supercop.ready(() => {

  const samples = 2_000

  const resultBerithUnserialized = benchSync("@hazae41/berith (unserialized)", () => {
    const keypair = new Ed25519Keypair()
    const identity = keypair.public()
    const message = Uint8Array.from([0xab, 0xbc, 0xcd, 0xde]);
    const proof = keypair.sign(message)
    identity.verify(message, proof)
  }, { samples })

  const resultBerithSerialized = benchSync("@hazae41/berith (serialized)", () => {
    const keypair = new Ed25519Keypair().to_bytes()
    const identity = Ed25519Keypair.from_bytes(keypair).public().to_bytes()
    const message = Uint8Array.from([0xab, 0xbc, 0xcd, 0xde]);
    const proof = Ed25519Keypair.from_bytes(keypair).sign(message)
    Ed25519PublicKey.from_bytes(identity).verify(message, proof)
  }, { samples })

  const resultNoble = benchSync("@noble/ed25519 1.7.1", () => {
    const privateKey = noble.utils.randomPrivateKey();
    const publicKey = noble.sync.getPublicKey(privateKey);
    const message = Uint8Array.from([0xab, 0xbc, 0xcd, 0xde]);
    const signature = noble.sync.sign(message, privateKey);
    noble.sync.verify(signature, message, publicKey);
  }, { samples })

  const resultSupercop = benchSync("supercop.wasm 5.0.1", () => {
    const seed = supercop.createSeed()
    const keypair = supercop.createKeyPair(seed)
    const message = Uint8Array.from([0xab, 0xbc, 0xcd, 0xde]);
    const signature = supercop.sign(message, keypair.publicKey, keypair.secretKey)
    supercop.verify(signature, message, keypair.publicKey)
  }, { samples })

  const resultNodeUnserialized = benchSync("node:crypto (unserialized)", () => {
    const keypair = crypto.generateKeyPairSync("ed25519")
    const message = Uint8Array.from([0xab, 0xbc, 0xcd, 0xde])
    const signature = crypto.sign(undefined, message, keypair.privateKey)
    crypto.verify(undefined, message, keypair.publicKey, signature)
  }, { samples })

  const resultNodeSerialized = benchSync("node:crypto (serialized)", () => {
    const keypair = crypto.generateKeyPairSync("ed25519")
    const privateKey = keypair.privateKey.export({ type: "pkcs8", format: "pem" })
    const publicKey = keypair.publicKey.export({ type: "spki", format: "pem" })
    const message = Uint8Array.from([0xab, 0xbc, 0xcd, 0xde])
    const signature = crypto.sign(undefined, message, crypto.createPrivateKey(privateKey))
    crypto.verify(undefined, message, crypto.createPublicKey(publicKey), signature)
  }, { samples })

  resultBerithUnserialized.tableAndSummary(resultBerithSerialized, resultNoble, resultSupercop, resultNodeUnserialized, resultNodeSerialized)
})