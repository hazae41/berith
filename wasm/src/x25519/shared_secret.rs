extern crate alloc;

use alloc::{boxed::Box, vec::Vec};

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct X25519SharedSecret {
    pub(crate) inner: Box<x25519_dalek::SharedSecret>,
}

#[wasm_bindgen]
impl X25519SharedSecret {
    #[wasm_bindgen]
    pub fn to_bytes(&self) -> Vec<u8> {
        self.inner.to_bytes().to_vec()
    }

    #[wasm_bindgen]
    pub fn was_contributory(&self) -> bool {
        self.inner.was_contributory()
    }
}
