extern crate alloc;

use alloc::{boxed::Box, vec::Vec};

use wasm_bindgen::prelude::*;

use rand::rngs::OsRng;

#[wasm_bindgen]
pub struct Ed25519Keypair {
    inner: Box<ed25519_dalek::Keypair>,
}

#[wasm_bindgen]
impl Ed25519Keypair {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        let keypair = ed25519_dalek::Keypair::generate(&mut OsRng {});
        let inner = Box::new(keypair);

        Self { inner }
    }

    #[wasm_bindgen]
    pub fn from_bytes(input: &[u8]) -> Result<Ed25519Keypair, JsError> {
        let rkeypair = ed25519_dalek::Keypair::from_bytes(input);
        let keypair = rkeypair.map_err(|_| JsError::new("Ed25519Keypair::from_bytes"))?;
        let inner = Box::new(keypair);

        Ok(Self { inner })
    }

    #[wasm_bindgen]
    pub fn to_bytes(&self) -> Vec<u8> {
        self.inner.to_bytes().to_vec()
    }

    #[wasm_bindgen]
    pub fn public(&self) -> Ed25519PublicKey {
        let public = self.inner.public;
        let inner = Box::new(public);

        Ed25519PublicKey { inner }
    }

    #[wasm_bindgen]
    pub fn sign(&self, input: &[u8]) -> Ed25519Signature {
        use ed25519_dalek::Signer;

        let signed = self.inner.sign(input);
        let inner = Box::new(signed);

        Ed25519Signature { inner }
    }
}

#[wasm_bindgen]
pub struct Ed25519Signature {
    inner: Box<ed25519_dalek::Signature>,
}

#[wasm_bindgen]
impl Ed25519Signature {
    #[wasm_bindgen(constructor)]
    pub fn new(input: &[u8]) -> Result<Ed25519Signature, JsError> {
        Self::from_bytes(input)
    }

    #[wasm_bindgen]
    pub fn from_bytes(input: &[u8]) -> Result<Ed25519Signature, JsError> {
        let rsigned = ed25519_dalek::Signature::try_from(input);
        let signed = rsigned.map_err(|_| JsError::new("Ed25519Signature::from_bytes"))?;
        let inner = Box::from(signed);

        Ok(Self { inner })
    }

    #[wasm_bindgen]
    pub fn to_bytes(&self) -> Vec<u8> {
        self.inner.to_bytes().to_vec()
    }
}

#[wasm_bindgen]
pub struct Ed25519PublicKey {
    inner: Box<ed25519_dalek::PublicKey>,
}

#[wasm_bindgen]
impl Ed25519PublicKey {
    #[wasm_bindgen(constructor)]
    pub fn new(input: &[u8]) -> Result<Ed25519PublicKey, JsError> {
        Self::from_bytes(input)
    }

    #[wasm_bindgen]
    pub fn from_bytes(input: &[u8]) -> Result<Ed25519PublicKey, JsError> {
        let rpublic = ed25519_dalek::PublicKey::from_bytes(input);
        let public = rpublic.map_err(|_| JsError::new("Ed25519PublicKey::from_bytes"))?;
        let inner = Box::from(public);

        Ok(Self { inner })
    }

    #[wasm_bindgen]
    pub fn to_bytes(&self) -> Vec<u8> {
        self.inner.to_bytes().to_vec()
    }

    #[wasm_bindgen]
    pub fn verify(&self, input: &[u8], signature: &Ed25519Signature) -> bool {
        use ed25519_dalek::Verifier;

        self.inner.verify(input, &signature.inner).is_ok()
    }
}
