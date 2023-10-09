import { Box, Copied } from "@hazae41/box";
import { benchSync } from "@hazae41/deimos";
import { ed25519 } from "@noble/curves/ed25519";
import crypto from "crypto";
import supercop from "supercop.wasm";
import { Berith, Ed25519SigningKey } from "../index.js";

(async () => {
  await Berith.initBundledOnce()
  await new Promise<void>(ok => supercop.ready(() => ok()))

  ed25519.getPublicKey(ed25519.utils.randomPrivateKey());

  const message = new Uint8Array(1024)
  crypto.getRandomValues(message)
  const box = new Box(new Copied(message))

  const samples = 1_000

  const resultBerith = benchSync("@hazae41/berith", () => {
    const keypair = new Ed25519SigningKey()
    const identity = keypair.public()
    const proof = keypair.sign(box)
    identity.verify(box, proof)
    keypair.free()
    identity.free()
    proof.free()
  }, { samples })

  const resultNoble = benchSync("@noble/curves", () => {
    const privateKey = ed25519.utils.randomPrivateKey();
    const publicKey = ed25519.getPublicKey(privateKey);
    const signature = ed25519.sign(message, privateKey);
    ed25519.verify(signature, message, publicKey);
  }, { samples })

  const resultSupercop = benchSync("supercop.wasm", () => {
    const seed = supercop.createSeed()
    const keypair = supercop.createKeyPair(seed)
    const signature = supercop.sign(message, keypair.publicKey, keypair.secretKey)
    supercop.verify(signature, message, keypair.publicKey)
  }, { samples })

  const resultNodeUnserialized = benchSync("node:crypto", () => {
    const keypair = crypto.generateKeyPairSync("ed25519")
    const signature = crypto.sign(undefined, message, keypair.privateKey)
    crypto.verify(undefined, message, keypair.publicKey, signature)
  }, { samples })

  resultBerith.tableAndSummary(resultNoble, resultSupercop, resultNodeUnserialized)
})()