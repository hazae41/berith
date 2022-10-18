#![no_std]

extern crate alloc;

use alloc::{boxed::Box, vec::Vec};

use wasm_bindgen::prelude::*;

use rand::rngs::OsRng;

#[wasm_bindgen]
pub struct Ed25519Keypair {
    inner: Box<ed25519_dalek::Keypair>,
}

#[wasm_bindgen]
impl Ed25519Keypair {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        let keypair = ed25519_dalek::Keypair::generate(&mut OsRng {});
        let inner = Box::new(keypair);

        Self { inner }
    }

    #[wasm_bindgen]
    pub fn from_bytes(input: &[u8]) -> Result<Ed25519Keypair, JsValue> {
        let rkeypair = ed25519_dalek::Keypair::from_bytes(input);
        let keypair = rkeypair.map_err(|_| JsValue::from("Error"))?;
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

#[wasm_bindgen]
pub struct Ed25519Signature {
    inner: Box<ed25519_dalek::Signature>,
}

#[wasm_bindgen]
impl Ed25519Signature {
    #[wasm_bindgen(constructor)]
    pub fn new(input: &[u8]) -> Result<Ed25519Signature, JsValue> {
        Self::from_bytes(input)
    }

    #[wasm_bindgen]
    pub fn from_bytes(input: &[u8]) -> Result<Ed25519Signature, JsValue> {
        let rsigned = ed25519_dalek::Signature::try_from(input);
        let signed = rsigned.map_err(|_| JsValue::from("Error"))?;
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
    inner: Box<ed25519_dalek::PublicKey>,
}

#[wasm_bindgen]
impl Ed25519PublicKey {
    #[wasm_bindgen(constructor)]
    pub fn new(input: &[u8]) -> Result<Ed25519PublicKey, JsValue> {
        Self::from_bytes(input)
    }

    #[wasm_bindgen]
    pub fn from_bytes(input: &[u8]) -> Result<Ed25519PublicKey, JsValue> {
        let rpublic = ed25519_dalek::PublicKey::from_bytes(input);
        let public = rpublic.map_err(|_| JsValue::from("Error"))?;
        let inner = Box::from(public);

        Ok(Self { inner })
    }

    #[wasm_bindgen]
    pub fn to_bytes(&self) -> Vec<u8> {
        self.inner.to_bytes().to_vec()
    }

    #[wasm_bindgen]
    pub fn verify(&self, input: &[u8], signature: &Ed25519Signature) -> bool {
        use ed25519_dalek::Verifier;

        self.inner.verify(input, &signature.inner).is_ok()
    }
}

#[wasm_bindgen]
pub struct X25519StaticSecret {
    inner: Box<x25519_dalek::StaticSecret>,
}

#[wasm_bindgen]
impl X25519StaticSecret {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        let secret = x25519_dalek::StaticSecret::new(&mut OsRng {});
        let inner = Box::new(secret);

        Self { inner }
    }

    #[wasm_bindgen]
    pub fn from_bytes(input: &[u8]) -> Result<X25519StaticSecret, JsValue> {
        let bytes: [u8; 32] = input.try_into().map_err(|_| JsValue::from("Error"))?;
        let secret = x25519_dalek::StaticSecret::from(bytes);
        let inner = Box::new(secret);

        Ok(Self { inner })
    }

    #[wasm_bindgen]
    pub fn to_bytes(&self) -> Vec<u8> {
        self.inner.to_bytes().to_vec()
    }

    #[wasm_bindgen]
    pub fn diffie_hellman(&self, other: &X25519PublicKey) -> X25519SharedSecret {
        let shared = self.inner.diffie_hellman(&other.inner);
        let inner = Box::new(shared);

        X25519SharedSecret { inner }
    }

    #[wasm_bindgen]
    pub fn to_public(&self) -> X25519PublicKey {
        let public = x25519_dalek::PublicKey::from(self.inner.as_ref());
        let inner = Box::new(public);

        X25519PublicKey { inner }
    }
}

#[wasm_bindgen]
pub struct X25519PublicKey {
    inner: Box<x25519_dalek::PublicKey>,
}

#[wasm_bindgen]
impl X25519PublicKey {
    #[wasm_bindgen(constructor)]
    pub fn new(input: &[u8]) -> Result<X25519PublicKey, JsValue> {
        Self::from_bytes(input)
    }

    #[wasm_bindgen]
    pub fn from_bytes(input: &[u8]) -> Result<X25519PublicKey, JsValue> {
        let bytes: [u8; 32] = input.try_into().map_err(|_| JsValue::from("Error"))?;
        let public = x25519_dalek::PublicKey::from(bytes);
        let inner = Box::new(public);

        Ok(Self { inner })
    }

    #[wasm_bindgen]
    pub fn to_bytes(&self) -> Vec<u8> {
        self.inner.to_bytes().to_vec()
    }
}

#[wasm_bindgen]
pub struct X25519SharedSecret {
    inner: Box<x25519_dalek::SharedSecret>,
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
