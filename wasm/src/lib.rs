#![no_std]

extern crate alloc;

use alloc::{boxed::Box, vec::Vec};

use wasm_bindgen::prelude::*;

use ed25519_dalek::{Keypair, PublicKey, Signature, Signer, Verifier};

use rand::rngs::OsRng;

#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

fn error<T>(_: T) -> JsValue {
    return JsValue::from("Error");
}

#[wasm_bindgen]
pub struct Ed25519Keypair {
    inner: Box<Keypair>,
}

#[wasm_bindgen]
impl Ed25519Keypair {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        let keypair = Keypair::generate(&mut OsRng {});
        let inner = Box::new(keypair);
        Self { inner }
    }

    #[wasm_bindgen]
    pub fn from_bytes(input: &[u8]) -> Result<Ed25519Keypair, JsValue> {
        let result = Keypair::from_bytes(input);
        let keypair = result.map_err(error)?;
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
        let signed = self.inner.sign(input);
        let inner = Box::new(signed);
        Ed25519Signature { inner }
    }
}

#[wasm_bindgen]
pub struct Ed25519Signature {
    inner: Box<Signature>,
}

#[wasm_bindgen]
impl Ed25519Signature {
    #[wasm_bindgen(constructor)]
    pub fn new(input: &[u8]) -> Result<Ed25519Signature, JsValue> {
        Self::from_bytes(input)
    }

    #[wasm_bindgen]
    pub fn from_bytes(input: &[u8]) -> Result<Ed25519Signature, JsValue> {
        let result = Signature::try_from(input);
        let signed = result.map_err(error)?;
        let inner = Box::from(signed);
        Ok(Self { inner })
    }

    #[wasm_bindgen]
    pub fn to_bytes(&self) -> Vec<u8> {
        self.inner.to_bytes().to_vec()
    }
}

#[wasm_bindgen]
pub struct Ed25519PublicKey {
    inner: Box<PublicKey>,
}

#[wasm_bindgen]
impl Ed25519PublicKey {
    #[wasm_bindgen(constructor)]
    pub fn new(input: &[u8]) -> Result<Ed25519PublicKey, JsValue> {
        Self::from_bytes(input)
    }

    #[wasm_bindgen]
    pub fn from_bytes(input: &[u8]) -> Result<Ed25519PublicKey, JsValue> {
        let result = PublicKey::from_bytes(input);
        let public = result.map_err(error)?;
        let inner = Box::from(public);
        Ok(Self { inner })
    }

    #[wasm_bindgen]
    pub fn to_bytes(&self) -> Vec<u8> {
        self.inner.to_bytes().to_vec()
    }

    #[wasm_bindgen]
    pub fn verify(&self, input: &[u8], signature: Ed25519Signature) -> bool {
        self.inner.verify(input, &signature.inner).is_ok()
    }
}
