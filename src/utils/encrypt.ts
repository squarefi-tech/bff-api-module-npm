import crypto, { CipherKey } from 'crypto';

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
