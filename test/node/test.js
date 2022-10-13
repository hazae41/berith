import * as Berith from "@hazae41/berith";
import { Ed25519Keypair } from "@hazae41/berith";

Berith.initSyncBundledOnce()

const keypair = new Ed25519Keypair()
console.log("keypair", keypair.to_bytes())

const identity = keypair.public()
console.log("identity", identity.to_bytes())

const bytes = new TextEncoder().encode("hello world")
console.log("bytes", bytes)

const proof = keypair.sign(bytes)
console.log("proof", proof.to_bytes())

const verified = identity.verify(bytes, proof)
console.log("verified", verified)