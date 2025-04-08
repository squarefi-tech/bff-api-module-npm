export const generate256bitSecretKey = () => {
  const array = new Uint8Array(32);
  window.crypto.getRandomValues(array);
  return array;
};

export const arrayBufferToBase64 = (buffer: Uint8Array<ArrayBuffer>) => {
  return btoa(String.fromCharCode.apply(null, new Uint8Array(buffer) as any));
};

export const decodePEMFromBase64 = (base64EncodedPEM: string) => {
  return atob(base64EncodedPEM);
};

export const base64ToArrayBuffer = (base64: string) => {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
};

export const decryptSensitiveData = async (encryptedData: string, iv: string, secretKey: BufferSource) => {
  const key = await window.crypto.subtle.importKey('raw', secretKey, { name: 'AES-CBC' }, false, ['decrypt']);

  const encryptedBuffer = base64ToArrayBuffer(encryptedData);
  const ivBuffer = base64ToArrayBuffer(iv);

  const decryptedBuffer = await window.crypto.subtle.decrypt(
    {
      name: 'AES-CBC',
      iv: ivBuffer,
    },
    key,
    encryptedBuffer
  );

  const decoder = new TextDecoder();
  const jsonText = decoder.decode(decryptedBuffer);
  return JSON.parse(jsonText);
};
