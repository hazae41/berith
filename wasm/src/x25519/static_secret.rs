extern crate alloc;

use wasm_bindgen::prelude::*;

use crate::x25519::public_key::X25519PublicKey;
use crate::x25519::shared_secret::X25519SharedSecret;
use crate::Memory;

#[wasm_bindgen]
pub struct X25519StaticSecret {
    pub(crate) inner: x25519_dalek::StaticSecret,
}

#[wasm_bindgen]
impl X25519StaticSecret {
    #[wasm_bindgen(constructor)]
    pub fn random() -> Self {
        let inner = x25519_dalek::StaticSecret::random();

        Self { inner }
    }

    #[wasm_bindgen]
    pub fn from_bytes(bytes: &Memory) -> Result<X25519StaticSecret, JsError> {
        let bytes: [u8; 32] = bytes.inner.as_slice().try_into()?;
        let inner = x25519_dalek::StaticSecret::from(bytes);

        Ok(Self { inner })
    }

    #[wasm_bindgen]
    pub fn to_bytes(&self) -> Memory {
        Memory::new(self.inner.to_bytes().to_vec())
    }

    #[wasm_bindgen]
    pub fn diffie_hellman(&self, other: &X25519PublicKey) -> X25519SharedSecret {
        let inner = self.inner.diffie_hellman(&other.inner);

        X25519SharedSecret { inner }
    }

    #[wasm_bindgen]
    pub fn to_public(&self) -> X25519PublicKey {
        let inner = x25519_dalek::PublicKey::from(&self.inner);

        X25519PublicKey { inner }
    }
}
