# Storage Module Testing Instructions

## ✅ What's Already Done

1. **Project builds successfully** - No TypeScript errors
2. **Supabase client connects** - Connection to your database verified
3. **Basic functions work** - URL generation tested

## 🧪 How to Test

### Option 1: Quick Test (Node.js)
```bash
node test-storage.js
```

### Option 2: Full Test (Browser)
1. Open `test-storage.html` in your browser
2. Click buttons to test each feature:
   - **Test Connection** - Verify Supabase connection
   - **Upload File** - Try uploading a file
   - **List Files** - View uploaded files
   - **Generate URLs** - Get signed and public URLs

## ⚠️ Important: Run SQL Setup First!

Before testing file uploads, you need to:

1. Open your Supabase Dashboard: https://dpwavvgrlklpuoddutdp.supabase.co
2. Go to **SQL Editor**
3. Copy and run the entire `scripts/supabase-storage-setup.sql` script
4. This will:
   - Create buckets: `user-files`, `documents`, `images`
   - Set up RLS policies for security
   - Create the `is_super_admin()` function

## 📋 Test Checklist

- [ ] SQL script executed in Supabase
- [ ] Run `node test-storage.js` - Should show ✅ all green
- [ ] Open `test-storage.html` - Should connect successfully
- [ ] Upload a test file
- [ ] List files - Should see your uploaded file
- [ ] Generate signed URL - Should be able to open the file
- [ ] Try with different user IDs

## 🔧 Customization Needed

### Update `is_super_admin()` function

In `scripts/supabase-storage-setup.sql`, find this function and update it to match your user schema:

```sql
CREATE OR REPLACE FUNCTION public.is_super_admin(user_id uuid)
RETURNS boolean AS $$
BEGIN
  -- TODO: Update this to match YOUR user table and role field
  RETURN EXISTS (
    SELECT 1
    FROM public.profiles  -- Change to your table name
    WHERE id = user_id
    AND role = 'super_admin'  -- Change to your role field
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

## 📚 Your API Keys

**Supabase URL:** `https://dpwavvgrlklpuoddutdp.supabase.co`  
**Public Key:** Already configured in test files

⚠️ **Security Note:** Never commit your service role key to git!

## 🎯 Next Steps

Once tests pass, you can use the module in your React app:

```tsx
import { useFileUpload, useUserFiles } from 'squarefi-bff-api-module';

function MyComponent() {
  const { upload, uploading } = useFileUpload({ 
    userId: 'user-123' 
  });
  
  const { files } = useUserFiles({ 
    userId: 'user-123',
    autoLoad: true 
  });
  
  return (
    <div>
      <input type="file" onChange={(e) => upload(e.target.files[0])} />
      {files.map(f => <div key={f.id}>{f.name}</div>)}
    </div>
  );
}
```

## 🐛 Troubleshooting

### "Bucket not found"
- Run the SQL setup script
- Check bucket name matches `DEFAULT_BUCKET`

### "Permission denied"
- RLS policies not set up - run SQL script
- Wrong user ID format
- User not authenticated in Supabase

### "File not accessible"
- Private bucket requires signed URL or service role key
- Check if file path is correct: `userId/filename`

## 📖 Documentation

- **Frontend Guide:** `docs/FRONTEND_STORAGE_GUIDE.md`
- **Full API Docs:** `docs/STORAGE_MODULE.md`
- **Backend Usage:** `docs/BACKEND_SERVICE_URL.md`
- **Quick Start:** `docs/STORAGE_QUICK_START.md`


