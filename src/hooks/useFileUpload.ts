import { useState, useCallback } from 'react';
import { uploadFile, UploadFileOptions, UploadFileResult } from '../utils/fileStorage';

interface UseFileUploadOptions {
  userId: string;
  bucket?: string;
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
 * @example
 * ```tsx
 * const { upload, uploading, error, result } = useFileUpload({
 *   userId: 'user-123',
 *   onSuccess: (result) => console.log('Загружено:', result.path),
 * });
 * 
 * const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
 *   const file = e.target.files?.[0];
 *   if (file) await upload(file);
 * };
 * ```
 */
export const useFileUpload = (options: UseFileUploadOptions): UseFileUploadReturn => {
  const { userId, bucket, authToken, onSuccess, onError } = options;
  
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
          userId,
          bucket,
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
    [userId, bucket, authToken, onSuccess, onError]
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

