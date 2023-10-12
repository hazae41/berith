extern crate alloc;

use wasm_bindgen::prelude::*;

use crate::ed25519::public_key::Ed25519VerifyingKey;
use crate::ed25519::signature::Ed25519Signature;
use crate::Memory;

#[wasm_bindgen]
pub struct Ed25519SigningKey {
    pub(crate) inner: ed25519_dalek::SigningKey,
}

#[wasm_bindgen]
impl Ed25519SigningKey {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self::random()
    }

    #[wasm_bindgen]
    pub fn random() -> Self {
        let inner = ed25519_dalek::SigningKey::generate(&mut rand_core::OsRng {});

        Self { inner }
    }

    #[wasm_bindgen]
    pub fn from_bytes(bytes: &Memory) -> Result<Ed25519SigningKey, JsError> {
        let sized: &[u8; 32] = bytes.inner.as_slice().try_into()?;
        let inner = ed25519_dalek::SigningKey::from_bytes(sized);

        Ok(Self { inner })
    }

    #[wasm_bindgen]
    pub fn to_bytes(&self) -> Memory {
        Memory::new(self.inner.to_bytes().to_vec())
    }

    #[wasm_bindgen]
    pub fn public(&self) -> Ed25519VerifyingKey {
        let inner = self.inner.verifying_key();

        Ed25519VerifyingKey { inner }
    }

    #[wasm_bindgen]
    pub fn sign(&self, bytes: &Memory) -> Ed25519Signature {
        use ed25519_dalek::Signer;

        let inner = self.inner.sign(&bytes.inner);

        Ed25519Signature { inner }
    }
}
