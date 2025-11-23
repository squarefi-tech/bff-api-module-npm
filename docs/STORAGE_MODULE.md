# Supabase Storage Module

The module provides functions for working with Supabase file storage with automatic user-level access protection.

## Features

- ✅ Upload files to protected storage
- ✅ Get signed URLs for secure access
- ✅ Automatic file organization by user
- ✅ Security policies: access only for owner or superadmin
- ✅ Support for multiple buckets (user-files, documents, images)
- ✅ File and folder deletion
- ✅ File download

## Installation and Setup

### 1. Environment Variables Setup

```bash
# Copy env.example to .env and fill in your values
# See env.example in repository root for all available variables

SUPABASE_URL=your-supabase-url
SUPABASE_PUBLIC_KEY=your-supabase-anon-key
```

### 2. Supabase Storage Setup

Execute the SQL script `scripts/supabase-storage-setup.sql` in your Supabase database via SQL Editor:

1. Open Supabase Dashboard
2. Go to SQL Editor
3. Copy the content of `supabase-storage-setup.sql`
4. Execute the script

**Important:** Modify the `is_super_admin()` function in the script according to your user and role schema.

## Usage

### Import

```typescript
import {
  uploadFile,
  getSignedUrl,
  getPublicUrl,
  deleteFile,
  deleteFiles,
  listUserFiles,
  downloadFile,
  DEFAULT_BUCKET,
  DOCUMENTS_BUCKET,
  IMAGES_BUCKET,
} from '@your-package/bff-api-module';
```

### Upload File

```typescript
const handleFileUpload = async (file: File, userId: string) => {
  const result = await uploadFile({
    file: file,
    fileName: file.name,
    userId: userId,
    bucket: DEFAULT_BUCKET, // or DOCUMENTS_BUCKET, IMAGES_BUCKET
    contentType: file.type,
    upsert: false, // if true, will overwrite existing file
  });

  if (result.success) {
    console.log('File uploaded:', result.path);
    console.log('Public URL:', result.publicUrl);
    console.log('Signed URL:', result.signedUrl);
    
    // Save result.path in your database for future access
    return result.path;
  } else {
    console.error('Upload error:', result.error);
    return null;
  }
};
```

### Get Signed URL

```typescript
// Signed URL for secure file access (temporary, expires)
const getFileUrl = async (filePath: string) => {
  const signedUrl = await getSignedUrl({
    path: filePath,
    bucket: DEFAULT_BUCKET,
    expiresIn: 3600, // URL valid for 1 hour (in seconds)
  });

  if (signedUrl) {
    // Use URL to access the file
    window.open(signedUrl, '_blank');
  }
};
```

### Get Public URL (for Superadmin Backend Access)

For **private buckets**, `getPublicUrl()` returns a permanent URL that requires authentication:

```typescript
import { getPublicUrl, DEFAULT_BUCKET } from '@your-package/bff-api-module';

// Get permanent URL (works on frontend or backend)
const publicUrl = getPublicUrl(filePath, DEFAULT_BUCKET);

console.log('Public URL:', publicUrl);
// Example: https://xxx.supabase.co/storage/v1/object/public/user-files/userId/file.pdf

// On BACKEND, access with service role key:
fetch(publicUrl, {
  headers: {
    'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
  }
})
```

**Important**: 
- For private buckets, this URL requires service role key in Authorization header
- Never expose service role key on frontend
- For regular users, use `getSignedUrl()` instead

### Download File

```typescript
const downloadUserFile = async (filePath: string) => {
  const blob = await downloadFile(filePath, DEFAULT_BUCKET);
  
  if (blob) {
    // Create download link
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filePath.split('/').pop() || 'download';
    a.click();
    URL.revokeObjectURL(url);
  }
};
```

### List User Files

```typescript
const getUserFiles = async (userId: string) => {
  const files = await listUserFiles(userId, DEFAULT_BUCKET);
  
  console.log('User files:', files);
  
  // Each file contains:
  // - name: file name
  // - id: file ID
  // - updated_at: update date
  // - created_at: creation date
  // - last_accessed_at: last access date
  // - metadata: file metadata
  
  return files;
};
```

### Delete File

```typescript
const removeFile = async (filePath: string) => {
  const success = await deleteFile(filePath, DEFAULT_BUCKET);
  
  if (success) {
    console.log('File deleted');
  } else {
    console.error('Error deleting file');
  }
};
```

### Delete Multiple Files

```typescript
const removeMultipleFiles = async (filePaths: string[]) => {
  const success = await deleteFiles(filePaths, DEFAULT_BUCKET);
  
  if (success) {
    console.log('Files deleted');
  } else {
    console.error('Error deleting files');
  }
};
```

## React Usage Examples

### File Upload Component

```typescript
import React, { useState } from 'react';
import { uploadFile, DEFAULT_BUCKET } from '@your-package/bff-api-module';

interface FileUploaderProps {
  userId: string;
  onUploadSuccess: (path: string) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ userId, onUploadSuccess }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const result = await uploadFile({
        file,
        fileName: `${Date.now()}-${file.name}`,
        userId,
        bucket: DEFAULT_BUCKET,
        contentType: file.type,
      });

      if (result.success && result.path) {
        onUploadSuccess(result.path);
      } else {
        setError(result.error || 'Upload error');
      }
    } catch (err) {
      setError('Unexpected error');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
        disabled={uploading}
      />
      {uploading && <p>Uploading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};
```

