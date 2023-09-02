extern crate alloc;

use alloc::{boxed::Box, vec::Vec};

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct X25519PublicKey {
    pub(crate) inner: Box<x25519_dalek::PublicKey>,
}

#[wasm_bindgen]
impl X25519PublicKey {
    #[wasm_bindgen(constructor)]
    pub fn new(input: &[u8]) -> Result<X25519PublicKey, JsError> {
        Self::from_bytes(input)
    }

    #[wasm_bindgen]
    pub fn from_bytes(input: &[u8]) -> Result<X25519PublicKey, JsError> {
        let bytes: [u8; 32] = input.try_into()?;
        let public = x25519_dalek::PublicKey::from(bytes);
        let inner = Box::new(public);

        Ok(Self { inner })
    }

    #[wasm_bindgen]
    pub fn to_bytes(&self) -> Vec<u8> {
        self.inner.to_bytes().to_vec()
    }
}
