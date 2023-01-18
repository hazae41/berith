extern crate alloc;

use alloc::{boxed::Box, vec::Vec};

use wasm_bindgen::prelude::*;

use crate::ed25519::public_key::Ed25519PublicKey;
use crate::ed25519::signature::Ed25519Signature;

#[wasm_bindgen]
pub struct Ed25519Keypair {
    pub(crate) inner: Box<ed25519_dalek::Keypair>,
}

#[wasm_bindgen]
impl Ed25519Keypair {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        let keypair = ed25519_dalek::Keypair::generate(&mut rand::rngs::OsRng {});
        let inner = Box::new(keypair);

        Self { inner }
    }

    #[wasm_bindgen]
    pub fn from_bytes(input: &[u8]) -> Result<Ed25519Keypair, JsError> {
        let rkeypair = ed25519_dalek::Keypair::from_bytes(input);
        let keypair = rkeypair.map_err(|_| JsError::new("Ed25519Keypair::from_bytes"))?;
        let inner = Box::new(keypair);

        Ok(Self { inner })
    }

    #[wasm_bindgen]
    pub fn to_bytes(&self) -> Vec<u8> {
        self.inner.to_bytes().to_vec()
    }

    #[wasm_bindgen]
    pub fn public(&self) -> Ed25519PublicKey {
        let public = self.inner.public;
        let inner = Box::new(public);

        Ed25519PublicKey { inner }
    }

    #[wasm_bindgen]
    pub fn sign(&self, input: &[u8]) -> Ed25519Signature {
        use ed25519_dalek::Signer;

        let signed = self.inner.sign(input);
        let inner = Box::new(signed);

        Ed25519Signature { inner }
    }
}
