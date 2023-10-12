extern crate alloc;

use wasm_bindgen::prelude::*;

use crate::Memory;

#[wasm_bindgen]
pub struct X25519SharedSecret {
    pub(crate) inner: x25519_dalek::SharedSecret,
}

#[wasm_bindgen]
impl X25519SharedSecret {
    #[wasm_bindgen]
    pub fn to_bytes(&self) -> Memory {
        Memory::new(self.inner.to_bytes().to_vec())
    }

    #[wasm_bindgen]
    pub fn was_contributory(&self) -> bool {
        self.inner.was_contributory()
    }
}
