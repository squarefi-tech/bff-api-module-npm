import crypto, { CipherKey } from 'crypto';
import NodeRSA from 'node-rsa';

import { API } from '../api/types/types';

type MakeSecureRequestParams = {
  callback: (props: API.Common.Encrypted.Request) => Promise<API.Common.Encrypted.Response>;
  publicKey: string;
};

export const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32);
  return secretKey;
};

export const decryptAESData = async (encryptedData: string, iv: string, secretKey: CipherKey) => {
  const decipher = crypto.createDecipheriv('aes-256-cbc', secretKey, Buffer.from(iv, 'base64'));
  let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  return JSON.parse(decrypted);
};

export const makeSecureRequest = async <T>({ callback, publicKey }: MakeSecureRequestParams): Promise<T> => {
  const clientRsa = new NodeRSA();

  const publicKeyBase64 = Buffer.from(publicKey, 'base64').toString('utf8');
  clientRsa.importKey(publicKeyBase64, 'pkcs8-public-pem');

  const clientSecretKey = generateSecretKey();
  const clientPayload = {
    key: clientSecretKey.toString('base64'),
    timestamp: Date.now(),
  };

  const encrypted_key = clientRsa.encrypt(JSON.stringify(clientPayload), 'base64');

  const { success, encrypted, data, iv } = await callback({ encrypted_key });

  if (success && encrypted && data && iv) {
    const decryptedData = await decryptAESData(data, iv, clientSecretKey);

    return decryptedData.data;
  } else {
    throw new Error('Failed to get encrypted secret key');
  }
};
