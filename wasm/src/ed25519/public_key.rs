extern crate alloc;

use wasm_bindgen::prelude::*;

use crate::{ed25519::signature::Ed25519Signature, Memory};

#[wasm_bindgen]
pub struct Ed25519VerifyingKey {
    pub(crate) inner: ed25519_dalek::VerifyingKey,
}

#[wasm_bindgen]
impl Ed25519VerifyingKey {
    #[wasm_bindgen(constructor)]
    pub fn new(bytes: &Memory) -> Result<Ed25519VerifyingKey, JsError> {
        Self::from_bytes(bytes)
    }

    #[wasm_bindgen]
    pub fn from_bytes(bytes: &Memory) -> Result<Ed25519VerifyingKey, JsError> {
        let bytes: &[u8; 32] = bytes.inner.as_slice().try_into()?;
        let rpublic = ed25519_dalek::VerifyingKey::from_bytes(bytes);
        let inner = rpublic.map_err(|_| JsError::new("Ed25519VerifyingKey::from_bytes"))?;

        Ok(Self { inner })
    }

    #[wasm_bindgen]
    pub fn to_bytes(&self) -> Memory {
        Memory::new(self.inner.to_bytes().to_vec())
    }

    #[wasm_bindgen]
    pub fn verify(&self, bytes: &Memory, signature: &Ed25519Signature) -> bool {
        use ed25519_dalek::Verifier;

        self.inner.verify(&bytes.inner, &signature.inner).is_ok()
    }
}
