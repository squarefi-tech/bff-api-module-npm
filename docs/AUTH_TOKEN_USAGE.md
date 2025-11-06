# Using Storage Module with Authentication

## Problem
When you see error: **"new row violates row-level security policy"**

This means:
- ✅ RLS policies are working (good!)
- ❌ User is not authenticated

## Solution: Pass authToken

All storage functions now accept an optional `authToken` parameter.

## How to Get Auth Token

### From Supabase Auth

```typescript
import { supabaseClient } from 'squarefi-bff-api-module';

// After user login
const { data: { session } } = await supabaseClient.auth.getSession();
const authToken = session?.access_token;
```

### From Your Own Auth System

```typescript
// From JWT token in localStorage/cookies
const authToken = localStorage.getItem('access_token');

// Or from your auth context
const { accessToken } = useAuth();
```

## Usage Examples

### Direct API Usage

```typescript
import { uploadFile } from 'squarefi-bff-api-module';

const authToken = 'your-jwt-token-here';

const result = await uploadFile({
  file: myFile,
  fileName: 'document.pdf',
  userId: 'user-123',
  authToken, // ← Передаем токен здесь!
});

if (result.success) {
  console.log('Uploaded:', result.path);
}
```

### With React Hooks

```typescript
import { useFileUpload, useUserFiles } from 'squarefi-bff-api-module';

function MyComponent() {
  // Get token from your auth
  const { accessToken } = useAuth(); // your auth hook
  
  const { upload, uploading } = useFileUpload({
    userId: 'user-123',
    authToken: accessToken, // ← Передаем токен здесь!
  });
  
  const { files } = useUserFiles({
    userId: 'user-123',
    authToken: accessToken, // ← И здесь!
    autoLoad: true,
  });
  
  return (
    <div>
      <input type="file" onChange={(e) => upload(e.target.files[0])} />
      {files.map(f => <div key={f.id}>{f.name}</div>)}
    </div>
  );
}
```

### Complete Example with Supabase Auth

```typescript
import React, { useEffect, useState } from 'react';
import { supabaseClient, useFileUpload } from 'squarefi-bff-api-module';

function AuthenticatedFileUpload() {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  
  useEffect(() => {
    // Get current session
    supabaseClient?.auth.getSession().then(({ data: { session } }) => {
      setAuthToken(session?.access_token || null);
      setUserId(session?.user?.id || null);
    });
    
    // Listen for auth changes
    const { data: authListener } = supabaseClient?.auth.onAuthStateChange(
      (_event, session) => {
        setAuthToken(session?.access_token || null);
        setUserId(session?.user?.id || null);
      }
    ) || {};
    
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);
  
  const { upload, uploading, error } = useFileUpload({
    userId: userId || '',
    authToken: authToken || undefined,
    onSuccess: (result) => {
      console.log('File uploaded:', result.path);
    },
  });
  
  if (!authToken) {
    return <div>Please log in first</div>;
  }
  
  return (
    <div>
      <input 
        type="file" 
        onChange={(e) => upload(e.target.files?.[0])} 
        disabled={uploading}
      />
      {error && <p style={{color: 'red'}}>{error}</p>}
    </div>
  );
}
```

## All Functions Support authToken

### Upload

```typescript
uploadFile({ file, fileName, userId, authToken });
```

### Get Signed URL

```typescript
getSignedUrl({ path, expiresIn, authToken });
```

### List Files

```typescript
listUserFiles(userId, bucket, authToken);
```

### Delete File

```typescript
deleteFile(filePath, bucket, authToken);
```

### Delete Multiple Files

```typescript
deleteFiles(filePaths, bucket, authToken);
```

### Download File

```typescript
downloadFile(filePath, bucket, authToken);
```

## Testing in Browser

Update `test-storage.html`:

```javascript
// Add auth token input
<input type="text" id="authToken" placeholder="Auth Token (JWT)" style="margin: 10px 0;">

// In upload function:
const authToken = document.getElementById('authToken').value;

const { data, error } = await supabaseClient.storage
  .from(DEFAULT_BUCKET)
  .upload(filePath, file);

// Or create authenticated client:
if (authToken) {
  const { createClient } = window.supabase;
  const authenticatedClient = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY, {
    global: {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }
  });
  
  // Use authenticatedClient for upload
}
```

## How to Get Test Token

### Option 1: From Browser Console

```javascript
// After logging in to your app
const session = await supabaseClient.auth.getSession();
console.log('Token:', session.data.session.access_token);
// Copy this token and use it in test
```

### Option 2: Create Test User

```sql
-- In Supabase SQL Editor
-- Get user ID after signup
SELECT id FROM auth.users WHERE email = 'test@example.com';
```

Then login via API and get token.

## RLS Policies Explanation

The policies check `auth.uid()` which comes from the JWT token:

```sql
-- User can upload to their own folder
CREATE POLICY "Users can upload" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'user-files' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);
```

Without `authToken`, `auth.uid()` is NULL → policy fails.

With `authToken`, `auth.uid()` returns user ID from token → policy passes if user ID matches folder.

## Common Issues

### Still getting RLS error?

1. ✅ Check token is valid (not expired)
2. ✅ Check userId matches token's user ID
3. ✅ Check file path starts with correct userId: `{userId}/filename`
4. ✅ Verify SQL policies are correctly set up

### Token expired?

```typescript
// Refresh token
const { data, error } = await supabaseClient.auth.refreshSession();
if (data.session) {
  const newToken = data.session.access_token;
  // Use new token
}
```

### Wrong user ID?

```typescript
// Get user ID from token
const { data: { user } } = await supabaseClient.auth.getUser();
console.log('User ID:', user?.id);
// Use this ID for file paths
```

## Summary

✅ **Always pass `authToken` when using private buckets**
✅ **Token must match the user ID in file path**
✅ **Get token from Supabase Auth or your auth system**
✅ **All functions support optional `authToken` parameter**

## Related Files

- `src/utils/fileStorage.ts` - Core functions with authToken support
- `src/hooks/useFileUpload.ts` - React hook with authToken
- `src/hooks/useUserFiles.ts` - React hook with authToken


