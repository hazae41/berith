extern crate alloc;

use wasm_bindgen::prelude::*;

use crate::Memory;

#[wasm_bindgen]
pub struct X25519PublicKey {
    pub(crate) inner: x25519_dalek::PublicKey,
}

#[wasm_bindgen]
impl X25519PublicKey {
    #[wasm_bindgen(constructor)]
    pub fn new(bytes: &Memory) -> Result<X25519PublicKey, JsError> {
        Self::from_bytes(bytes)
    }

    #[wasm_bindgen]
    pub fn from_bytes(bytes: &Memory) -> Result<X25519PublicKey, JsError> {
        let bytes: [u8; 32] = bytes.inner.as_slice().try_into()?;
        let inner = x25519_dalek::PublicKey::from(bytes);

        Ok(Self { inner })
    }

    #[wasm_bindgen]
    pub fn to_bytes(&self) -> Memory {
        Memory::new(self.inner.to_bytes().to_vec())
    }
}
