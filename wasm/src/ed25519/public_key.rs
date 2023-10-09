extern crate alloc;

use alloc::{boxed::Box, vec::Vec};

use wasm_bindgen::prelude::*;

use crate::ed25519::signature::Ed25519Signature;

#[wasm_bindgen]
pub struct Ed25519VerifyingKey {
    pub(crate) inner: Box<ed25519_dalek::VerifyingKey>,
}

#[wasm_bindgen]
impl Ed25519VerifyingKey {
    #[wasm_bindgen(constructor)]
    pub fn new(bytes: &[u8]) -> Result<Ed25519VerifyingKey, JsError> {
        Self::from_bytes(bytes)
    }

    #[wasm_bindgen]
    pub fn from_bytes(bytes: &[u8]) -> Result<Ed25519VerifyingKey, JsError> {
        let bytes: &[u8; 32] = bytes.try_into()?;
        let rpublic = ed25519_dalek::VerifyingKey::from_bytes(bytes);
        let public = rpublic.map_err(|_| JsError::new("Ed25519VerifyingKey::from_bytes"))?;
        let inner = Box::from(public);

        Ok(Self { inner })
    }

    #[wasm_bindgen]
    pub fn to_bytes(&self) -> Vec<u8> {
        self.inner.to_bytes().to_vec()
    }

    #[wasm_bindgen]
    pub fn verify(&self, bytes: &[u8], signature: &Ed25519Signature) -> bool {
        use ed25519_dalek::Verifier;

        self.inner.verify(bytes, &signature.inner).is_ok()
    }
}
