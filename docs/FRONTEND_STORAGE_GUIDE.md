# Frontend Storage Module Guide

A simple and quick guide for using the file upload module in React applications.

## 🚀 Quick Start

### 1. Environment Variables Setup

```bash
# .env or .env.local
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_PUBLIC_KEY=your-anon-key
```

### 2. Supabase Setup (one time)

1. Open Supabase Dashboard → SQL Editor
2. Copy and execute the content of `scripts/supabase-storage-setup.sql`
3. Edit the `is_super_admin()` function to match your user schema

### 3. Done! Use the hooks

## 📤 Upload Files with Hook

```tsx
import React from 'react';
import { useFileUpload } from 'squarefi-bff-api-module';

function FileUploadComponent({ userId }: { userId: string }) {
  const { upload, uploading, progress, error, result } = useFileUpload({
    userId,
    onSuccess: (result) => {
      console.log('File uploaded:', result.path);
      console.log('Link:', result.signedUrl);
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await upload(file);
    }
  };

  return (
    <div>
      <input 
        type="file" 
        onChange={handleFileChange} 
        disabled={uploading}
      />
      
      {uploading && <p>Uploading... {progress}%</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {result?.success && (
        <p style={{ color: 'green' }}>
          Successfully uploaded! 
          <a href={result.signedUrl} target="_blank" rel="noopener noreferrer">
            Open file
          </a>
        </p>
      )}
    </div>
  );
}

export default FileUploadComponent;
```

## 📋 File List with Hook

```tsx
import React from 'react';
import { useUserFiles } from 'squarefi-bff-api-module';

function FileListComponent({ userId }: { userId: string }) {
  const { files, loading, deleteOne, reload } = useUserFiles({
    userId,
    autoLoad: true,
    autoGenerateUrls: true, // Automatically get URLs
  });

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <button onClick={reload}>Refresh</button>
      
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            <a href={file.signedUrl} target="_blank" rel="noopener noreferrer">
              {file.name}
            </a>
            <span> ({new Date(file.created_at).toLocaleDateString()})</span>
            <button onClick={() => deleteOne(file.name)}>Delete</button>
          </li>
        ))}
      </ul>
      
      {files.length === 0 && <p>No files</p>}
    </div>
  );
}

export default FileListComponent;
```

## 🎨 Complete Example: Component with Upload and List

```tsx
import React, { useState } from 'react';
import { useFileUpload, useUserFiles, DEFAULT_BUCKET } from 'squarefi-bff-api-module';

interface FileManagerProps {
  userId: string;
}

export const FileManager: React.FC<FileManagerProps> = ({ userId }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Upload hook
  const { upload, uploading, progress, error: uploadError } = useFileUpload({
    userId,
    bucket: DEFAULT_BUCKET,
    onSuccess: () => {
      setSelectedFile(null);
      reload(); // Refresh list after upload
    },
  });

  // File list hook
  const { 
    files, 
    loading, 
    error: listError, 
    reload, 
    deleteOne 
  } = useUserFiles({
    userId,
    autoLoad: true,
    autoGenerateUrls: true,
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      await upload(selectedFile);
    }
  };

  const handleDelete = async (fileName: string) => {
    if (window.confirm(`Delete file ${fileName}?`)) {
      await deleteOne(fileName);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>My Files</h2>

      {/* Upload section */}
      <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h3>Upload File</h3>
        <input type="file" onChange={handleFileSelect} disabled={uploading} />
        
        {selectedFile && (
          <div style={{ marginTop: '10px' }}>
            <p>Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)</p>
            <button onClick={handleUpload} disabled={uploading}>
              {uploading ? `Uploading... ${progress}%` : 'Upload'}
            </button>
          </div>
        )}

        {uploadError && (
          <p style={{ color: 'red', marginTop: '10px' }}>❌ {uploadError}</p>
        )}
      </div>

      {/* File list section */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h3>Uploaded Files ({files.length})</h3>
          <button onClick={reload} disabled={loading}>
            🔄 Refresh
          </button>
        </div>

        {loading && <p>Loading list...</p>}
        
        {listError && <p style={{ color: 'red' }}>❌ {listError}</p>}

        {!loading && files.length === 0 && (
          <p style={{ textAlign: 'center', color: '#888' }}>
            You don't have any uploaded files yet
          </p>
        )}

        {files.length > 0 && (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #ddd' }}>
                <th style={{ textAlign: 'left', padding: '10px' }}>File</th>
                <th style={{ textAlign: 'left', padding: '10px' }}>Date</th>
                <th style={{ textAlign: 'right', padding: '10px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px' }}>
                    <a 
                      href={file.signedUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ color: '#007bff', textDecoration: 'none' }}
                    >
                      📄 {file.name}
                    </a>
                  </td>
                  <td style={{ padding: '10px', color: '#666' }}>
                    {new Date(file.created_at).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '10px', textAlign: 'right' }}>
                    <button 
                      onClick={() => handleDelete(file.name)}
                      style={{ 
                        background: '#dc3545', 
                        color: 'white', 
                        border: 'none',
                        padding: '5px 10px',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
```

## 🖼️ Image Upload with Preview

