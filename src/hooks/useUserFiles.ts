import { useState, useEffect, useCallback } from 'react';
import { 
  listUserFiles, 
  deleteFile, 
  deleteFiles, 
  getSignedUrl 
} from '../utils/fileStorage';

interface FileItem {
  name: string;
  id: string;
  created_at: string;
  updated_at: string;
  signedUrl?: string;
}

interface UseUserFilesOptions {
  userId: string;
  bucket?: string;
  autoLoad?: boolean;
  autoGenerateUrls?: boolean;
  urlExpiresIn?: number;
  authToken?: string; // JWT token для авторизации
}

interface UseUserFilesReturn {
  files: FileItem[];
  loading: boolean;
  error: string | null;
  reload: () => Promise<void>;
  deleteOne: (fileName: string) => Promise<boolean>;
  deleteMultiple: (fileNames: string[]) => Promise<boolean>;
  getFileUrl: (fileName: string) => Promise<string | null>;
}

/**
 * React хук для работы со списком файлов пользователя
 * 
 * @example
 * ```tsx
 * const { files, loading, deleteOne, getFileUrl } = useUserFiles({
 *   userId: 'user-123',
 *   autoLoad: true,
 *   autoGenerateUrls: true,
 * });
 * 
 * return (
 *   <ul>
 *     {files.map(file => (
 *       <li key={file.id}>
 *         <a href={file.signedUrl} target="_blank">{file.name}</a>
 *         <button onClick={() => deleteOne(file.name)}>Удалить</button>
 *       </li>
 *     ))}
 *   </ul>
 * );
 * ```
 */
export const useUserFiles = (options: UseUserFilesOptions): UseUserFilesReturn => {
  const {
    userId,
    bucket,
    autoLoad = true,
    autoGenerateUrls = false,
    urlExpiresIn = 3600,
    authToken,
  } = options;

  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const userFiles = await listUserFiles(userId, bucket, authToken);

      let filesWithUrls = userFiles.map((file) => ({
        name: file.name,
        id: file.id,
        created_at: file.created_at,
        updated_at: file.updated_at,
      }));

      // Генерируем signed URLs если нужно
      if (autoGenerateUrls) {
        const filesWithSignedUrls = await Promise.all(
          filesWithUrls.map(async (file) => {
            const signedUrl = await getSignedUrl({
              path: `${userId}/${file.name}`,
              bucket,
              expiresIn: urlExpiresIn,
              authToken,
            });
            return { ...file, signedUrl: signedUrl || undefined };
          })
        );
        filesWithUrls = filesWithSignedUrls;
      }

      setFiles(filesWithUrls);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Ошибка загрузки файлов';
      setError(errorMsg);
      console.error('Error loading files:', err);
    } finally {
      setLoading(false);
    }
  }, [userId, bucket, autoGenerateUrls, urlExpiresIn, authToken]);

  const deleteOne = useCallback(
    async (fileName: string): Promise<boolean> => {
      const filePath = `${userId}/${fileName}`;
      const success = await deleteFile(filePath, bucket, authToken);

      if (success) {
        setFiles((prev) => prev.filter((file) => file.name !== fileName));
      }

      return success;
    },
    [userId, bucket, authToken]
  );

  const deleteMultiple = useCallback(
    async (fileNames: string[]): Promise<boolean> => {
      const filePaths = fileNames.map((name) => `${userId}/${name}`);
      const success = await deleteFiles(filePaths, bucket, authToken);

      if (success) {
        setFiles((prev) => prev.filter((file) => !fileNames.includes(file.name)));
      }

      return success;
    },
    [userId, bucket, authToken]
  );

  const getFileUrl = useCallback(
    async (fileName: string): Promise<string | null> => {
      const filePath = `${userId}/${fileName}`;
      return await getSignedUrl({
        path: filePath,
        bucket,
        expiresIn: urlExpiresIn,
        authToken,
      });
    },
    [userId, bucket, urlExpiresIn, authToken]
  );

  useEffect(() => {
    if (autoLoad) {
      reload();
    }
  }, [autoLoad, reload]);

  return {
    files,
    loading,
    error,
    reload,
    deleteOne,
    deleteMultiple,
    getFileUrl,
  };
};
