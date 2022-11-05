extern crate alloc;

use alloc::{boxed::Box, vec::Vec};

use wasm_bindgen::prelude::*;

use crate::ed25519::signature::Ed25519Signature;

#[wasm_bindgen]
pub struct Ed25519PublicKey {
    pub(crate) inner: Box<ed25519_dalek::PublicKey>,
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
