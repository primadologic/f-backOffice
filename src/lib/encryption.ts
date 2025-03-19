import { ENCRYPTION_ALGORITHM, ENCRYPTION_SECRET_KEY } from "./env_vars";


export async function encrypt(text: string): Promise<string> {
  try {
    if (typeof text !== "string") {
      throw new Error("Input must be a string");
    }

    // Convert algorithm string to params that Web Crypto API understands
    // Common value for ENCRYPTION_ALGORITHM would be "aes-256-cbc"
    const algorithm = ENCRYPTION_ALGORITHM.toLowerCase().includes("aes") ? "AES-CBC" : ENCRYPTION_ALGORITHM;
    
    // Create a random initialization vector
    const iv = crypto.getRandomValues(new Uint8Array(16));
    
    // Convert the secret key to proper format
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      encoder.encode(ENCRYPTION_SECRET_KEY),
      { name: "PBKDF2" },
      false,
      ["deriveBits", "deriveKey"]
    );
    
    // Derive the actual key using PBKDF2
    // If your backend uses a direct key, you may need to adjust this
    const key = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: new Uint8Array(16).fill(1), // Fixed salt - should match backend
        iterations: 100000,
        hash: "SHA-256"
      },
      keyMaterial,
      { name: algorithm, length: 256 },
      false,
      ["encrypt"]
    );
    
    // Encrypt the text
    const encryptedBuffer = await crypto.subtle.encrypt(
      {
        name: algorithm,
        iv: iv
      },
      key,
      encoder.encode(text)
    );
    
    // Convert to hex strings
    const ivHex = Array.from(new Uint8Array(iv))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    
    const encryptedHex = Array.from(new Uint8Array(encryptedBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    
    // Return in the same format as your original function
    return `${ivHex}:${encryptedHex}`;
  } catch (error) {
    console.error("Encryption error:", error);
    if (error instanceof Error) {
      throw new Error(`Encryption error: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred during encryption");
    }
  }
}