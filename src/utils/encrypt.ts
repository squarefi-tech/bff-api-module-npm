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

/**
 * Очищает и валидирует публичный RSA ключ
 * Исправляет ошибку InvalidAsn1Error: encoding too long
 * путем удаления лишних символов и нормализации переносов строк
 */
const cleanAndValidatePublicKey = (publicKey: string): string => {
  try {
    // Декодируем base64 ключ
    const publicKeyBase64 = Buffer.from(publicKey, 'base64').toString('utf8');

    // Удаляем лишние символы (переносы строк, пробелы в начале и конце)
    // Нормализуем переносы строк для корректной обработки ASN.1
    const cleanedKey = publicKeyBase64.trim().replace(/\r?\n|\r/g, '\n');

    // Проверяем, что ключ содержит необходимые маркеры
    if (!cleanedKey.includes('BEGIN') || !cleanedKey.includes('END')) {
      throw new Error('Invalid public key format: missing BEGIN/END markers');
    }

    return cleanedKey;
  } catch (error) {
    throw new Error(`Invalid public key format: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Автоматически определяет формат RSA ключа по заголовку
 * Помогает избежать ошибок импорта при неправильном указании формата
 */
const detectKeyFormat = (key: string): 'pkcs1' | 'pkcs8' => {
  if (key.includes('BEGIN RSA PUBLIC KEY')) {
    return 'pkcs1';
  } else if (key.includes('BEGIN PUBLIC KEY')) {
    return 'pkcs8';
  }
  // По умолчанию возвращаем pkcs8, как было ранее
  return 'pkcs8';
};

export const makeSecureRequest = async <T>({ callback, publicKey }: MakeSecureRequestParams): Promise<T> => {
  const clientRsa = new NodeRSA();

  try {
    // Очищаем и валидируем публичный ключ
    const cleanedPublicKey = cleanAndValidatePublicKey(publicKey);

    // Определяем формат ключа автоматически
    const keyFormat = detectKeyFormat(cleanedPublicKey);

    // Импортируем ключ с правильным форматом
    clientRsa.importKey(cleanedPublicKey, `${keyFormat}-public-pem`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to import RSA public key: ${errorMessage}`);
  }

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
