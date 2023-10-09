extern crate alloc;

use alloc::{boxed::Box, vec::Vec};

use wasm_bindgen::prelude::*;

use crate::ed25519::public_key::Ed25519VerifyingKey;
use crate::ed25519::signature::Ed25519Signature;

#[wasm_bindgen]
pub struct Ed25519SigningKey {
    pub(crate) inner: Box<ed25519_dalek::SigningKey>,
}

#[wasm_bindgen]
impl Ed25519SigningKey {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self::random()
    }

    #[wasm_bindgen]
    pub fn random() -> Self {
        let keypair = ed25519_dalek::SigningKey::generate(&mut rand_core::OsRng {});
        let inner = Box::new(keypair);

        Self { inner }
    }

    #[wasm_bindgen]
    pub fn from_bytes(bytes: &[u8]) -> Result<Ed25519SigningKey, JsError> {
        let sized: &[u8; 32] = bytes.try_into()?;
        let keypair = ed25519_dalek::SigningKey::from_bytes(sized);
        let inner = Box::new(keypair);

        Ok(Self { inner })
    }

    #[wasm_bindgen]
    pub fn to_bytes(&self) -> Vec<u8> {
        self.inner.to_bytes().to_vec()
    }

    #[wasm_bindgen]
    pub fn public(&self) -> Ed25519VerifyingKey {
        let public = self.inner.verifying_key();
        let inner = Box::new(public);

        Ed25519VerifyingKey { inner }
    }

    #[wasm_bindgen]
    pub fn sign(&self, bytes: &[u8]) -> Ed25519Signature {
        use ed25519_dalek::Signer;

        let signed = self.inner.sign(bytes);
        let inner = Box::new(signed);

        Ed25519Signature { inner }
    }
}
