extern crate alloc;

use alloc::{boxed::Box, vec::Vec};

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Ed25519Signature {
    pub(crate) inner: Box<ed25519_dalek::Signature>,
}

#[wasm_bindgen]
impl Ed25519Signature {
    #[wasm_bindgen(constructor)]
    pub fn new(bytes: &[u8]) -> Result<Ed25519Signature, JsError> {
        Self::from_bytes(bytes)
    }

    #[wasm_bindgen]
    pub fn from_bytes(bytes: &[u8]) -> Result<Ed25519Signature, JsError> {
        let rsigned = ed25519_dalek::Signature::try_from(bytes);
        let signed = rsigned.map_err(|_| JsError::new("Ed25519Signature::from_bytes"))?;
        let inner = Box::from(signed);

        Ok(Self { inner })
    }

    #[wasm_bindgen]
    pub fn to_bytes(&self) -> Vec<u8> {
        self.inner.to_bytes().to_vec()
    }
}
