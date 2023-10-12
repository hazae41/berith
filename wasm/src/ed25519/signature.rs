extern crate alloc;

use wasm_bindgen::prelude::*;

use crate::Memory;

#[wasm_bindgen]
pub struct Ed25519Signature {
    pub(crate) inner: ed25519_dalek::Signature,
}

#[wasm_bindgen]
impl Ed25519Signature {
    #[wasm_bindgen(constructor)]
    pub fn new(bytes: &Memory) -> Result<Ed25519Signature, JsError> {
        Self::from_bytes(bytes)
    }

    #[wasm_bindgen]
    pub fn from_bytes(bytes: &Memory) -> Result<Ed25519Signature, JsError> {
        let rsigned = ed25519_dalek::Signature::from_slice(&bytes.inner);
        let inner = rsigned.map_err(|_| JsError::new("Ed25519Signature::from_bytes"))?;

        Ok(Self { inner })
    }

    #[wasm_bindgen]
    pub fn to_bytes(&self) -> Memory {
        Memory::new(self.inner.to_bytes().to_vec())
    }
}
