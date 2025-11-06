-- ============================================
-- Supabase Storage Setup
-- ============================================
-- Создание бакетов и настройка политик безопасности для файлового хранилища
-- Политики обеспечивают доступ к файлам только для их создателей и суперадминов

-- ============================================
-- 1. Создание бакетов
-- ============================================

-- Основной бакет для пользовательских файлов
INSERT INTO storage.buckets (id, name, public)
VALUES ('user-files', 'user-files', false)
ON CONFLICT (id) DO NOTHING;

-- Бакет для документов
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', false)
ON CONFLICT (id) DO NOTHING;

-- Бакет для изображений
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', false)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 2. Функция для проверки прав суперадмина
-- ============================================
-- Создаем функцию для проверки, является ли пользователь суперадмином
-- Примечание: измените логику в зависимости от вашей схемы пользователей

CREATE OR REPLACE FUNCTION public.is_super_admin(user_id uuid)
RETURNS boolean AS $$
BEGIN
  -- Пример: проверяем наличие записи в таблице profiles с ролью 'super_admin'
  -- Измените эту логику в соответствии с вашей схемой данных
  RETURN EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = user_id
    AND role = 'super_admin'
  );
  
  -- Альтернативный вариант: проверка по email
  -- RETURN EXISTS (
  --   SELECT 1
  --   FROM auth.users
  --   WHERE id = user_id
  --   AND email IN ('admin@example.com', 'superadmin@example.com')
  -- );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 3. Политики для бакета 'user-files'
-- ============================================

-- Пользователи могут загружать файлы только в свою папку
CREATE POLICY "Users can upload files to their own folder"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'user-files' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Пользователи могут просматривать свои файлы или если они суперадмины
CREATE POLICY "Users can view their own files or super admins can view all"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'user-files' 
  AND (
    (storage.foldername(name))[1] = auth.uid()::text
    OR public.is_super_admin(auth.uid())
  )
);

-- Пользователи могут обновлять свои файлы или суперадмины могут обновлять любые
CREATE POLICY "Users can update their own files or super admins can update all"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'user-files' 
  AND (
    (storage.foldername(name))[1] = auth.uid()::text
    OR public.is_super_admin(auth.uid())
  )
);

-- Пользователи могут удалять свои файлы или суперадмины могут удалять любые
CREATE POLICY "Users can delete their own files or super admins can delete all"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'user-files' 
  AND (
    (storage.foldername(name))[1] = auth.uid()::text
    OR public.is_super_admin(auth.uid())
  )
);

-- ============================================
-- 4. Политики для бакета 'documents'
-- ============================================

-- Аналогичные политики для бакета documents
CREATE POLICY "Users can upload documents to their own folder"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'documents' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can view their own documents or super admins can view all"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'documents' 
  AND (
    (storage.foldername(name))[1] = auth.uid()::text
    OR public.is_super_admin(auth.uid())
  )
);

CREATE POLICY "Users can update their own documents or super admins can update all"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'documents' 
  AND (
    (storage.foldername(name))[1] = auth.uid()::text
    OR public.is_super_admin(auth.uid())
  )
);

CREATE POLICY "Users can delete their own documents or super admins can delete all"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'documents' 
  AND (
    (storage.foldername(name))[1] = auth.uid()::text
    OR public.is_super_admin(auth.uid())
  )
);

-- ============================================
-- 5. Политики для бакета 'images'
-- ============================================

-- Аналогичные политики для бакета images
CREATE POLICY "Users can upload images to their own folder"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'images' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can view their own images or super admins can view all"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'images' 
  AND (
    (storage.foldername(name))[1] = auth.uid()::text
    OR public.is_super_admin(auth.uid())
  )
);

CREATE POLICY "Users can update their own images or super admins can update all"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'images' 
  AND (
    (storage.foldername(name))[1] = auth.uid()::text
    OR public.is_super_admin(auth.uid())
  )
);

CREATE POLICY "Users can delete their own images or super admins can delete all"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'images' 
  AND (
    (storage.foldername(name))[1] = auth.uid()::text
    OR public.is_super_admin(auth.uid())
  )
);

-- ============================================
-- 6. Включение RLS
-- ============================================

-- Убедитесь, что RLS включен для таблицы storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- ============================================
-- ПРИМЕЧАНИЯ
-- ============================================
-- 1. Замените функцию is_super_admin() на вашу реализацию проверки прав
-- 2. Структура папок: {userId}/{fileName}
-- 3. Политики работают только для authenticated пользователей
-- 4. Для публичного доступа нужно создать отдельные бакеты с public = true
-- 5. Подписанные URL (signed URLs) работают независимо от RLS политик


