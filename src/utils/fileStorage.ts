import { supabaseClient } from './supabase';

/**
 * Типы для работы с файловым хранилищем
 */
export interface UploadFileOptions {
  file: File | Blob;
  fileName: string;
  bucket?: string;
  userId: string;
  contentType?: string;
  cacheControl?: string;
  upsert?: boolean;
  authToken?: string; // JWT token для авторизации
}

export interface UploadFileResult {
  success: boolean;
  publicUrl?: string;
  signedUrl?: string;
  path?: string;
  error?: string;
}

export interface GetFileUrlOptions {
  path: string;
  bucket?: string;
  expiresIn?: number; // в секундах
  authToken?: string; // JWT token для авторизации
}

/**
 * Названия бакетов по умолчанию
 */
export const DEFAULT_BUCKET = 'user-files';
export const DOCUMENTS_BUCKET = 'documents';
export const IMAGES_BUCKET = 'images';

/**
 * Загружает файл в Supabase Storage
 * Файл сохраняется по пути: {userId}/{fileName}
 *
 * @param options - параметры загрузки файла
 * @returns результат загрузки с ссылкой на файл
 */
export const uploadFile = async (options: UploadFileOptions): Promise<UploadFileResult> => {
  const {
    file,
    fileName,
    bucket = DEFAULT_BUCKET,
    userId,
    contentType,
    cacheControl = '3600',
    upsert = false,
    authToken,
  } = options;

  if (!supabaseClient) {
    return {
      success: false,
      error: 'Supabase client is not initialized',
    };
  }

  try {
    // Если передан authToken, создаем клиент с токеном
    let client = supabaseClient;
    if (authToken) {
      const { createClient } = await import('@supabase/supabase-js');
      client = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLIC_KEY!, {
        global: {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      });
    }

    // Путь к файлу: userId/fileName
    const filePath = `${userId}/${fileName}`;

    const { data, error } = await client.storage.from(bucket).upload(filePath, file, {
      contentType,
      cacheControl,
      upsert,
    });

    if (error) {
      console.error('Error uploading file:', error);
      return {
        success: false,
        error: error.message,
      };
    }

    // Получаем публичный URL
    const { data: urlData } = client.storage.from(bucket).getPublicUrl(data.path);

    // Получаем подписанный URL (действителен 1 час по умолчанию)
    const { data: signedUrlData, error: signedUrlError } = await client.storage
      .from(bucket)
      .createSignedUrl(data.path, 3600);

    return {
      success: true,
      publicUrl: urlData.publicUrl,
      signedUrl: signedUrlError ? undefined : signedUrlData.signedUrl,
      path: data.path,
    };
  } catch (error) {
    console.error('Unexpected error uploading file:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

/**
 * Получает подписанный URL для доступа к файлу
 *
 * @param options - параметры получения URL
 * @returns подписанный URL или null при ошибке
 */
export const getSignedUrl = async (options: GetFileUrlOptions): Promise<string | null> => {
  const { path, bucket = DEFAULT_BUCKET, expiresIn = 3600, authToken } = options;

  if (!supabaseClient) {
    console.error('Supabase client is not initialized');
    return null;
  }

  try {
    // Если передан authToken, создаем клиент с токеном
    let client = supabaseClient;
    if (authToken) {
      const { createClient } = await import('@supabase/supabase-js');
      client = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLIC_KEY!, {
        global: {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      });
    }

    const { data, error } = await client.storage.from(bucket).createSignedUrl(path, expiresIn);

    if (error) {
      console.error('Error creating signed URL:', error);
      return null;
    }

    return data.signedUrl;
  } catch (error) {
    console.error('Unexpected error creating signed URL:', error);
    return null;
  }
};

/**
 * Получает публичный URL для файла
 *
 * Для ПРИВАТНЫХ бакетов:
 * - URL постоянный (не истекает)
 * - Требует Authorization header с service role key для доступа
 * - Используется на backend для суперадмина
 *
 * Для ПУБЛИЧНЫХ бакетов:
 * - URL доступен всем без аутентификации
 *
 * @example Backend usage for private buckets:
 * ```typescript
 * const url = getPublicUrl(filePath, bucket);
 *
 * // Access with service role key:
 * fetch(url, {
 *   headers: {
 *     'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`
 *   }
 * })
 * ```
 *
 * @param path - путь к файлу
 * @param bucket - название бакета
 * @returns постоянный URL
 */
export const getPublicUrl = (path: string, bucket: string = DEFAULT_BUCKET): string | null => {
  if (!supabaseClient) {
    console.error('Supabase client is not initialized');
    return null;
  }

  const { data } = supabaseClient.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
};

/**
 * Удаляет файл из хранилища
 *
 * @param path - путь к файлу
 * @param bucket - название бакета
 * @param authToken - JWT token для авторизации
 * @returns true при успешном удалении
 */
export const deleteFile = async (
  path: string,
  bucket: string = DEFAULT_BUCKET,
  authToken?: string,
): Promise<boolean> => {
  if (!supabaseClient) {
    console.error('Supabase client is not initialized');
    return false;
  }

  try {
    let client = supabaseClient;
    if (authToken) {
      const { createClient } = await import('@supabase/supabase-js');
      client = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLIC_KEY!, {
        global: {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      });
    }

    const { error } = await client.storage.from(bucket).remove([path]);

    if (error) {
      console.error('Error deleting file:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Unexpected error deleting file:', error);
    return false;
  }
};

/**
 * Удаляет несколько файлов из хранилища
 *
 * @param paths - массив путей к файлам
 * @param bucket - название бакета
 * @param authToken - JWT token для авторизации
 * @returns true при успешном удалении всех файлов
 */
export const deleteFiles = async (
  paths: string[],
  bucket: string = DEFAULT_BUCKET,
  authToken?: string,
): Promise<boolean> => {
  if (!supabaseClient) {
    console.error('Supabase client is not initialized');
    return false;
  }

  try {
    let client = supabaseClient;
    if (authToken) {
      const { createClient } = await import('@supabase/supabase-js');
      client = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLIC_KEY!, {
        global: {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      });
    }

    const { error } = await client.storage.from(bucket).remove(paths);

    if (error) {
      console.error('Error deleting files:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Unexpected error deleting files:', error);
    return false;
  }
};

/**
 * Получает список файлов пользователя
 *
 * @param userId - ID пользователя
 * @param bucket - название бакета
 * @param authToken - JWT token для авторизации
 * @returns список файлов или пустой массив при ошибке
 */
export const listUserFiles = async (userId: string, bucket: string = DEFAULT_BUCKET, authToken?: string) => {
  if (!supabaseClient) {
    console.error('Supabase client is not initialized');
    return [];
  }

  try {
    let client = supabaseClient;
    if (authToken) {
      const { createClient } = await import('@supabase/supabase-js');
      client = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLIC_KEY!, {
        global: {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      });
    }

    const { data, error } = await client.storage.from(bucket).list(userId);

    if (error) {
      console.error('Error listing files:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Unexpected error listing files:', error);
    return [];
  }
};

/**
 * Скачивает файл из хранилища
 *
 * @param path - путь к файлу
 * @param bucket - название бакета
 * @param authToken - JWT token для авторизации
 * @returns Blob файла или null при ошибке
 */
export const downloadFile = async (
  path: string,
  bucket: string = DEFAULT_BUCKET,
  authToken?: string,
): Promise<Blob | null> => {
  if (!supabaseClient) {
    console.error('Supabase client is not initialized');
    return null;
  }

  try {
    let client = supabaseClient;
    if (authToken) {
      const { createClient } = await import('@supabase/supabase-js');
      client = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLIC_KEY!, {
        global: {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      });
    }

    const { data, error } = await client.storage.from(bucket).download(path);

    if (error) {
      console.error('Error downloading file:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error downloading file:', error);
    return null;
  }
};
