import { assert, test } from "@hazae41/phobos";
import { Ed25519Signature, Ed25519SigningKey, Ed25519VerifyingKey, X25519PublicKey, X25519StaticSecret, initBundledOnce } from "./index.js";

function equals(a: Uint8Array, b: Uint8Array) {
  return Buffer.from(a).equals(Buffer.from(b))
}

function assertEd25519Keypair(keypair: Ed25519SigningKey) {
  const bytes = keypair.to_bytes().copyAndDispose()
  const bytes2 = Ed25519SigningKey.from_bytes(bytes).to_bytes().copyAndDispose()

  assert(equals(bytes, bytes2), `keypair.to_bytes serialization`)
}

function assertEd25519PublicKey(identity: Ed25519VerifyingKey) {
  const bytes = identity.to_bytes().copyAndDispose()
  const bytes2 = Ed25519VerifyingKey.from_bytes(bytes).to_bytes().copyAndDispose()

  assert(equals(bytes, bytes2), `identity.to_bytes serialization`)
}

function assertEd25519Signature(signature: Ed25519Signature) {
  const bytes = signature.to_bytes().copyAndDispose()
  const bytes2 = Ed25519Signature.from_bytes(bytes).to_bytes().copyAndDispose()

  assert(equals(bytes, bytes2), `signature.to_bytes serialization`)
}

test("Ed25519", async () => {
  await initBundledOnce()

  const hello = new TextEncoder().encode("hello world")

  const keypair = new Ed25519SigningKey()
  const identity = keypair.public()

  assertEd25519Keypair(keypair)
  assertEd25519PublicKey(identity)

  const signature = keypair.sign(hello)

  assertEd25519Signature(signature)

  assert(identity.verify(hello, signature), `signature should be verified`)
})

function assertX25519StaticSecret(secret: X25519StaticSecret) {
  const bytes = secret.to_bytes().copyAndDispose()
  const bytes2 = X25519StaticSecret.from_bytes(bytes).to_bytes().copyAndDispose()

  assert(equals(bytes, bytes2), `secret.to_bytes serialization`)
}

function assertX25519PublicKey(publick: X25519PublicKey) {
  const bytes = publick.to_bytes().copyAndDispose()
  const bytes2 = X25519PublicKey.from_bytes(bytes).to_bytes().copyAndDispose()

  assert(equals(bytes, bytes2), `publick.to_bytes serialization`)
}

test("X25519", async () => {
  await initBundledOnce()

  const secretx = new X25519StaticSecret()
  const secrety = new X25519StaticSecret()

  assertX25519StaticSecret(secretx)
  assertX25519StaticSecret(secrety)

  const publicx = secretx.to_public()
  const publicy = secrety.to_public()

  assertX25519PublicKey(publicx)
  assertX25519PublicKey(publicy)

  const sharedx = secretx.diffie_hellman(publicy)
  const sharedy = secrety.diffie_hellman(publicx)

  assert(equals(sharedx.to_bytes().copyAndDispose(), sharedy.to_bytes().copyAndDispose()), `secrets should be equal`)
})