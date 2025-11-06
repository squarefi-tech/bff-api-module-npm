# Storage Module - Quick Start 🚀

## 1️⃣ Setup (one time)

```bash
# .env
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_PUBLIC_KEY=eyJxxx...
```

Execute SQL in Supabase Dashboard:
```bash
scripts/supabase-storage-setup.sql
```

## 2️⃣ Import

```tsx
import { 
  useFileUpload, 
  useUserFiles 
} from 'squarefi-bff-api-module';
```

## 3️⃣ Usage

### Upload File

```tsx
function MyComponent({ userId }) {
  const { upload, uploading } = useFileUpload({ userId });

  return (
    <input 
      type="file" 
      onChange={(e) => upload(e.target.files[0])}
      disabled={uploading}
    />
  );
}
```

### File List

```tsx
function FileList({ userId }) {
  const { files, deleteOne } = useUserFiles({ 
    userId, 
    autoLoad: true,
    autoGenerateUrls: true 
  });

  return (
    <ul>
      {files.map(file => (
        <li key={file.id}>
          <a href={file.signedUrl}>{file.name}</a>
          <button onClick={() => deleteOne(file.name)}>🗑️</button>
        </li>
      ))}
    </ul>
  );
}
```

## 4️⃣ Done! ✅

All files automatically:
- ✅ Organized by `{userId}/filename`
- ✅ Protected by RLS policies
- ✅ Accessible only to owner

📚 **More details**: [FRONTEND_STORAGE_GUIDE.md](./FRONTEND_STORAGE_GUIDE.md)