### File List Component

```typescript
import React, { useEffect, useState } from 'react';
import {
  listUserFiles,
  getSignedUrl,
  deleteFile,
  DEFAULT_BUCKET,
} from '@your-package/bff-api-module';

interface FileListProps {
  userId: string;
}

export const FileList: React.FC<FileListProps> = ({ userId }) => {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFiles();
  }, [userId]);

  const loadFiles = async () => {
    setLoading(true);
    const userFiles = await listUserFiles(userId, DEFAULT_BUCKET);
    setFiles(userFiles);
    setLoading(false);
  };

  const handleDownload = async (fileName: string) => {
    const filePath = `${userId}/${fileName}`;
    const signedUrl = await getSignedUrl({
      path: filePath,
      bucket: DEFAULT_BUCKET,
      expiresIn: 3600,
    });

    if (signedUrl) {
      window.open(signedUrl, '_blank');
    }
  };

  const handleDelete = async (fileName: string) => {
    const filePath = `${userId}/${fileName}`;
    const success = await deleteFile(filePath, DEFAULT_BUCKET);

    if (success) {
      loadFiles(); // Reload list
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h3>My Files</h3>
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            <span>{file.name}</span>
            <button onClick={() => handleDownload(file.name)}>Download</button>
            <button onClick={() => handleDelete(file.name)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
```

## Storage Structure

Files are organized by the following structure:

```
bucket/
  └── {userId}/
      ├── file1.pdf
      ├── file2.jpg
      └── file3.docx
```

Where `{userId}` is the UUID of the authenticated user from Supabase Auth.

## Security

### Row Level Security (RLS)

All files are protected by RLS policies at Supabase level:

1. **Upload**: Users can only upload files to their own folder (`{userId}/`)
2. **View**: Users can only view their own files (or all if superadmin)
3. **Update**: Users can only update their own files (or all if superadmin)
4. **Delete**: Users can only delete their own files (or all if superadmin)

### URL Types

**1. Signed URLs** (for regular users):
- ✅ Temporary access with expiration time (default 1 hour)
- ✅ Work independently of RLS policies
- ✅ Safe to share with end users
- ✅ No authentication required

**2. Public URLs** (for superadmin backend, private buckets):
- ✅ Permanent URL, never expires
- ✅ Requires Supabase service role key in Authorization header
- ✅ Bypasses RLS policies (service role has admin access)
- ⚠️ **NEVER expose service role key on frontend**
- ✅ Use only on secure backend

**Example public URL usage on backend:**
```javascript
// Get URL (can be done anywhere)
const publicUrl = getPublicUrl(filePath, bucket);

// Backend only - access with service key!
const response = await fetch(publicUrl, {
  headers: {
    'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
  }
});
```

## Buckets

Three pre-configured buckets are available:

- `user-files` (DEFAULT_BUCKET) - for general user files
- `documents` (DOCUMENTS_BUCKET) - for documents
- `images` (IMAGES_BUCKET) - for images

All buckets are configured as private (`public: false`) with identical security policies.

## Limitations

By default, Supabase has the following limitations:

- Maximum file size: **50 MB** (can be increased in project settings)
- Total storage limit depends on your pricing plan

## Error Handling

All functions return results with error handling:

```typescript
const result = await uploadFile({...});

if (result.success) {
  // Successful upload
  console.log(result.path, result.signedUrl);
} else {
  // Handle error
  console.error(result.error);
}
```

## Data Types

### UploadFileOptions

```typescript
interface UploadFileOptions {
  file: File | Blob;           // File to upload
  fileName: string;            // File name
  bucket?: string;             // Bucket (default DEFAULT_BUCKET)
  userId: string;              // User ID (required)
  contentType?: string;        // File MIME type
  cacheControl?: string;       // Cache-Control header (default '3600')
  upsert?: boolean;            // Overwrite existing file (default false)
}
```

### UploadFileResult

```typescript
interface UploadFileResult {
  success: boolean;            // Operation status
  publicUrl?: string;          // Public URL (use with caution)
  signedUrl?: string;          // Signed URL (recommended)
  path?: string;               // File path in storage
  error?: string;              // Error message
}
```

### GetFileUrlOptions

```typescript
interface GetFileUrlOptions {
  path: string;                // File path
  bucket?: string;             // Bucket (default DEFAULT_BUCKET)
  expiresIn?: number;          // URL expiration in seconds (default 3600)
}
```

## FAQ

### How to modify superadmin check logic?

Edit the `is_super_admin()` function in `supabase-storage-setup.sql` before execution:

```sql
CREATE OR REPLACE FUNCTION public.is_super_admin(user_id uuid)
RETURNS boolean AS $$
BEGIN
  -- Your check logic
  RETURN EXISTS (
    SELECT 1
    FROM public.your_users_table
    WHERE id = user_id
    AND your_role_field = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### How to create a public bucket?

If you need a public bucket (without RLS), create it with `public: true`:

```sql
INSERT INTO storage.buckets (id, name, public)
VALUES ('public-images', 'public-images', true);
```

### How to increase maximum file size?

1. Open Supabase Dashboard
2. Go to Settings → Storage
3. Change `File Size Limit`

### Should I save file paths in the database?

Yes, it's recommended to save the `path` from upload result in your database for future file access.

## Support

If you have questions or issues, please create an issue in the project repository.
