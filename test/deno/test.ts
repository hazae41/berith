import * as Berith from "../../deno/mod.ts";
import { Ed25519Keypair, X25519StaticSecret } from "../../deno/mod.ts";

await Berith.initBundledOnce()

{
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
}

{
  console.log("--- X25519 ---")

  const secretx = new X25519StaticSecret()
  const secrety = new X25519StaticSecret()

  const publicx = secretx.to_public()
  const publicy = secrety.to_public()

  const sharedx = secretx.diffie_hellman(publicy)
  const sharedy = secrety.diffie_hellman(publicx)

  console.log("shared X", sharedx.to_bytes())
  console.log("shared Y", sharedy.to_bytes())
}
