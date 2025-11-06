# ✅ Fixed: RLS Policy Error

## ❌ Problem
```
new row violates row-level security policy
```

## ✅ Solution
All functions now accept `authToken` parameter!

## 🚀 Quick Fix

### Before (Error):
```typescript
const result = await uploadFile({
  file: myFile,
  fileName: 'test.pdf',
  userId: 'user-123',
});
// ❌ Error: RLS policy violation
```

### After (Works):
```typescript
const authToken = 'your-jwt-token'; // From Supabase Auth

const result = await uploadFile({
  file: myFile,
  fileName: 'test.pdf',
  userId: 'user-123',
  authToken, // ← Add this!
});
// ✅ Success!
```

## 📱 React Hook Usage

```typescript
import { useFileUpload } from 'squarefi-bff-api-module';

function MyComponent() {
  const authToken = 'your-jwt-token'; // Get from your auth
  
  const { upload } = useFileUpload({
    userId: 'user-123',
    authToken, // ← Add this!
  });
  
  return <input type="file" onChange={(e) => upload(e.target.files[0])} />;
}
```

## 🔑 How to Get Auth Token

### Option 1: From Supabase

```typescript
import { supabaseClient } from 'squarefi-bff-api-module';

const { data: { session } } = await supabaseClient.auth.getSession();
const authToken = session?.access_token;
```

### Option 2: From Browser (for testing)

1. Login to your app
2. Open Console (F12)
3. Run:
```javascript
const session = await supabaseClient.auth.getSession();
console.log(session.data.session.access_token);
```
4. Copy the token

### Option 3: From Your Auth System

```typescript
// From localStorage
const authToken = localStorage.getItem('access_token');

// From auth context
const { accessToken } = useAuth();
```

## 📝 Updated API

All these functions now accept `authToken`:

| Function | Signature |
|----------|-----------|
| `uploadFile` | `uploadFile({..., authToken})` |
| `getSignedUrl` | `getSignedUrl({..., authToken})` |
| `deleteFile` | `deleteFile(path, bucket, authToken)` |
| `deleteFiles` | `deleteFiles(paths, bucket, authToken)` |
| `listUserFiles` | `listUserFiles(userId, bucket, authToken)` |
| `downloadFile` | `downloadFile(path, bucket, authToken)` |

## 🧪 Test Example

```typescript
// 1. Get auth token
const authToken = 'eyJhbGci...'; // Your JWT token

// 2. Upload with token
const result = await uploadFile({
  file: myFile,
  fileName: 'test.pdf',
  userId: 'user-123',
  authToken,
});

console.log(result.success); // true
console.log(result.path); // user-123/test.pdf
```

## 🔒 Why This Works

RLS policies check `auth.uid()` from JWT token:

```sql
-- Policy requires authenticated user
WITH CHECK (
  (storage.foldername(name))[1] = auth.uid()::text
)
```

- ❌ **Without token**: `auth.uid()` = NULL → Policy fails
- ✅ **With token**: `auth.uid()` = user ID → Policy passes

## 📚 Full Documentation

- **AUTH_TOKEN_USAGE.md** - Complete guide with examples
- **FRONTEND_STORAGE_GUIDE.md** - React usage
- **STORAGE_MODULE.md** - Full API reference

## ✅ Changes Summary

- ✅ Added `authToken` parameter to all storage functions
- ✅ Updated hooks (`useFileUpload`, `useUserFiles`)
- ✅ Backward compatible (token is optional)
- ✅ Creates authenticated client when token provided
- ✅ Project builds successfully

Now you can upload files from authenticated users! 🎉