```tsx
import React, { useState } from 'react';
import { useFileUpload, IMAGES_BUCKET } from 'squarefi-bff-api-module';

export const ImageUploader: React.FC<{ userId: string }> = ({ userId }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const { upload, uploading, error, result } = useFileUpload({
    userId,
    bucket: IMAGES_BUCKET,
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload
    await upload(file);
  };

  return (
    <div>
      <input 
        type="file" 
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
      />

      {preview && (
        <div style={{ marginTop: '20px' }}>
          <img 
            src={preview} 
            alt="Preview" 
            style={{ maxWidth: '300px', borderRadius: '8px' }}
          />
        </div>
      )}

      {uploading && <p>Uploading image...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result?.success && (
        <p style={{ color: 'green' }}>✅ Image uploaded!</p>
      )}
    </div>
  );
};
```

## 🎯 Drag & Drop Upload

```tsx
import React, { useState, useCallback } from 'react';
import { useFileUpload } from 'squarefi-bff-api-module';

export const DragDropUploader: React.FC<{ userId: string }> = ({ userId }) => {
  const [isDragging, setIsDragging] = useState(false);
  const { upload, uploading } = useFileUpload({ userId });

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      for (const file of files) {
        await upload(file);
      }
    },
    [upload]
  );

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      style={{
        border: `3px dashed ${isDragging ? '#007bff' : '#ccc'}`,
        borderRadius: '12px',
        padding: '60px 40px',
        textAlign: 'center',
        backgroundColor: isDragging ? '#f0f8ff' : '#fafafa',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
    >
      {uploading ? (
        <p>⏳ Uploading files...</p>
      ) : (
        <div>
          <p style={{ fontSize: '48px', margin: '0 0 10px 0' }}>📁</p>
          <p style={{ fontSize: '18px', margin: 0 }}>
            Drag and drop files here
          </p>
        </div>
      )}
    </div>
  );
};
```

## 🔧 Hook APIs

### useFileUpload

```typescript
const {
  upload,      // (file: File, fileName?: string) => Promise<UploadFileResult>
  uploading,   // boolean - is uploading
  progress,    // number - upload progress (0-100)
  error,       // string | null - error text
  result,      // UploadFileResult | null - upload result
  reset,       // () => void - reset state
} = useFileUpload({
  userId: 'user-id',           // required
  bucket?: 'user-files',       // optional
  onSuccess?: (result) => {}, // success callback
  onError?: (error) => {},    // error callback
});
```

### useUserFiles

```typescript
const {
  files,           // FileItem[] - file list
  loading,         // boolean - is loading
  error,           // string | null - error text
  reload,          // () => Promise<void> - reload list
  deleteOne,       // (fileName: string) => Promise<boolean>
  deleteMultiple,  // (fileNames: string[]) => Promise<boolean>
  getFileUrl,      // (fileName: string) => Promise<string | null>
} = useUserFiles({
  userId: 'user-id',            // required
  bucket?: 'user-files',        // optional
  autoLoad?: true,              // auto-load on mount
  autoGenerateUrls?: false,     // auto-generate signed URLs
  urlExpiresIn?: 3600,          // URL expiration in seconds
});
```

## 💡 Tips

### 1. Use different buckets for different file types

```tsx
import { DOCUMENTS_BUCKET, IMAGES_BUCKET } from 'squarefi-bff-api-module';

// For documents
const { upload: uploadDoc } = useFileUpload({ 
  userId, 
  bucket: DOCUMENTS_BUCKET 
});

// For images
const { upload: uploadImage } = useFileUpload({ 
  userId, 
  bucket: IMAGES_BUCKET 
});
```

### 2. Validate files before upload

```tsx
const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  // Check size (max 10MB)
  if (file.size > 10 * 1024 * 1024) {
    alert('File too large. Maximum 10MB');
    return;
  }

  // Check type
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  if (!allowedTypes.includes(file.type)) {
    alert('Unsupported file type');
    return;
  }

  await upload(file);
};
```

### 3. Add unique prefix to file name

```tsx
// Avoid name conflicts
const timestamp = Date.now();
const randomId = Math.random().toString(36).substring(7);
const uniqueFileName = `${timestamp}-${randomId}-${file.name}`;

await upload(file, uniqueFileName);
```

### 4. Error handling

```tsx
const { upload } = useFileUpload({
  userId,
  onSuccess: (result) => {
    toast.success('File uploaded!');
    // Save result.path in your DB
  },
  onError: (error) => {
    toast.error(`Error: ${error}`);
  },
});
```

## 🔒 Security

All files are automatically protected:

- ✅ User can only upload files to their own folder
- ✅ User can only see their own files
- ✅ Superadmins have access to all files
- ✅ Use `signedUrl` for temporary secure access
- ✅ Don't use `publicUrl` for confidential data

## 📚 Additional Resources

- [Full Documentation](./STORAGE_MODULE.md)
- [Examples for Different Frameworks](./STORAGE_EXAMPLES.md)
- [SQL Setup Script](../scripts/supabase-storage-setup.sql)

## ❓ FAQ

**Q: How to get current userId?**  
A: Use your authentication system (Supabase Auth, JWT token, etc.)

```tsx
import { supabaseClient } from 'squarefi-bff-api-module';

const userId = supabaseClient?.auth.user()?.id;
```

**Q: Files not uploading, what to do?**  
A: Check:
1. SQL script executed in Supabase
2. Environment variables are set
3. User is authenticated in Supabase

**Q: How to change maximum file size?**  
A: In Supabase Dashboard → Settings → Storage → File Size Limit

**Q: Can I use without React?**  
A: Yes! Use functions directly: `uploadFile()`, `deleteFile()`, etc.

```typescript
import { uploadFile } from 'squarefi-bff-api-module';

const result = await uploadFile({
  file: myFile,
  fileName: 'test.pdf',
  userId: 'user-123',
});
```
