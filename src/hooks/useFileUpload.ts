import { useState, useCallback } from 'react';
import { uploadFile, UploadFileOptions, UploadFileResult } from '../utils/fileStorage';

interface UseFileUploadOptions {
  bucket: string;
  folder?: string; // Папка внутри бакета (например, 'documents', 'images/avatars'). Создается автоматически, если не существует
  authToken?: string; // JWT token для авторизации
  onSuccess?: (result: UploadFileResult) => void;
  onError?: (error: string) => void;
}

interface UseFileUploadReturn {
  upload: (file: File, fileName?: string) => Promise<UploadFileResult>;
  uploading: boolean;
  progress: number;
  error: string | null;
  result: UploadFileResult | null;
  reset: () => void;
}

/**
 * React хук для загрузки файлов в Supabase Storage
 *
 * Папки создаются автоматически при загрузке файла, если их не существует.
 *
 * @example
 * ```tsx
 * // Загрузка в корень бакета
 * const { upload, uploading, error, result } = useFileUpload({
 *   bucket: 'user-files',
 *   onSuccess: (result) => console.log('Загружено:', result.path),
 * });
 *
 * // Загрузка в конкретную папку (папка создастся автоматически)
 * const { upload } = useFileUpload({
 *   bucket: 'documents',
 *   folder: 'invoices', // файл будет загружен в invoices/
 * });
 *
 * // Загрузка во вложенную папку (все папки создадутся автоматически)
 * const { upload } = useFileUpload({
 *   bucket: 'images',
 *   folder: 'avatars/2024', // файл будет загружен в avatars/2024/
 * });
 *
 * const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
 *   const file = e.target.files?.[0];
 *   if (file) await upload(file);
 * };
 * ```
 */
export const useFileUpload = (options: UseFileUploadOptions): UseFileUploadReturn => {
  const { bucket, folder, authToken, onSuccess, onError } = options;

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<UploadFileResult | null>(null);

  const upload = useCallback(
    async (file: File, customFileName?: string): Promise<UploadFileResult> => {
      setUploading(true);
      setProgress(0);
      setError(null);
      setResult(null);

      try {
        // Симулируем прогресс (Supabase не предоставляет реальный progress)
        const progressInterval = setInterval(() => {
          setProgress((prev) => Math.min(prev + 10, 90));
        }, 100);

        const uploadOptions: UploadFileOptions = {
          file,
          fileName: customFileName || `${Date.now()}-${file.name}`,
          bucket,
          folder,
          contentType: file.type,
          authToken,
        };

        const uploadResult = await uploadFile(uploadOptions);

        clearInterval(progressInterval);
        setProgress(100);
        setResult(uploadResult);

        if (uploadResult.success) {
          onSuccess?.(uploadResult);
        } else {
          const errorMsg = uploadResult.error || 'Ошибка загрузки файла';
          setError(errorMsg);
          onError?.(errorMsg);
        }

        return uploadResult;
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Непредвиденная ошибка';
        setError(errorMsg);
        onError?.(errorMsg);
        setProgress(0);

        return {
          success: false,
          error: errorMsg,
        };
      } finally {
        setUploading(false);
      }
    },
    [bucket, folder, authToken, onSuccess, onError],
  );

  const reset = useCallback(() => {
    setUploading(false);
    setProgress(0);
    setError(null);
    setResult(null);
  }, []);

  return {
    upload,
    uploading,
    progress,
    error,
    result,
    reset,
  };
};
